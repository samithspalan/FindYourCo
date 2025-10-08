import React, { useState, useEffect } from 'react';
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
const Dashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('for-you');


  const mockPosts = [
    {
      id: 1,
      author: { name: 'Sarah Chen', handle: '@sarah_chen', avatar: 'SC', verified: true },
      time: '2h',
      content: 'Seeking a technical co-founder for my AI-powered productivity platform. We\'ve validated product-market fit with 10K+ users and $50K ARR. Looking for someone with React/Node.js expertise and startup experience.',
      likes: 127,
      reposts: 34,
      replies: 18,
      tags: ['AI', 'Productivity', 'B2B SaaS']
    },
    {
      id: 2,
      author: { name: 'Marcus Rodriguez', handle: '@marcus_dev', avatar: 'MR', verified: false },
      time: '4h',
      content: 'Building the next generation of remote collaboration tools. Currently at $25K MRR with strong growth. Looking for a business co-founder with marketing and sales experience to scale to $1M ARR.',
      likes: 89,
      reposts: 12,
      replies: 23,
      tags: ['Remote Work', 'SaaS', 'Collaboration']
    },
    {
      id: 3,
      author: { name: 'Elena Park', handle: '@elena_design', avatar: 'EP', verified: true },
      time: '6h',
      content: 'Healthcare tech entrepreneur seeking CTO co-founder. We\'re revolutionizing patient care with AI diagnostics. Already have pilot partnerships with 3 hospitals and $2M in pre-seed funding.',
      likes: 203,
      reposts: 45,
      replies: 31,
      tags: ['HealthTech', 'AI', 'Diagnostics']
    },
    {
      id: 4,
      author: { name: 'David Kim', handle: '@david_fintech', avatar: 'DK', verified: false },
      time: '8h',
      content: 'FinTech startup focused on crypto payment solutions for SMBs. Looking for a technical co-founder with blockchain and payment processing experience. We have LOIs from 50+ merchants.',
      likes: 156,
      reposts: 28,
      replies: 19,
      tags: ['FinTech', 'Crypto', 'Payments']
    }
  ];

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
          {activeTab === 'for-you' && mockPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-4 py-4 ${theme.hover} transition-colors cursor-pointer border-b ${theme.border}/20`}
            >
            
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.author.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <h3 className={`font-bold ${theme.text} truncate`}>{post.author.name}</h3>
                    {post.author.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                    <span className={`${theme.textMuted} text-sm`}>{post.author.handle}</span>
                    <span className={`${theme.textMuted} text-sm`}>·</span>
                    <span className={`${theme.textMuted} text-sm`}>{post.time}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className={`${theme.textSecondary} leading-relaxed`}>{post.content}</p>
                  </div>
                  {post.tags && (
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
                  <div className="flex items-center justify-between max-w-md mt-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-1 ${theme.textMuted} hover:text-blue-400 transition-colors`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.replies}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-1 ${theme.textMuted} hover:text-green-400 transition-colors`}
                    >
                      <Repeat2 className="w-4 h-4" />
                      <span className="text-sm">{post.reposts}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-1 ${theme.textMuted} hover:text-red-400 transition-colors`}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
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
            ))}

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function DashboardToastHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const [toast, setToast] = useState({ open: !!state.showToast, message: state.message || '', duration: 3000 });

  useEffect(() => {
    if (state.showToast) {
      // clear the navigation state so toast doesn't reappear on refresh/back
      navigate(location.pathname, { replace: true });
    }
  }, [state, navigate, location.pathname]);

  return (
    <Toast
      open={toast.open}
      message={toast.message}
      duration={toast.duration}
      onClose={() => setToast({ open: false, message: '' })}
    />
  );
}
