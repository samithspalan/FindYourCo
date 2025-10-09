import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Plus, 
  Bot, 
  Users, 
  LogOut,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut, supabase } from '../lib/supabaseClient';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const settingsRef = useRef(null);

  const handleLogout = async () => {
    setShowSettings(false);
    try { await signOut(); } catch (e) { /* ignore */ }
    try { localStorage.removeItem('fyco_isLoggedIn'); } catch (e) {}
    // navigate home and pass a toast message via navigation state
    navigate('/', { state: { showToast: true, message: 'Logged out' } });
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowSettings(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current user on component mount
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  // Helper function to get display name from email
  const getDisplayName = () => {
    if (currentUser && currentUser.email) {
      return currentUser.email.split('@')[0];
    }
    return 'Your Name';
  };

  // Helper function to get handle from email  
  const getHandle = () => {
    if (currentUser && currentUser.email) {
      return `@${currentUser.email.split('@')[0]}`;
    }
    return '@yourhandle';
  };

  // Helper function to generate avatar from email
  const generateUserAvatar = () => {
    if (currentUser && currentUser.email) {
      const username = currentUser.email.split('@')[0];
      return username.substring(0, 2).toUpperCase();
    }
    return 'YO';
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Posts', icon: <Home className="w-6 h-6" />, path: '/dashboard' },
    { id: 'create', label: 'Create Post', icon: <Plus className="w-6 h-6" />, path: '/create-post' },
    { id: 'ai-chat', label: 'AI Assistant', icon: <Bot className="w-6 h-6" />, path: '/ai-chat' },
    { id: 'matchings', label: 'Matchings', icon: <Users className="w-6 h-6" />, path: '/matchings' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setShowSettings(false); 
  };

  const theme = {
    bg: isDarkMode ? 'from-gray-900 via-gray-800 to-black' : 'from-blue-50 via-white to-blue-100',
    cardBg: isDarkMode ? 'bg-gray-800/80' : 'bg-white/90',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200',
    sidebarBg: isDarkMode ? 'bg-gray-900/90' : 'bg-gradient-to-r from-white via-blue-50/30 to-white',
    hover: isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50/30'
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} transition-all duration-300`}>
     
        <motion.nav
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`fixed left-0 top-0 h-full w-64 ${theme.sidebarBg} backdrop-blur-xl ${theme.border} border-r p-6 flex flex-col z-40`}
        >
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              Find<span className="text-blue-500">YourCo</span>
            </h1>
            <p className={`text-sm ${theme.textMuted} mt-1`}>Professional Network</p>
          </div>

          <div className="space-y-2 flex-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : `${theme.textSecondary} ${theme.hover}`
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
          <div className={`mt-8 pt-6 ${theme.border} border-t`}>
            <div className={`flex items-center space-x-3 p-3 rounded-xl ${theme.cardBg} backdrop-blur-md mb-3`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {generateUserAvatar()}
              </div>
              <div>
                <div className={`${theme.text} font-medium`}>{getDisplayName()}</div>
                <div className={`${theme.textMuted} text-sm`}>{getHandle()}</div>
              </div>
            </div>
            
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`w-full flex items-center justify-between p-3 rounded-xl ${theme.textSecondary} ${theme.hover} transition-all`}
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </div>
                <motion.div
                  animate={{ rotate: showSettings ? 180 : 0 }}
                  className="w-4 h-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute bottom-full left-0 right-0 mb-2 ${theme.cardBg} backdrop-blur-xl ${theme.border} border rounded-xl shadow-xl overflow-hidden`}
                  >
               
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-between p-3 ${theme.hover} transition-all ${theme.textSecondary}`}
                  >
                    <div className="flex items-center space-x-3">
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      <span className="font-medium">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </div>
                    <div className={`w-10 h-5 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'} rounded-full relative transition-all duration-300`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </button>

                 
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 p-3 ${theme.textSecondary} hover:text-red-400 ${theme.hover} transition-all border-t ${theme.border}`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>

        <div className="ml-64 min-h-screen">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;