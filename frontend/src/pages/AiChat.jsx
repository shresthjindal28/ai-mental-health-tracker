import React, { useState, useContext, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPlus, FaRobot, FaUser, FaTrash } from 'react-icons/fa';
import aiChatService from '../services/aiChatService';
import { AuthContext } from '../context/AuthContext';

const AiChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchConversations();
    // Fetch user data here to set the user's name
    // Example: fetchUserProfile().then(data => setUserName(data.firstName));
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.conversation_id);
    }
  }, [activeConversation]);

  // Only scroll when new messages are added, not on every render
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await aiChatService.getConversations();
      setConversations(data);
      
      // Set the most recent conversation as active if no active conversation
      if (data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const firstName = user?.firstName || user?.username || '';

  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      const data = await aiChatService.getConversationMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = async () => {
    try {
      setLoading(true);
      const newConversation = await aiChatService.startNewConversation();
      setConversations([newConversation, ...conversations]);
      setActiveConversation(newConversation);
      setMessages([]);
    } catch (error) {
      console.error('Error starting new conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      // Optimistically add user message to UI
      const userMessage = {
        sender: 'user',
        message_text: newMessage,
        sent_at: new Date().toISOString()
      };
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Send to API
      const response = await aiChatService.sendMessage(
        activeConversation.conversation_id, 
        newMessage
      );
      
      // Add AI response
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteConversation = async (conversationId) => {
    if (!window.confirm('Are you sure you want to delete this conversation?')) {
      return;
    }
    
    try {
      setLoading(true);
      await aiChatService.deleteConversation(conversationId);
      
      // Remove the conversation from state
      const updatedConversations = conversations.filter(
        conv => conv.conversation_id !== conversationId
      );
      setConversations(updatedConversations);
      
      // If we deleted the active conversation, select a new one or set to null
      if (activeConversation?.conversation_id === conversationId) {
        setActiveConversation(updatedConversations.length > 0 ? updatedConversations[0] : null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    // Only scroll if we're already near the bottom to prevent disrupting reading
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 font-sans flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col py-8 px-2">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            AI Chat Assistant
          </h1>
          <h3 className="text-xl mt-2 text-indigo-300">
            {getGreeting()}, {firstName}!
          </h3>
        </div>
        
        <div className="flex h-[70vh] md:h-[calc(80vh-80px)] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900">
          {/* Sidebar - Conversation List */}
          <div className="w-1/4 min-w-[180px] bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 border-r border-indigo-900 flex flex-col">
            <div className="p-4 border-b border-indigo-800">
              <button
                onClick={startNewConversation}
                className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
                disabled={loading}
              >
                <FaPlus className="mr-2" />
                New Chat
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {conversations.map((conv) => (
                <div
                  key={conv.conversation_id}
                  className={`p-4 cursor-pointer border-b border-indigo-900 transition-all duration-150 flex justify-between items-center
                    ${activeConversation?.conversation_id === conv.conversation_id
                      ? 'bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold'
                      : 'hover:bg-indigo-800 text-indigo-200'}
                  `}
                >
                  <div 
                    className="flex-1 min-w-0"
                    onClick={() => setActiveConversation(conv)}
                  >
                    <div className="text-sm truncate">
                      Conversation {new Date(conv.started_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-indigo-300">
                      {new Date(conv.last_message_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteConversation(conv.conversation_id)}
                    className="ml-2 p-2 text-indigo-300 hover:text-red-400 transition-colors duration-200 rounded-full hover:bg-indigo-900/50"
                    title="Delete conversation"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
              {conversations.length === 0 && !loading && (
                <div className="p-6 text-center text-indigo-300">
                  No conversations yet. Start a new chat!
                </div>
              )}
            </div>
          </div>
          {/* Main Chat Area */}
          <div className="w-3/4 flex flex-col bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800">
            {activeConversation ? (
              <>
                {/* Message List */}
                <div 
                  className="flex-1 overflow-y-auto p-6 space-y-6" 
                  ref={messageListRef}
                >
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl px-5 py-4 shadow-lg
                        ${msg.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-gray-800 text-indigo-100 border border-indigo-900'}
                      `}>
                        <div className="flex items-center mb-2">
                          {msg.sender === 'user'
                            ? <FaUser className="mr-2 text-indigo-200" />
                            : <FaRobot className="mr-2 text-pink-300" />
                          }
                          <span className="text-xs text-indigo-300">
                            {msg.sender === 'user' ? 'You' : 'AI Assistant'} • {formatDateTime(msg.sent_at)}
                          </span>
                        </div>
                        <p className="whitespace-pre-line">{msg.message_text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                {/* Message Input */}
                <div className="border-t border-indigo-900 p-4 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-800">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center justify-center"
                      disabled={!newMessage.trim()}
                    >
                      <FaPaperPlane />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-indigo-300">
                <FaRobot size={56} className="mb-4 text-pink-400" />
                <p className="text-lg">Select a conversation or start a new chat</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
