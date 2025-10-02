import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search,
  MessageCircle,
  Heart,
  Repeat2,
  Share2,
  MoreHorizontal,
  CheckCircle
} from 'lucide-react';
import { useTheme } from './Layout.jsx';

const Dashboard = () => {
  const { theme } = useTheme();

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

  return (
    <>
      {/* Top Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-30 ${theme.sidebarBg} backdrop-blur-xl ${theme.border} border-b px-6 py-4`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>Co-Founder Feed</h1>
            <p className={`${theme.textMuted} mt-1`}>Discover opportunities and connect with entrepreneurs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-lg ${theme.hover} ${theme.textSecondary} transition-all`}>
              <Bell className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg ${theme.hover} ${theme.textSecondary} transition-all`}>
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

          {/* Posts Feed */}
          <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
            {mockPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold ${theme.text}`}>{post.author.name}</h3>
                        {post.author.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`${theme.textMuted}`}>{post.author.handle}</span>
                        <span className={`${theme.textMuted}`}>·</span>
                        <span className={`${theme.textMuted}`}>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className={`${theme.textSecondary} leading-relaxed text-lg`}>{post.content}</p>
                </div>

                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 ${theme.textMuted} hover:text-blue-400 transition-colors`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{post.replies}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 ${theme.textMuted} hover:text-green-400 transition-colors`}
                    >
                      <Repeat2 className="w-5 h-5" />
                      <span className="font-medium">{post.reposts}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 ${theme.textMuted} hover:text-red-400 transition-colors`}
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{post.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 ${theme.textMuted} hover:text-blue-400 transition-colors`}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Connect
                  </motion.button>
                </div>
              </motion.article>
            ))}

      {/* Load More */}
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
    </>
  );
};

export default Dashboard;
