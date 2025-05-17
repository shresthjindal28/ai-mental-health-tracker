import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  FaUser, FaLock, FaCheck, FaChevronDown, FaChevronUp, FaPalette, 
  FaBell, FaTrash, FaSave, FaUndo, FaEye, FaEyeSlash
} from 'react-icons/fa';

// Predefined avatar options with Unsplash images
const avatars = [
  { id: 'default', image: null, icon: <FaUser className="text-white" />, name: 'Default Avatar' },
  { id: 'avatar1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', name: 'Professional' },
  { id: 'avatar2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', name: 'Cheerful' },
  { id: 'avatar3', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces', name: 'Cool' },
  { id: 'avatar4', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces', name: 'Creative' },
  { id: 'avatar5', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=faces', name: 'Friendly' },
  { id: 'avatar6', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces', name: 'Thoughtful' },
];

const SettingSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-6 border border-indigo-800 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 shadow-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-indigo-900/30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="bg-indigo-800 p-2 rounded-lg text-indigo-300">
            {icon}
          </span>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <span>
          {isOpen ? <FaChevronUp className="text-indigo-300" /> : <FaChevronDown className="text-indigo-300" />}
        </span>
      </div>
      
      {isOpen && (
        <div className="p-5 border-t border-indigo-800">
          {children}
        </div>
      )}
    </div>
  );
};

const Settings = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Profile settings
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'default');
  
  // Password settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(user?.settings?.emailNotifications || false);
  const [reminderNotifications, setReminderNotifications] = useState(user?.settings?.reminderNotifications || false);
  
  // Other settings
  const [darkMode, setDarkMode] = useState(user?.settings?.darkMode || true);
  const [dataSharing, setDataSharing] = useState(user?.settings?.dataSharing || false);
  
  useEffect(() => {
    // Reset form with user data when it changes
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setSelectedAvatar(user.avatar || 'default');
      
      if (user.settings) {
        setEmailNotifications(user.settings.emailNotifications || false);
        setReminderNotifications(user.settings.reminderNotifications || false);
        setDarkMode(user.settings.darkMode || true);
        setDataSharing(user.settings.dataSharing || false);
      }
    }
  }, [user]);
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      await updateUserProfile({
        firstName,
        lastName,
        bio,
        avatar: selectedAvatar,
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      // Implement password change logic
      await updateUserProfile({ 
        currentPassword, 
        newPassword 
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      await updateUserProfile({
        settings: {
          ...user?.settings,
          emailNotifications,
          reminderNotifications
        }
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdatePreferences = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      await updateUserProfile({
        settings: {
          ...user?.settings,
          darkMode,
          dataSharing
        }
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAccountDeletion = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion logic
      alert('Account deletion would be implemented here');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-gray-400 mb-8">Manage your account preferences and profile information</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded-lg text-red-300">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-800 rounded-lg text-green-300 flex items-center">
            <FaCheck className="mr-2" /> Settings updated successfully
          </div>
        )}

        <SettingSection title="Profile Information" icon={<FaUser />} defaultOpen={true}>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Avatar column */}
              <div className="flex flex-col items-center md:col-span-1">
                <div className="mb-4">
                  <span className="block text-indigo-300 mb-2 font-medium text-center">Your Avatar</span>
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                    {(() => {
                      const avatar = avatars.find(a => a.id === selectedAvatar);
                      return avatar?.image ? (
                        <img
                          src={avatar.image}
                          alt={avatar.name || "Avatar"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        avatar?.icon
                      );
                    })()}
                  </div>
                </div>
                <div>
                  <label className="block text-indigo-300 mb-2 font-medium text-center">Change Avatar</label>
                  <div className="grid grid-cols-4 gap-2">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`cursor-pointer relative rounded-full overflow-hidden border-2 transition-all duration-200 w-12 h-12 flex items-center justify-center
                          ${selectedAvatar === avatar.id 
                            ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-900/50' 
                            : 'border-gray-700 hover:border-indigo-400'
                          }`}
                        title={avatar.name}
                      >
                        {avatar.image ? (
                          <img
                            src={avatar.image}
                            alt={avatar.name || "Avatar option"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          avatar.icon
                        )}
                        {selectedAvatar === avatar.id && (
                          <div className="absolute top-0 right-0 bg-indigo-500 rounded-full p-0.5">
                            <FaCheck size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Profile fields */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-indigo-300 mb-1 font-medium">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-300 mb-1 font-medium">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-indigo-300 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled // Email usually requires special verification to change
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact support to change your email address</p>
                </div>
                <div>
                  <label className="block text-indigo-300 mb-1 font-medium">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </SettingSection>
        
        <SettingSection title="Security & Password" icon={<FaLock />}>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-indigo-300 mb-1 font-medium">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-indigo-300 mb-1 font-medium">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-indigo-300 mb-1 font-medium">Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-indigo-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </SettingSection>
        
        <SettingSection title="Notifications" icon={<FaBell />}>
          <form onSubmit={handleUpdateNotifications} className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-indigo-800 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-gray-400 text-sm">Receive updates and summaries via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-indigo-800 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Reminders</h3>
                <p className="text-gray-400 text-sm">Get reminders for journaling and goal tracking</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminderNotifications}
                  onChange={() => setReminderNotifications(!reminderNotifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </SettingSection>
        
        <SettingSection title="Preferences" icon={<FaPalette />}>
          <form onSubmit={handleUpdatePreferences} className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-indigo-800 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Dark Mode</h3>
                <p className="text-gray-400 text-sm">Enable dark theme for the application</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-indigo-800 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Data Usage</h3>
                <p className="text-gray-400 text-sm">Allow anonymous data collection to improve our service</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataSharing}
                  onChange={() => setDataSharing(!dataSharing)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center transition-all duration-200"
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </SettingSection>
        
        <SettingSection title="Danger Zone" icon={<FaTrash />}>
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <h3 className="text-red-400 font-medium mb-2">Delete Account</h3>
            <p className="text-gray-400 text-sm mb-4">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAccountDeletion}
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg font-medium flex items-center"
              >
                <FaTrash className="mr-2" /> Delete Account
              </button>
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default Settings;
