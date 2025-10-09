import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { motion } from 'framer-motion';
import { 
  MessageCircle,
  Heart,
  Repeat2,
  Share2,
  MoreHorizontal,
  CheckCircle,
  Users,
  Sparkles
} from 'lucide-react';
import { useTheme } from './Layout.jsx';
import  Spline  from '@splinetool/react-spline';
import { supabase, getPosts, testSupabaseConnection } from '../lib/supabaseClient.js';
const Dashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // navigation-state driven toast (e.g. after sign-in/signup)
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};
  const [toast, setToast] = useState({ open: !!navState.showToast, message: navState.message || '', duration: 3000 });

  useEffect(() => {
    if (navState.showToast) {
      // clear the navigation state so toast doesn't reappear on refresh/back
      navigate(location.pathname, { replace: true });
    }
  }, [navState, navigate, location.pathname]);


  // Removed mockPosts - using real data from Supabase

  const tabs = [
    {
      id: 'for-you',
      label: 'For You',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Personalized recommendations'
    },
    {
      id: 'following',
      label: 'Following',
      icon: <Users className="w-4 h-4" />,
      description: 'Posts from your network'
    }
  ];

  // Load posts and user when component mounts
  useEffect(() => {
    loadPosts();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      console.log('Current user:', user);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  // Track posts state changes
  useEffect(() => {
    console.log("Posts state changed:", posts);
  }, [posts]);

  const loadPosts = async () => {
    try {
      console.log('Starting to fetch posts...');
      const { data, error } = await getPosts();
      console.log('Raw response from getPosts:', { data, error });
      
      if (error) {
        console.error('Error fetching posts:', error);
        alert(`Error fetching posts: ${error.message}`);
      } else {
        console.log("Number of posts fetched:", data?.length || 0);
        console.log("The posts are: ", data);
        setPosts(data || []);
        console.log("Posts state after setting:", data || []);
      }
    } catch (err) {
      console.error('Error loading posts:', err);
      alert(`Catch error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const generateAvatar = (userId) => {
    
    if (currentUser && userId === currentUser.id && currentUser.email) {
      const username = currentUser.email.split('@')[0];
      return username.substring(0, 2).toUpperCase();
    }
    return userId.substring(0, 2).toUpperCase();
  };

  const getDisplayName = (userId) => {
    if (currentUser && userId === currentUser.id && currentUser.email) {
      return currentUser.email.split('@')[0];
    }
    return 'Anonymous User';
  };

  const getHandle = (userId) => {
    if (currentUser && userId === currentUser.id && currentUser.email) {
      return `@${currentUser.email.split('@')[0]}`;
    }
    return `@user_${userId.substring(0, 8)}`;
  };

  const handleTestConnection = async () => {
    console.log('Testing Supabase connection...');
    const result = await testSupabaseConnection();
    console.log('Test result:', result);
    
    console.log('Testing getPosts...');
    const postsResult = await getPosts();
    console.log('Posts result:', postsResult);
  };

  return (
  <div className="min-h-screen">
      <div className={`sticky top-0 z-30 ${theme.sidebarBg} backdrop-blur-xl ${theme.border} border-b`}>
     
        <div className="flex">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative px-6 py-4 transition-all duration-300 ${
                activeTab === tab.id 
                  ? `${theme.text} font-semibold` 
                  : `${theme.textMuted} hover:${theme.textSecondary}`
              }`}
              whileHover={{ backgroundColor: activeTab === tab.id ? 'transparent' : (theme.hover.includes('gray-700') ? 'rgba(75, 85, 99, 0.1)' : 'rgba(156, 163, 175, 0.1)') }}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab.icon}
                <span className="text-base">{tab.label}</span>
              </div>
              
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="divide-y divide-gray-700/20">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${theme.textMuted} text-lg`}>No posts yet</p>
              <p className={`${theme.textMuted} text-sm mt-2`}>Be the first to share your startup idea!</p>
            </div>
          ) : activeTab === 'for-you' ? (
            posts.map((post, index) => (
              <motion.article
                key={post.post_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-4 ${theme.hover} transition-colors cursor-pointer`}
              >
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {generateAvatar(post.user_id)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <h3 className={`font-bold ${theme.text} truncate`}>{getDisplayName(post.user_id)}</h3>
                      <span className={`${theme.textMuted} text-sm`}>{getHandle(post.user_id)}</span>
                      <span className={`${theme.textMuted} text-sm`}>·</span>
                      <span className={`${theme.textMuted} text-sm`}>{formatTimeAgo(post.created_at)}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className={`${theme.textSecondary} leading-relaxed`}>{post.post_content}</p>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {post.location && (
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                          📍 {post.location}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between max-w-md mt-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center space-x-1 ${theme.textMuted} hover:text-blue-400 transition-colors`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">0</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center space-x-1 ${theme.textMuted} hover:text-green-400 transition-colors`}
                      >
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-sm">0</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center space-x-1 ${theme.textMuted} hover:text-red-400 transition-colors`}
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">0</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${theme.textMuted} hover:text-blue-400 transition-colors`}
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className={`${theme.textMuted} text-lg`}>Following tab - Coming soon</p>
            </div>
          )}

          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-8"
            >
              <button className={`${theme.cardBg} backdrop-blur-md ${theme.border} border px-8 py-3 rounded-lg ${theme.textSecondary} hover:${theme.text} transition-all`}>
                Load More Posts
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Toast
        open={toast.open}
        message={toast.message}
        duration={toast.duration}
        onClose={() => setToast({ open: false, message: '' })}
      />
    </div>
  );
};

export default Dashboard;
