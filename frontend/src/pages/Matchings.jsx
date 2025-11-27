import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users,
  MapPin,
  Star,
  MessageCircle,
  Calendar,
  Filter,
  Search,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  X,
  Check,
  Eye,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
// navigate not used in this file
import { useTheme } from '../components/Layout.jsx';
import { getLoggedInUserProfile } from '../services/profileService';
import { findSimilarEmployeesForFounder, findSimilarStartupsForEmployee } from '../services/matchingService';
import { getFullEmployeeDetails } from '../services/employeeLookupService';
import { getFullStartupDetails } from '../services/founderLookupService';
import structureMatchOutput from '../services/structureMatchOutput';
import { Skeleton } from '@mui/material';

const Matchings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Matches', count: 24 },
    { id: 'high', label: 'High Match', count: 8 },
    { id: 'new', label: 'New This Week', count: 5 },
    { id: 'contacted', label: 'Contacted', count: 6 },
    { id: 'favorites', label: 'Favorites', count: 3 }
  ];

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      try {
        const userProfile = await getLoggedInUserProfile();
        setUserProfile(userProfile);
        let aiResults = [];
        const enriched = [];

        console.log("User Profile in Matchings:", userProfile);

        if (userProfile?.role === 'founder') {
          aiResults = await findSimilarEmployeesForFounder();
          for (const r of aiResults) {
            const details = await getFullEmployeeDetails(r.employeeId);
            enriched.push(structureMatchOutput(r, details));
          }
        } else if (userProfile?.role === 'employee') {
          aiResults = await findSimilarStartupsForEmployee();
          for (const r of aiResults) {
            const details = await getFullStartupDetails(r.startupId);
            enriched.push(structureMatchOutput(r, details));
          }
        }

        console.log("Enriched Matches:", enriched);
        setMatches(enriched);
      } catch (err) {
        setMatches([]);
      }
      setLoading(false);
    }
    loadMatches();
  }, []);

  const sortedMatches = [...matches].sort((a, b) => b.matchPercentage - a.matchPercentage);

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-400/10 border-green-400/30';
    if (percentage >= 80) return 'bg-blue-400/10 border-blue-400/30';
    if (percentage >= 70) return 'bg-yellow-400/10 border-yellow-400/30';
    return 'bg-gray-400/10 border-gray-400/30';
  };

    // Skeleton for loading state
