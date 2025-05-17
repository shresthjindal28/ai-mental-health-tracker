import React from 'react';

const JournalCard = ({ entry }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800';
      case 'Negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
      <div className="mb-3">
        <p className="text-gray-800 whitespace-pre-line">{entry.entry_text}</p>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{formatDate(entry.entry_date)}</span>
        
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(entry.sentiment)}`}>
            {entry.sentiment}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Score: {entry.emotion_score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;