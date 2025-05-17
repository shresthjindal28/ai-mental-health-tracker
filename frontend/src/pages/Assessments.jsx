import React, { useState, useEffect } from 'react';
import assessmentService from '../services/assessmentService';
import { FaClipboardList, FaArrowRight, FaCheck, FaHistory, FaBrain, FaChartLine, FaArrowLeft } from 'react-icons/fa';

const Assessments = () => {
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [pastAssessments, setPastAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchAssessmentTypes();
    fetchPastAssessments();
  }, []);

  const fetchAssessmentTypes = async () => {
    try {
      setLoading(true);
      const data = await assessmentService.getAssessmentTypes();
      setAssessmentTypes(data);
    } catch (error) {
      console.error('Error fetching assessment types:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastAssessments = async () => {
    try {
      const data = await assessmentService.getUserAssessments();
      setPastAssessments(data);
    } catch (error) {
      console.error('Error fetching past assessments:', error);
    }
  };

  const fetchQuestions = async (typeId) => {
    try {
      setLoading(true);
      const data = await assessmentService.getAssessmentQuestions(typeId);
      setQuestions(data);
      // Initialize answers object with empty values
      const initialAnswers = {};
      data.forEach(q => {
        initialAnswers[q.question_id] = '';
      });
      setAnswers(initialAnswers);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setResult(null);
    fetchQuestions(type.type_id);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check that all questions have been answered
    const unanswered = Object.values(answers).some(a => a === '');
    if (unanswered) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    try {
      setLoading(true);
      const result = await assessmentService.submitAssessment(
        selectedType.type_id,
        answers
      );
      setResult(result);
      fetchPastAssessments(); // Refresh history after new submission
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setSelectedType(null);
    setQuestions([]);
    setAnswers({});
    setResult(null);
  };

  if (loading && !showHistory && !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 flex justify-center items-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-400 border-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 font-sans px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-64 h-64 bg-purple-700 opacity-20 rounded-full blur-3xl absolute -top-32 -right-32 animate-pulse"></div>
            <div className="w-64 h-64 bg-indigo-700 opacity-20 rounded-full blur-3xl absolute -bottom-32 -left-32 animate-pulse"></div>
          </div>
          <div className="relative z-10 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mental Health Assessments</h1>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-lg font-semibold shadow-lg flex items-center transition-all duration-200"
            >
              {showHistory ? (
                <>
                  <FaArrowLeft className="mr-2" /> Take New Assessment
                </>
              ) : (
                <>
                  <FaHistory className="mr-2" /> View History
                </>
              )}
            </button>
          </div>
        </div>

        {showHistory ? (
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Your Assessment History</h2>
            
            {pastAssessments.length > 0 ? (
              <div className="space-y-6">
                {pastAssessments.map((assessment) => (
                  <div 
                    key={assessment.assessment_id} 
                    className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-xl p-5 border border-gray-700 shadow-lg hover:shadow-indigo-900/20 transition-all duration-300"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-indigo-300">{assessment.assessment_name}</h3>
                      <span className="text-sm text-gray-400">
                        {new Date(assessment.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 flex items-center">
                        <div className="bg-indigo-900 p-2 rounded-full mr-3">
                          <FaChartLine className="text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Score</div>
                          <div className="font-semibold text-white">{assessment.score}</div>
                        </div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Result</div>
                        <div className="font-medium text-white">{assessment.interpretation}</div>
                      </div>
                    </div>
                    
                    {assessment.recommendations && (
                      <div className="mt-4 bg-indigo-900 bg-opacity-20 p-4 rounded-lg border border-indigo-800">
                        <p className="font-medium text-indigo-300 mb-1">Recommendations:</p>
                        <p className="text-gray-300">{assessment.recommendations}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-indigo-900 bg-opacity-30 p-4 rounded-full mb-4">
                  <FaClipboardList size={32} className="text-indigo-400" />
                </div>
                <p className="text-gray-400 mb-6">You haven't completed any assessments yet.</p>
                <button
                  onClick={() => setShowHistory(false)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200"
                >
                  Take Your First Assessment
                </button>
              </div>
            )}
            
            {pastAssessments.length > 0 && (
              <button
                onClick={() => setShowHistory(false)}
                className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center justify-center mx-auto"
              >
                Take Another Assessment <FaClipboardList className="ml-2" />
              </button>
            )}
          </div>
        ) : result ? (
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="mb-6 text-center">
              <div className="inline-block bg-indigo-900 bg-opacity-50 p-4 rounded-full mb-4">
                <FaBrain size={36} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Assessment Results</h2>
            </div>
            
            <div className="mb-6 bg-gray-900 bg-opacity-70 rounded-lg p-5 border border-gray-700">
              <h3 className="font-semibold text-xl text-indigo-300 mb-2">{selectedType.name}</h3>
              <p className="text-gray-400">{selectedType.description}</p>
            </div>
            
            <div className="bg-indigo-900 bg-opacity-20 rounded-xl p-6 mb-8 border border-indigo-800">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-indigo-800">
                <div className="text-lg">
                  <span className="text-gray-400">Your Score:</span> 
                  <span className="ml-2 text-2xl font-bold text-indigo-300">{result.score}</span>
                </div>
                <div className="bg-indigo-900 px-3 py-1 rounded-full">
                  <span className="text-indigo-300 font-medium">{result.interpretation}</span>
                </div>
              </div>
              
              {result.recommendations && (
                <div>
                  <span className="text-indigo-300 font-semibold mb-2 block">Recommendations:</span>
                  <p className="text-gray-300 bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">{result.recommendations}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetAssessment}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Take Another Assessment <FaClipboardList className="ml-2" />
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="px-6 py-3 border border-indigo-500 hover:border-indigo-400 text-indigo-300 rounded-lg font-semibold hover:bg-indigo-900 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center"
              >
                View Assessment History <FaHistory className="ml-2" />
              </button>
            </div>
          </div>
        ) : selectedType ? (
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-300 mb-2">{selectedType.name}</h2>
              <p className="text-gray-400">{selectedType.description}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => {
                const options = JSON.parse(question.options || '[]');
                return (
                  <div key={question.question_id} className="mb-8 border-b border-gray-700 pb-8">
                    <p className="font-medium mb-4 text-white">
                      <span className="inline-block bg-indigo-900 text-indigo-300 rounded-full w-8 h-8 text-center leading-8 mr-2">
                        {index + 1}
                      </span>
                      {question.question_text}
                    </p>
                    
                    {options.length > 0 ? (
                      <div className="space-y-2 ml-10">
                        {options.map((option) => (
                          <label 
                            key={option.value} 
                            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                              answers[question.question_id] === option.value
                                ? 'bg-indigo-900 bg-opacity-40 border-indigo-500'
                                : 'hover:bg-gray-700 border-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question_${question.question_id}`}
                              value={option.value}
                              checked={answers[question.question_id] === option.value}
                              onChange={() => handleAnswerChange(question.question_id, option.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                            />
                            <span className={answers[question.question_id] === option.value ? 'text-indigo-300' : 'text-gray-300'}>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={answers[question.question_id] || ''}
                        onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your answer"
                      />
                    )}
                  </div>
                );
              })}
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={resetAssessment}
                  className="px-6 py-3 border border-indigo-500 hover:border-indigo-400 text-indigo-300 rounded-lg font-semibold hover:bg-indigo-900 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center"
                >
                  <FaArrowLeft className="mr-2" /> Back to Assessments
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  Submit Assessment <FaCheck className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessmentTypes.map((type) => (
              <div 
                key={type.type_id} 
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-indigo-900/30 cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => handleSelectType(type)}
              >
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl shadow-lg mr-5 text-white">
                    <FaClipboardList size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-300 mb-2">{type.name}</h3>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-indigo-400 bg-indigo-900 bg-opacity-40 px-3 py-1 rounded-full">
                    {type.estimatedTime || '5-10'} minutes
                  </span>
                  <button className="bg-indigo-900 hover:bg-indigo-800 p-2 rounded-full group transition-all duration-200">
                    <FaArrowRight className="text-indigo-300 group-hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;
