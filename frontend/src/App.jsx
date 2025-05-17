import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';
import AiChat from './pages/AiChat';
import Goals from './pages/Goals';
import Assessments from './pages/Assessments';
import Settings from './pages/Settings'; // Import the Settings component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/journal" 
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/goals" 
                element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assessments" 
                element={
                  <ProtectedRoute>
                    <Assessments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-chat" 
                element={
                  <ProtectedRoute>
                    <AiChat />
                  </ProtectedRoute>
                } 
              />
              {/* Add the Settings route */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center py-4 text-sm">
            © {new Date().getFullYear()} Mental Health Journey. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;