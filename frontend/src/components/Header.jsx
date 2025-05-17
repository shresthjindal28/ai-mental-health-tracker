import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  FaHome, FaBook, FaChartLine, FaUser, FaBars, FaTimes, FaBrain, 
  FaSignOutAlt, FaClipboardList, FaBullseye, FaRobot, FaChevronDown,
  FaCog, FaCheck
} from 'react-icons/fa';

// Predefined avatar options with Unsplash images
const avatars = [
  { id: 'default', image: null, icon: <FaUser className="text-white" /> },
  { id: 'avatar1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', name: 'Professional' },
  { id: 'avatar2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', name: 'Cheerful' },
  { id: 'avatar3', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces', name: 'Cool' },
  { id: 'avatar4', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces', name: 'Creative' },
  { id: 'avatar5', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=faces', name: 'Friendly' },
  { id: 'avatar6', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces', name: 'Thoughtful' },
];

const Header = () => {
  const { user, logout, isAuthenticated, updateUserProfile } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'default');
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();
  const avatarSelectorRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Extract first name if available
  const firstName = user?.firstName || user?.username || '';

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { path: '/journal', label: 'Journal', icon: <FaBook /> },
    { path: '/goals', label: 'Goals', icon: <FaBullseye /> },
    { path: '/assessments', label: 'Assessments', icon: <FaClipboardList /> },
    { path: '/ai-chat', label: 'AI Chat', icon: <FaRobot /> },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleAvatarSelect = async (avatarId) => {
    setSelectedAvatar(avatarId);
    setShowAvatarSelector(false);
    
    // If you have a function to update user profile, call it here
    if (updateUserProfile) {
      try {
        await updateUserProfile({ avatar: avatarId });
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    }
  };

  // Close avatar selector on outside click
  useEffect(() => {
    if (!showAvatarSelector) return;
    function handleClick(e) {
      if (avatarSelectorRef.current && !avatarSelectorRef.current.contains(e.target)) {
        setShowAvatarSelector(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showAvatarSelector]);

  // Get current avatar data
  const currentAvatar = avatars.find(a => a.id === selectedAvatar) || avatars[0];

  const handleNavigateToSettings = (e) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Stop event propagation
    setDropdownOpen(false); // Close dropdown
    setMobileMenuOpen(false); // Close mobile menu if open
    
    // Use navigate with a slight delay to avoid any race conditions
    setTimeout(() => {
      navigate('/settings');
    }, 50);
  };

  // Sync selectedAvatar with user.avatar
  useEffect(() => {
    setSelectedAvatar(user?.avatar || 'default');
  }, [user?.avatar]);

  return (
    <header className="backdrop-blur-lg bg-gradient-to-r from-gray-900/80 via-indigo-900/70 to-gray-900/80 shadow-lg border-b border-indigo-900 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 select-none"
            style={{
              background: 'rgba(30, 41, 59, 0.7)',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              boxShadow: '0 4px 24px 0 rgba(80,80,255,0.10)'
            }}
          >
            <FaBrain className="text-3xl text-indigo-400 drop-shadow-lg" />
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Mental Health Journey
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 border-l border-indigo-700 pl-4 focus:outline-none group"
                >
                  <div className="relative">
                    <span className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg border-2 border-indigo-700 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                      {currentAvatar.image ? (
                        <img 
                          src={currentAvatar.image} 
                          alt={currentAvatar.name || "User avatar"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        currentAvatar.icon
                      )}
                    </span>
                    {/* Fixed span click handler */}
                    <span 
                      className="absolute -bottom-1 -right-1 bg-indigo-800 rounded-full p-1 border border-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-xs text-white cursor-pointer"
                      onClick={handleNavigateToSettings}
                      title="Profile settings"
                    >
                      <FaCog size={10} />
                    </span>
                  </div>
                  <span className="font-bold text-indigo-100 text-lg capitalize">{firstName}</span>
                  <FaChevronDown className={`ml-1 text-indigo-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 border border-indigo-800 rounded-2xl shadow-2xl z-[999] py-3 animate-fadeIn">
                    <div className="px-5 py-2 text-indigo-300 font-semibold flex items-center gap-2 border-b border-indigo-800 mb-2">
                      <FaUser className="text-indigo-400" />
                      <span>{firstName}</span>
                    </div>
                    <div className="flex flex-col gap-1 px-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
                            isActive(item.path)
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                              : 'hover:bg-indigo-800 text-indigo-200'
                          }`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      
                      {/* Fixed settings link in dropdown */}
                      <button
                        onClick={handleNavigateToSettings}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 hover:bg-indigo-800 text-indigo-200 w-full text-left"
                      >
                        <FaCog />
                        <span>Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-indigo-800 my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-400 hover:bg-red-900 rounded-lg font-semibold transition-all duration-150"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-indigo-200 hover:bg-indigo-800 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-indigo-200 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gradient-to-br from-gray-900/95 via-indigo-900/90 to-gray-900/95 px-4 py-4 rounded-b-2xl shadow-xl animate-fadeIn z-[999]">
          <div className="flex flex-col space-y-4 pb-3">
            {isAuthenticated &&
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 hover:text-white text-indigo-200/90'}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))
            }

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center space-x-2 py-2 border-t border-indigo-800 mt-2 pt-4 focus:outline-none"
                >
                  <div className="relative">
                    <span className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold overflow-hidden">
                      {currentAvatar.image ? (
                        <img 
                          src={currentAvatar.image} 
                          alt={currentAvatar.name || "User avatar"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        currentAvatar.icon
                      )}
                    </span>
                    {/* Fixed span click handler for mobile */}
                    <span 
                      className="absolute -bottom-1 -right-1 bg-indigo-800 rounded-full p-1 border border-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-xs text-white cursor-pointer"
                      onClick={handleNavigateToSettings}
                      title="Profile settings"
                    >
                      <FaCog size={10} />
                    </span>
                  </div>
                  <span className="font-semibold text-indigo-200">{firstName}</span>
                  <FaChevronDown className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="bg-gray-900 border border-indigo-800 rounded-xl shadow-xl z-[999] py-2 mt-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 hover:bg-indigo-800 rounded-lg transition-all duration-150 ${
                          isActive(item.path) ? 'text-indigo-300' : 'text-gray-200'
                        }`}
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-indigo-800 my-2" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:bg-red-900 rounded-lg transition-all duration-150"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col space-y-2 border-t border-indigo-800 mt-2 pt-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-indigo-200 hover:bg-indigo-800 hover:text-white transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;