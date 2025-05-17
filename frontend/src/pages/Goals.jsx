import React, { useState, useEffect } from 'react';
import goalService from '../services/goalService';
import { FaPlus, FaCheck, FaPencilAlt, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_date: '',
    status: 'not_started',
    progress: 0
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getUserGoals();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'progress' ? parseInt(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGoalId) {
        await goalService.updateGoal(editingGoalId, formData);
      } else {
        await goalService.createGoal(formData);
      }
      resetForm();
      fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleEdit = (goal) => {
    setFormData({
      title: goal.title,
      description: goal.description || '',
      target_date: goal.target_date ? goal.target_date.split('T')[0] : '',
      status: goal.status,
      progress: goal.progress
    });
    setEditingGoalId(goal.goal_id);
    setShowAddForm(true);
  };

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalService.deleteGoal(goalId);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      target_date: '',
      status: 'not_started',
      progress: 0
    });
    setEditingGoalId(null);
    setShowAddForm(false);
  };

  const incrementProgress = async (goal, increment) => {
    const newProgress = Math.min(100, Math.max(0, goal.progress + increment));
    try {
      await goalService.updateGoal(goal.goal_id, { progress: newProgress });
      fetchGoals();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 font-sans py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            My Goals
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            {showAddForm ? 'Cancel' : <><FaPlus className="mr-2" /> Add New Goal</>}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 p-8 rounded-2xl shadow-2xl mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-200">{editingGoalId ? 'Edit Goal' : 'Create New Goal'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Target Date</label>
                  <input
                    type="date"
                    name="target_date"
                    value={formData.target_date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-200 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 rounded-lg bg-gray-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="abandoned">Abandoned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Progress: <span className="font-bold">{formData.progress}%</span>
                  </label>
                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleInputChange}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 border border-indigo-700 rounded-lg text-indigo-200 hover:bg-indigo-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
                >
                  {editingGoalId ? 'Update Goal' : 'Create Goal'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div key={goal.goal_id} className="bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-100">{goal.title}</h3>
                    {goal.target_date && (
                      <p className="text-sm text-indigo-300">
                        Target: {new Date(goal.target_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-2 text-indigo-400 hover:bg-indigo-800 rounded-full transition"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.goal_id)}
                      className="p-2 text-red-400 hover:bg-red-900 rounded-full transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                {goal.description && (
                  <p className="mt-2 text-indigo-200">{goal.description}</p>
                )}
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      goal.status === 'completed' ? 'bg-green-900 text-green-300' :
                      goal.status === 'in_progress' ? 'bg-blue-900 text-blue-300' :
                      goal.status === 'abandoned' ? 'bg-red-900 text-red-300' :
                      'bg-gray-800 text-indigo-200'
                    }`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => incrementProgress(goal, -10)}
                        className="p-1 text-indigo-300 hover:bg-indigo-800 rounded transition"
                        disabled={goal.progress <= 0}
                      >
                        <FaChevronDown />
                      </button>
                      <span className="text-sm font-bold text-indigo-100">{goal.progress}%</span>
                      <button
                        onClick={() => incrementProgress(goal, 10)}
                        className="p-1 text-indigo-300 hover:bg-indigo-800 rounded transition"
                        disabled={goal.progress >= 100}
                      >
                        <FaChevronUp />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-indigo-900 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        goal.status === 'completed' ? 'bg-green-400' :
                        goal.status === 'abandoned' ? 'bg-red-400' :
                        'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 p-10 rounded-2xl shadow-xl text-center">
              <p className="text-indigo-300 mb-4">You don't have any goals yet.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
              >
                Create Your First Goal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
