import React, { useState, useEffect } from 'react';
import {
  Image,
  Hash,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  X,
  PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/Layout.jsx';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient.js';
import Toast from '../components/Toast.jsx';

const CreatePost = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [postContent, setPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [fundingStage, setFundingStage] = useState('');
  const [location, setLocation] = useState('');
  const [UserInfo, setUserInfo] = useState({ fullName: '', avatar_url: '', Email: '' })

  const availableTags = [
    'AI/ML', 'FinTech', 'HealthTech', 'SaaS', 'E-commerce', 'EdTech',
    'PropTech', 'CleanTech', 'Blockchain', 'IoT', 'Mobile', 'Web3',
    'B2B', 'B2C', 'Marketplace', 'Social', 'Gaming', 'Entertainment'
  ];

  const fundingStages = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Bootstrapped'
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user)
          return;

        const metadata = data.user.user_metadata;

        setUserInfo({
          fullName: metadata.name || '',
          avatar_url: metadata.avatar_url || '',
          Email: metadata.email || ''
        })
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserInfo();
  }, [])

  const handleSubmit = async () => {
    // console.log({
    //   content: postContent,
    //   tags: selectedTags,
    //   fundingStage,
    //   location,
    //   requiredSkills,
    //   createdAt: new Date().toISOString()
    // });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.error('User not authenticated', userError);
      alert('You must be signed in to create a post.');
      return;
    }

    const uid = userData.user.id;

    if (!postContent.trim()) return;


    const requiredskills = extractSkillsFromPost(postContent, selectedTags);

    const post = {
      user_id: uid,
      post_content: postContent,
      tags: selectedTags,
      funding_stage: [fundingStage],
      location,
      // required_skills: requiredSkills,
      created_at: new Date().toISOString()
    };


    // Persist post locally so other pages (Matchings) can pick it up.
    try {
      // const key = 'fyco_posts';
      // const existing = JSON.parse(localStorage.getItem(key) || '[]');
      // existing.unshift(post);
      // localStorage.setItem(key, JSON.stringify(existing));
      const { data, error } = await supabase.from('posts').insert([post])

      if (error) {
        console.error('Error inserting post:', error);
        alert('Failed to publish post. Please try again.');
        return;
      }
      Toast.success("Post created successfully ..")
      return data;


    } catch (err) {
      console.error('Error creating the post. Try again ..', err);
    }

    // Navigate back to dashboard and show a toast message
    navigate('/dashboard', { state: { showToast: true, message: 'Post published — successfully' } });
  };


  // Very small keyword-based extractor. Keeps things client-side and simple.
  const extractSkillsFromPost = (text = '', tags = []) => {
    const t = (text || '').toLowerCase();
    const skills = new Set();

    // Map some keywords / tags to skills
    const keywordMap = {
      react: ['React'],
      node: ['Node.js'],
      javascript: ['JavaScript'],
      typescript: ['TypeScript'],
      python: ['Python'],
      django: ['Django'],
      flask: ['Flask'],
      aws: ['AWS'],
      azure: ['Azure'],
      gcp: ['GCP'],
      docker: ['Docker'],
      kubernetes: ['Kubernetes'],
      ml: ['Machine Learning'],
      ai: ['Machine Learning'],
      'machine learning': ['Machine Learning'],
      'data science': ['Data Science'],
      solidity: ['Solidity'],
      blockchain: ['Blockchain'],
      'ui': ['UI Design'],
      'ux': ['UX Design'],
      design: ['UI/UX Design'],
      product: ['Product Management'],
      marketing: ['Marketing'],
      growth: ['Growth Marketing'],
      seo: ['SEO'],
      sales: ['Sales'],
      ios: ['iOS'],
      android: ['Android'],
      mobile: ['Mobile Development'],
      'react native': ['React Native'],
      postgres: ['PostgreSQL'],
      mysql: ['MySQL'],
      mongodb: ['MongoDB'],
      'computer vision': ['Computer Vision']
    };

    // check keywords in text
    Object.keys(keywordMap).forEach((kw) => {
      if (t.includes(kw)) keywordMap[kw].forEach(s => skills.add(s));
    });

    // Also map selected industry tags to common skills
    const tagMap = {
      'AI/ML': ['Machine Learning', 'Python'],
      'FinTech': ['Payments', 'Security'],
      'HealthTech': ['Healthcare', 'Data Science'],
      'SaaS': ['Product Management', 'Marketing'],
      'E-commerce': ['Payments', 'Growth Marketing'],
      'EdTech': ['Education', 'Product Management'],
      'Blockchain': ['Blockchain', 'Solidity'],
      'Mobile': ['Mobile Development'],
      'Web3': ['Blockchain'],
      'B2B': ['Sales', 'Business Development'],
      'B2C': ['Growth Marketing', 'Product']
    };

    tags.forEach(tag => {
      const mapped = tagMap[tag];
      if (mapped) mapped.forEach(s => skills.add(s));
    });

    // Fallback: if no skills detected, suggest generic startup roles
    if (skills.size === 0) {
      skills.add('Product Management');
      skills.add('Full-Stack Development');
      skills.add('Design');
    }

    return Array.from(skills);
  };

  const charactersRemaining = 500 - postContent.length;

  // const get

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>Create Post</h1>
            <p className={theme.textSecondary}>Share your startup idea and connect with potential co-founders</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!postContent.trim()}
            className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all ${!postContent.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
              } shadow-lg flex items-center space-x-2`}
          >
            <PlusCircle size={18} />
            <span>Publish Post</span>
          </motion.button>
        </div>
      </motion.div>


      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  YO
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme.text} mb-2`}>What's your startup idea?</h3>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Describe your startup idea, what you've built so far, and what kind of co-founder you're looking for..."
                    className={`w-full h-40 bg-transparent ${theme.text} placeholder-${theme.textMuted.split('-')[1]}-400 border-none outline-none resize-none text-lg`}
                    maxLength={500}
                  />
                  <div className={`flex items-center justify-between mt-4 pt-4 ${theme.border} border-t`}>
                    <div className="flex items-center space-x-4">
                      <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                        <Image className="w-5 h-5" />
                      </button>
                      <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                        <Hash className="w-5 h-5" />
                      </button>
                      <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                    <span className={`text-sm ${charactersRemaining < 50 ? 'text-red-400' : theme.textMuted}`}>
                      {charactersRemaining} characters remaining
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
            >
              <h3 className={`font-semibold ${theme.text} mb-4 flex items-center space-x-2`}>
                <Hash className="w-5 h-5" />
                <span>Industry Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : `${theme.cardBg} ${theme.textSecondary} ${theme.hover} ${theme.border} border`
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <p className={`text-sm ${theme.textMuted} mb-2`}>Selected tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                      >
                        <span>#{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag)}
                          className="hover:text-blue-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
            >
              <h3 className={`font-semibold ${theme.text} mb-4 flex items-center space-x-2`}>
                <TrendingUp className="w-5 h-5" />
                <span>Startup Details</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Funding Stage */}
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                    Funding Stage
                  </label>
                  <select
                    value={fundingStage}
                    onChange={(e) => setFundingStage(e.target.value)}
                    className={`w-full p-3 rounded-lg ${theme.cardBg} ${theme.border} border ${theme.text} focus:border-blue-500 outline-none`}
                  >
                    <option value="">Select stage</option>
                    {fundingStages.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    className={`w-full p-3 rounded-lg ${theme.cardBg} ${theme.border} border ${theme.text} placeholder-${theme.textMuted.split('-')[1]}-400 focus:border-blue-500 outline-none`}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
            >
              <h3 className={`font-semibold ${theme.text} mb-4`}>✨ Tips for Great Posts</h3>
              <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Be specific about your product and vision</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Mention your current progress and traction</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Clearly state what skills you're looking for</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Include relevant industry tags</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Be authentic and passionate</span>
                </li>
              </ul>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
            >
              <h3 className={`font-semibold ${theme.text} mb-4`}>Preview</h3>
              {postContent.trim() ? (
                <div className={`mt-8 pt-6 ${theme.border} border-t`}>
                  <div className={`flex items-center space-x-3 p-3 rounded-xl ${theme.cardBg} backdrop-blur-md mb-3`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {UserInfo.avatar_url ? (
                        <img
                          src={UserInfo.avatar_url}
                          alt={UserInfo.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-semibold">
                          {UserInfo.fullName ? UserInfo.fullName[0].toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`${theme.text} font-medium`}>{UserInfo.fullName || ''}</div>
                      <div className={`${theme.textMuted} text-sm`}>{UserInfo.email || ''}
                        <span className="ml-2 text-xs text-gray-400">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`${theme.textSecondary} text-sm`}>{postContent}</p>
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className={`text-sm ${theme.textMuted} italic`}>Start typing to see preview...</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;