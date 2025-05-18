import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";
import AiChat from "./pages/AiChat";
import Goals from "./pages/Goals";
import Assessments from "./pages/Assessments";
import Settings from "./pages/Settings"; // Import the Settings component
import { FaBrain} from 'react-icons/fa';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow px-2 sm:px-4 md:px-8 py-4">
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
              {/* <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tech-stack" element={<TechStack />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-[#0F172A] flex items-center justify-center text-indigo-200 text-center py-5 px-4 sm:px-6 md:px-8">
            <div className="w-full mx-auto flex items-center justify-between text-center">
              <div className=" flex">
                <FaBrain className="text-3xl text-indigo-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mental Health Journey
                </h3>
              </div>
              <p className=" text-sm">
                Supporting your mental health one step at a time.
              </p>
              
              <div className="text-sm text-indigo-400 ">
                © {new Date().getFullYear()} Mental Health Journey. All rights
                reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
