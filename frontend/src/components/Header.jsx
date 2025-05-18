import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  FaHome, FaBook, FaBrain, FaSignOutAlt, FaBars, FaTimes,  
  FaClipboardList, FaBullseye, FaRobot, FaUser, FaCog, FaChevronDown
} from 'react-icons/fa';

// Predefined avatar options
const avatars = [
  { id: 'default', image: null, icon: <FaUser className="text-white" /> },
  { id: 'avatar1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', name: 'Professional' },
  { id: 'avatar2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', name: 'Cheerful' },
  { id: 'avatar3', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces', name: 'Cool' },
  { id: 'avatar4', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces', name: 'Creative' },
  { id: 'avatar5', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=faces', name: 'Friendly' },
  { id: 'avatar6', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces', name: 'Thoughtful' },
];

// App routes for authenticated users
const appRoutes = [
  { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { path: '/journal', label: 'Journal', icon: <FaBook /> },
  { path: '/goals', label: 'Goals', icon: <FaBullseye /> },
  { path: '/assessments', label: 'Assessments', icon: <FaClipboardList /> },
  { path: '/ai-chat', label: 'AI Chat', icon: <FaRobot /> },
];

// Static links for home page sections
const homeLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'tech-stack', label: 'Tech Used' },
  { id: 'contact', label: 'Contact' }
];

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Refs for click outside handling
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Username/display name
  const displayName = user?.firstName || user?.username || 'User';
  
  // Get current avatar
  const userAvatar = user?.avatar || 'default';
  const currentAvatar = avatars.find(a => a.id === userAvatar) || avatars[0];
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Check if a given route is active
  const isActiveRoute = (path) => location.pathname === path;
  
  // Handle smooth scroll for home page sections
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    // Close mobile menu
    setMobileMenuOpen(false);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Handle navigation to app routes
  const navigateTo = (path) => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    navigate(path);
  };
  
  // Handle logout
  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`w-full top-0 z-50 bg-gradient-to-r from-gray-900/95 via-indigo-900/95 to-gray-900/95 border-b border-indigo-800 shadow-lg backdrop-blur-md
      ${isAuthenticated ? 'sticky' : 'fixed'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="flex items-center space-x-2"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="bg-indigo-900/60 p-2 rounded-lg shadow-md">
                <FaBrain className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                Mental Health Journey
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {isAuthenticated ? (
              // App routes for authenticated users
              appRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors
                    ${isActiveRoute(route.path) 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                    }`}
                >
                  <span className="text-indigo-400">{route.icon}</span>
                  <span>{route.label}</span>
                </Link>
              ))
            ) : (
              // Home page links for non-authenticated users
              isHomePage && homeLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:bg-indigo-800/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))
            )}
          </nav>
          
          {/* Right side: Auth buttons or user profile */}
          <div className="flex items-center">
            {isAuthenticated ? (
              // User profile dropdown for authenticated users
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-indigo-900/30 px-3 py-2 rounded-lg hover:bg-indigo-800/50 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden flex items-center justify-center">
                    {currentAvatar.image ? (
                      <img 
                        src={currentAvatar.image} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      currentAvatar.icon
                    )}
                  </div>
                  <span className="text-indigo-100 font-medium hidden sm:block">
                    {displayName}
                  </span>
                  <FaChevronDown className={`text-indigo-300 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-gray-900 via-indigo-900/90 to-gray-900 rounded-lg shadow-xl border border-indigo-800 overflow-hidden">
                    <div className="py-2 px-4 border-b border-indigo-800/50">
                      <p className="text-indigo-100 font-medium">{displayName}</p>
                      <p className="text-indigo-400 text-sm truncate">{user?.email || ''}</p>
                    </div>
                    
                    <div className="py-1">
                      {appRoutes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          className={`block px-4 py-2 text-sm ${
                            isActiveRoute(route.path)
                              ? 'bg-indigo-800 text-white'
                              : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                          } flex items-center space-x-2`}
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span className="text-indigo-400">{route.icon}</span>
                          <span>{route.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-1 border-t border-indigo-800/50">
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-800/50 hover:text-white flex items-center space-x-2"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaCog className="text-indigo-400" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 flex items-center space-x-2"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Auth buttons for non-authenticated users
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-indigo-200 hover:text-white hover:bg-indigo-800/50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 md:hidden bg-indigo-900/30 p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800/50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/95 md:hidden overflow-auto">
          <div className="px-4 pt-5 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Link 
                  to="/"
                  className="flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="bg-indigo-900/60 p-2 rounded-lg shadow-md">
                    <FaBrain className="h-6 w-6 text-indigo-400" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                    Mental Health Journey
                  </span>
                </Link>
              </div>
              <button 
                className="p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            {isAuthenticated ? (
              <>
                {/* User info */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-indigo-800/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden flex items-center justify-center">
                    {currentAvatar.image ? (
                      <img 
                        src={currentAvatar.image} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      currentAvatar.icon
                    )}
                  </div>
                  <div>
                    <p className="text-indigo-100 font-medium">{displayName}</p>
                    <p className="text-indigo-400 text-sm">{user?.email || ''}</p>
                  </div>
                </div>
                
                {/* App navigation */}
                <div className="space-y-2 mb-8">
                  <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    Navigation
                  </p>
                  {appRoutes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={`block px-3 py-3 rounded-lg font-medium text-base ${
                        isActiveRoute(route.path)
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                      } flex items-center space-x-3`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={`${isActiveRoute(route.path) ? 'text-indigo-200' : 'text-indigo-400'}`}>
                        {route.icon}
                      </span>
                      <span>{route.label}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Settings & Logout */}
                <div className="space-y-2 border-t border-indigo-800/50 pt-4">
                  <Link
                    to="/settings"
                    className="block px-3 py-3 rounded-lg font-medium text-base text-indigo-200 hover:bg-indigo-800/50 hover:text-white flex items-center space-x-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCog className="text-indigo-400" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-3 rounded-lg font-medium text-base text-red-400 hover:bg-red-900/30 hover:text-red-300 flex items-center space-x-3"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Home sections for non-authenticated users */}
                {isHomePage && (
                  <div className="space-y-2 mb-8">
                    <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      Navigation
                    </p>
                    {homeLinks.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        className="block px-3 py-3 rounded-lg font-medium text-base text-indigo-200 hover:bg-indigo-800/50 hover:text-white"
                        onClick={(e) => {
                          scrollToSection(e, link.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                
                {/* Auth buttons */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-indigo-800/50 pt-6">
                  <Link
                    to="/login"
                    className="text-center px-3 py-3 rounded-lg font-medium text-base text-indigo-200 border border-indigo-700 hover:bg-indigo-800/50 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-center px-3 py-3 rounded-lg font-medium text-base text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;