const renderSkeletonCards = () => (
  <div className="grid lg:grid-cols-2 gap-6">
    {[...Array(4)].map((_, idx) => (
      <div
        key={idx}
        className="bg-white/90 border border-blue-200 rounded-2xl p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <Skeleton width={90} height={28} style={{ backgroundColor: "#e0e7ff" }} />
        </div>
        <div className="flex items-start space-x-4 mb-4 pt-8">
          <Skeleton variant="circular" width={64} height={64} style={{ backgroundColor: "#c7d2fe" }} />
          <div className="flex-1">
            <Skeleton width={120} height={20} style={{ backgroundColor: "#a5b4fc" }} />
            <Skeleton width={80} height={16} style={{ marginTop: 8, backgroundColor: "#a5b4fc" }} />
            <Skeleton width={60} height={14} style={{ marginTop: 8, backgroundColor: "#a5b4fc" }} />
          </div>
        </div>
        <Skeleton count={2} height={12} style={{ marginBottom: 12, backgroundColor: "#c7d2fe" }} />
        <div className="mb-4">
          <Skeleton width={60} height={14} style={{ backgroundColor: "#a5b4fc" }} />
          <div className="flex gap-2 mt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={50} height={20} style={{ borderRadius: 10, backgroundColor: "#e0e7ff" }} />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Skeleton width={60} height={14} style={{ backgroundColor: "#a5b4fc" }} />
          <div className="flex gap-2 mt-2">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} width={50} height={20} style={{ borderRadius: 10, backgroundColor: "#e0e7ff" }} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <Skeleton width={100} height={14} style={{ backgroundColor: "#a5b4fc" }} />
          <Skeleton width={80} height={14} style={{ marginTop: 8, backgroundColor: "#a5b4fc" }} />
        </div>
        <div className="flex items-center justify-between">
          <div />
          <div className="flex items-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={36} height={36} style={{ borderRadius: 8, backgroundColor: "#e0e7ff" }} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

  return (
    <div className="w-full px-6 py-8">
      
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>{userProfile?.role === 'founder' ? 'Employee/Co-Founder Matches' : 'Startup Matches'}</h1>
            <p className={theme.textSecondary}>{userProfile?.role === 'founder' ? 'Find your t co-founder/employee match' : 'Find your ideal  startup match'}</p>
            {requiredSkills && requiredSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <div className={`text-sm ${theme.textMuted} mr-2 self-center`}>Requirements:</div>
                {requiredSkills.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matches..."
                className={`pl-10 pr-4 py-3 rounded-lg ${theme.cardBg} ${theme.border} border ${theme.text} placeholder-gray-400 focus:border-blue-500 outline-none w-64`}
              />
            </div>
            <button className={`p-3 rounded-lg ${theme.hover} ${theme.textSecondary} transition-all`}>
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-8">
       
        {/* <div className="w-64 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
          >
            <h3 className={`font-semibold ${theme.text} mb-4`}>Filters</h3>
            <div className="space-y-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    selectedFilter === option.id
                      ? 'bg-blue-600 text-white'
                      : `${theme.hover} ${theme.textSecondary}`
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedFilter === option.id
                      ? 'bg-white/20'
                      : 'bg-gray-600/30'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl`}
          >
            <h3 className={`font-semibold ${theme.text} mb-4`}>Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className={`text-2xl font-bold ${theme.text}`}>{sortedMatches.length}</div>
                <div className={`text-sm ${theme.textMuted}`}>Total Matches</div>
              </div>
              <div>
                <div className={`text-2xl font-bold text-green-400`}>8</div>
                <div className={`text-sm ${theme.textMuted}`}>High Match (90%+)</div>
              </div>
              <div>
                <div className={`text-2xl font-bold text-blue-400`}>5</div>
                <div className={`text-sm ${theme.textMuted}`}>New This Week</div>
              </div>
            </div>
          </motion.div>
        </div> */}

        {/* Matches Grid */}
        <div className="flex-1">
           {loading ? (
            renderSkeletonCards()
          ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {sortedMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => { setSelectedMatch(match); setIsModalOpen(true); }}
                role="button"
                tabIndex={0}
                className={`${theme.cardBg} backdrop-blur-md ${theme.border} border rounded-2xl p-6 shadow-xl relative overflow-hidden cursor-pointer group`}
              >
                {/* Match Badge with Reasoning Tooltip (only on badge hover) */}
                <div className="absolute top-4 right-4 group/badge" style={{ cursor: 'pointer', position: 'relative' }}>
                  <div className={`px-3 py-1 rounded-full border ${getMatchBgColor(match.matchPercentage)} flex items-center space-x-1 text-sm font-medium ${getMatchColor(match.matchPercentage)} group-hover/badge:bg-opacity-90`}
                    >
                    <Star className="w-4 h-4" />
                    <span>{match.matchPercentage}% match</span>
                  </div>
                  {/* Reasoning Tooltip - only on badge hover */}
                  <div className="absolute right-0 mt-2 z-50 hidden group-hover/badge:block bg-white text-gray-800 text-xs rounded shadow-lg p-3 w-72 border border-gray-200"
                       style={{ top: '100%', minWidth: '200px', maxWidth: '320px', whiteSpace: 'normal' }}>
                    <div className="font-semibold mb-1 text-blue-600">Reason for Match</div>
                    <div>{match.reasoning || 'No reasoning provided.'}</div>
                  </div>
                </div>

                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-4 pt-8 relative z-10">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {match.avatar}
                    </div>
                    {match.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`text-lg font-bold ${theme.text}`}>{match.name}</h3>
                        <p className={`${theme.textSecondary} font-medium`}>{match.role}</p>
                        <div className={`flex items-center space-x-4 mt-2 text-sm ${theme.textMuted}`}>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{match.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className={`${theme.textSecondary} text-sm mb-4 line-clamp-3 relative z-10`}>
                  {match.bio}
                </p>

                {/* Skills */}
                <div className="mb-4 relative z-10">
                  <h4 className={`text-sm font-medium ${theme.textMuted} mb-2`}>Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {match.skills.length > 4 && (
                      <span className={`px-3 py-1 ${theme.cardBg} ${theme.textMuted} rounded-full text-xs`}>
                        +{match.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                      {/*Interests */}
                <div className="mb-4 relative z-10">
                  <h4 className={`text-sm font-medium ${theme.textMuted} mb-2`}>Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.interests.slice(0, 4).map((interest, interestIndex) => (
                      <span
                        key={interestIndex}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                    {match.interests.length > 4 && (
                      <span className={`px-3 py-1 ${theme.cardBg} ${theme.textMuted} rounded-full text-xs`}>
                        +{match.interests.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Experience/Education/Companies */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center space-x-2 mt-1">
                    <Award className={`w-4 h-4 ${theme.textMuted}`} />
                    <span className={`text-sm ${theme.textMuted}`}>
                      {match.previousCompanies.join(', ') || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between relative z-10">
                  <div />
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted} transition-all`}>
                      <Heart className="w-5 h-5" />
                    </button>
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}

          {/* Load More */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <button className={`${theme.cardBg} backdrop-blur-md ${theme.border} border px-8 py-3 rounded-lg ${theme.textSecondary} hover:${theme.text} transition-all`}>
              Load More Matches
            </button>
          </motion.div> */}
        </div>
      </div>
      {/* Match Details Modal */}
      {isModalOpen && selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
          <div className={`relative w-full max-w-2xl mx-auto p-6 rounded-2xl ${theme.cardBg} ${theme.border} border shadow-xl z-60`}> 
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {selectedMatch.avatar}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${theme.text}`}>{selectedMatch.name}</h3>
                  <p className={`${theme.textSecondary}`}>{selectedMatch.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-sm ${theme.textMuted}`}>{selectedMatch.location}</div>
                <button onClick={() => setIsModalOpen(false)} className={`px-3 py-2 rounded-lg ${theme.hover} ${theme.textMuted}`}>Close</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`text-sm font-medium ${theme.textMuted} mb-2`}>Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMatch.skills.map((s, idx) => {
                    const isMatch = (requiredSkills || []).map(x => x.toLowerCase()).includes(s.toLowerCase());
                    return (
                      <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${isMatch ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/10 text-blue-400'}`}>
                        {s}{isMatch ? ' ✓' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-medium ${theme.textMuted} mb-2`}>Profile Details</h4>
                <div className={`text-sm ${theme.textSecondary} space-y-2`}>
                  {selectedMatch.previousCompanies.length > 0 &&  <div><strong>Previous Companies:</strong> {selectedMatch.previousCompanies.join(', ')}</div>}
                 
                  <div><strong>Interests:</strong> {selectedMatch.interests.join(', ')}</div>
                  <div className="pt-2"><strong>Bio:</strong> <div className={`${theme.textSecondary} text-sm`}>{selectedMatch.bio}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matchings;