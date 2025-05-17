const Sentiment = require('sentiment');
const sentiment = new Sentiment();

exports.analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  let sentimentLabel = 'Neutral';
  if (result.score > 1) sentimentLabel = 'Positive';
  else if (result.score < -1) sentimentLabel = 'Negative';

  return { sentiment: sentimentLabel, score: result.score };
};