const AiChat = require('../models/aiChatModel');
const { analyzeSentiment } = require('../utils/sentiment');
const axios = require('axios'); // Add axios for Gemini API calls

exports.getConversations = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const conversations = await AiChat.getConversations(userId);
    res.json(conversations);
  } catch (err) {
    console.error('Error getting conversations:', err);
    res.status(500).json({ error: 'Error getting conversations', details: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;
  
  try {
    // Verify the conversation belongs to the user
    const conversation = await AiChat.getConversationById(conversationId);
    if (!conversation || conversation.user_id !== userId) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    
    const messages = await AiChat.getMessages(conversationId);
    res.json(messages);
  } catch (err) {
    console.error('Error getting messages:', err);
    res.status(500).json({ error: 'Error getting messages', details: err.message });
  }
};

exports.createConversation = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const result = await AiChat.createConversation(userId);
    
    // Send welcome message from AI
    const welcomeMessage = "Hello! I'm here to listen and support you on your mental health journey. How are you feeling today?";
    await AiChat.createMessage({
      conversationId: result.insertId,
      sender: 'ai',
      messageText: welcomeMessage,
      sentimentAnalysis: null
    });
    
    // Get the conversation with the welcome message
    const conversation = await AiChat.getConversationById(result.insertId);
    
    res.status(201).json(conversation);
  } catch (err) {
    console.error('Error creating conversation:', err);
    res.status(500).json({ error: 'Error creating conversation', details: err.message });
  }
};

// Updated Gemini API integration using the free model
async function getGeminiResponse(userMessage, user) {
  // Fix greeting detection with a better regex pattern
  if (/\b(hello|hi|hey|greetings)\b/i.test(userMessage.trim())) {
    // Extract firstname properly
    const firstName = user?.firstName || user?.username || 'there';
    return `Hello ${firstName}! How can I help you with your mental health journey today?`;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  // Using the free gemini-2.0-flash model endpoint
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  
  try {
    const res = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { text: `You are a mental health assistant. Respond to: ${userMessage}` }
            ]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    // Robust extraction of the response
    if (
      res.data &&
      Array.isArray(res.data.candidates) &&
      res.data.candidates[0] &&
      res.data.candidates[0].content &&
      Array.isArray(res.data.candidates[0].content.parts) &&
      res.data.candidates[0].content.parts[0] &&
      typeof res.data.candidates[0].content.parts[0].text === 'string'
    ) {
      return res.data.candidates[0].content.parts[0].text;
    }
    
    // Log the full response for debugging
    console.error('Gemini API unexpected response:', JSON.stringify(res.data, null, 2));
    return "Sorry, I couldn't generate a response. (Gemini API returned unexpected format)";
  } catch (err) {
    // Log full error for debugging
    if (err.response) {
      console.error('Gemini API error:', err.response.status, err.response.data);
    } else {
      console.error('Gemini API error:', err.message);
    }
    return "Sorry, I'm having trouble generating a response right now. Please try again later.";
  }
}

exports.sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { conversationId, messageText } = req.body;

  if (!conversationId || !messageText) {
    return res.status(400).json({ error: 'Conversation ID and message text are required' });
  }

  try {
    // Verify the conversation belongs to the user
    const conversation = await AiChat.getConversationById(conversationId);
    if (!conversation || conversation.user_id !== userId) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Analyze sentiment
    const sentimentResult = analyzeSentiment(messageText);
    const sentimentAnalysis = {
      sentiment: sentimentResult.sentiment,
      score: sentimentResult.score
    };

    // Save user message
    await AiChat.createMessage({
      conversationId,
      sender: 'user',
      messageText,
      sentimentAnalysis: JSON.stringify(sentimentAnalysis)
    });

    // === Gemini API integration for AI response - pass user info for personalized greeting ===
    let aiResponse = await getGeminiResponse(messageText, req.user);

    // Save AI response
    const aiMessageResult = await AiChat.createMessage({
      conversationId,
      sender: 'ai',
      messageText: aiResponse,
      sentimentAnalysis: null
    });

    // Update conversation's last_message_at timestamp
    await AiChat.updateConversationTimestamp(conversationId);

    // Get the saved AI message
    const aiMessage = await AiChat.getMessageById(aiMessageResult.insertId);

    res.json(aiMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Error sending message', details: err.message });
  }
};
