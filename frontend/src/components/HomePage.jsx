import { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Avatar,
  LinearProgress,
  Skeleton,
  TextField,
  InputAdornment,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import {
  GitHub,
  RocketLaunch,
  People,
  Lightbulb,
  TrendingUp,
  ArrowForward,
  Star,
  Code,
  Business,
  Email,
  Twitter,
  LinkedIn,
  PlayArrow,
  CheckCircle,
  Timeline,
  Speed,
  Security,
  Analytics
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


function useAnimatedNumber(target, { duration = 1200, pause = 3000, loop = true } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let rafId;
    let timeoutId;
    let startTs;
    const from = 0;
    const parsed = Number(target);
    const to = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    const safeDuration = Math.max(0, Number(duration) || 0);
    const safePause = Math.max(0, Number(pause) || 0);
    const step = (ts) => {
      if (startTs === undefined) startTs = ts;
      const progress = safeDuration === 0 ? 1 : Math.min((ts - startTs) / safeDuration, 1);
      const current = from + (to - from) * progress;
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else if (loop) {
        timeoutId = setTimeout(() => {
          startTs = undefined;
          setValue(0);
          rafId = requestAnimationFrame(step);
        }, safePause);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [target, duration, pause, loop]);
  return value;
}


const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [liveStats, setLiveStats] = useState({ users: 10000, ideas: 2500, teams: 500, startups: 150 });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [visibleActivities, setVisibleActivities] = useState(new Set());
  const activityRefs = useRef([]);

  const coWord = 'Cofounders';
  const coLetters = Array.from(coWord.slice(1)); // 'ofounders'
  const [coIndex, setCoIndex] = useState(0);
  useEffect(() => {
    let timer;
    if (coIndex < coLetters.length) {
      timer = setTimeout(() => setCoIndex((i) => i + 1), 140);
    } else {
      // pause before looping
      timer = setTimeout(() => setCoIndex(0), 1000);
    }
    return () => clearTimeout(timer);
  }, [coIndex, coLetters.length]);

  const handleGitHubLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  // Live activity data
  const liveActivities = [
    {
      id: 1,
      avatar: 'SC',
      avatarColor: 'bg-blue-500',
      name: 'Sarah Chen',
      action: 'just posted a new idea',
      time: '2 minutes ago',
      tag: 'AI/ML',
      tagColor: 'bg-purple-500/20 text-purple-300'
    },
    {
      id: 2,
      avatar: 'MK',
      avatarColor: 'bg-green-500',
      name: 'Mike Kumar',
      action: 'found a co-founder match',
      time: '5 minutes ago',
      tag: 'Fintech',
      tagColor: 'bg-green-500/20 text-green-300'
    },
    {
      id: 3,
      avatar: 'EW',
      avatarColor: 'bg-orange-500',
      name: 'Emma Wilson',
      action: 'launched their startup',
      time: '12 minutes ago',
      tag: 'SaaS',
      tagColor: 'bg-orange-500/20 text-orange-300'
    },
    {
      id: 4,
      avatar: 'RL',
      avatarColor: 'bg-purple-500',
      name: 'Robert Lee',
      action: 'joined as technical co-founder',
      time: '18 minutes ago',
      tag: 'Blockchain',
      tagColor: 'bg-indigo-500/20 text-indigo-300'
    },
    {
      id: 5,
      avatar: 'AM',
      avatarColor: 'bg-pink-500',
      name: 'Anna Martinez',
      action: 'secured $50K seed funding',
      time: '25 minutes ago',
      tag: 'EdTech',
      tagColor: 'bg-pink-500/20 text-pink-300'
    },
    {
      id: 6,
      avatar: 'JT',
      avatarColor: 'bg-teal-500',
      name: 'James Thompson',
      action: 'completed MVP development',
      time: '32 minutes ago',
      tag: 'HealthTech',
      tagColor: 'bg-teal-500/20 text-teal-300'
    }
  ];

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    setShowProgress(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setShowProgress(false);
    }, 2000);
  };

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Share Ideas",
      description: "Post your innovative ideas and get feedback from potential cofounders",
      gradient: "from-yellow-400 to-orange-500",
      detailedInfo: {
        subtitle: "Innovative Idea Sharing Platform",
        details: [
          "AI-powered idea validation with instant feedback",
          "Connect with industry experts and potential investors",
          "Visual idea boards with collaborative editing",
          "Privacy controls for sensitive business concepts",
          "Trending ideas discovery and market analysis"
        ],
        stats: { users: "12K+", ideas: "2.5K+", success: "78%" }
      }
    },
    {
      icon: <People className="w-8 h-8" />,
      title: "Find Cofounders",
      description: "Connect with like-minded entrepreneurs who complement your skills",
      gradient: "from-blue-500 to-purple-600",
      detailedInfo: {
        subtitle: "Smart Cofounder Matching System",
        details: [
          "Advanced algorithm matching based on skills & vision",
          "Comprehensive personality and work style assessment",
          "Video introduction profiles and portfolio showcases",
          "Secure messaging with integrated collaboration tools",
          "Success stories and testimonials from matched teams"
        ],
        stats: { matches: "1.8K+", success: "85%", time: "2 weeks avg" }
      }
    },
    {
      icon: <RocketLaunch className="w-8 h-8" />,
      title: "Build Together",
      description: "Collaborate on projects and turn ideas into successful startups",
      gradient: "from-green-500 to-teal-500",
      detailedInfo: {
        subtitle: "Collaborative Development Environment",
        details: [
          "Integrated project management with milestone tracking",
          "Real-time collaboration tools and shared workspaces",
          "Resource library with templates and best practices",
          "Built-in version control for documents and designs",
          "Progress tracking with automated reporting"
        ],
        stats: { projects: "950+", teams: "500+", completion: "92%" }
      }
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Scale Up",
      description: "Access resources, mentorship, and network to grow your venture",
      gradient: "from-pink-500 to-red-500",
      detailedInfo: {
        subtitle: "Growth & Scaling Resources",
        details: [
          "Direct access to VCs, angels, and institutional investors",
          "Mentor matching with industry veterans and experts",
          "Legal and financial resource center with templates",
          "Market expansion strategies and growth hacking tools",
          "Success metrics tracking and performance analytics"
        ],
        stats: { mentors: "200+", funded: "45+", network: "10K+" }
      }
    }
  ];

  const usersTarget = Math.floor(liveStats.users / 1000); // K
  const ideasTarget = Math.floor((liveStats.ideas / 1000) * 10) / 10; // K with 1 decimal
  const teamsTarget = liveStats.teams;
  const startupsTarget = liveStats.startups;

  const usersVal = useAnimatedNumber(usersTarget, { duration: 1200, pause: 3000, loop: true });
  const ideasVal = useAnimatedNumber(ideasTarget, { duration: 1200, pause: 3000, loop: true });
  const teamsVal = useAnimatedNumber(teamsTarget, { duration: 1200, pause: 3000, loop: true });
  const startupsVal = useAnimatedNumber(startupsTarget, { duration: 1200, pause: 3000, loop: true });

  const animatedStats = [
    { label: 'Active Users', display: `${Math.floor(usersVal)}K+` },
    { label: 'Ideas Shared', display: `${Math.max(0, ideasVal).toFixed(1)}K+` },
    { label: 'Teams Formed', display: `${Math.floor(teamsVal)}+` },
    { label: 'Startups Launched', display: `${Math.floor(startupsVal)}+` }
  ];

  const stats = [
    { number: `${Math.floor(liveStats.users/1000)}K+`, label: "Active Users" },
    { number: `${Math.floor(liveStats.ideas/1000*10)/10}K+`, label: "Ideas Shared" },
    { number: `${liveStats.teams}+`, label: "Teams Formed" },
    { number: `${liveStats.startups}+`, label: "Startups Launched" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechFlow",
      avatar: "SC",
      content: "Found my perfect co-founder in just 2 weeks. The AI matching is incredible!",
      company: "$2M raised"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO, DataSync",
      avatar: "MR",
      content: "The platform's idea validation features saved us months of development time.",
      company: "500K users"
    },  
    {
      name: "Emily Watson",
      role: "Founder, EcoTrack",
      avatar: "EW",
      content: "Connected with amazing talent. Our team went from 1 to 15 people!",
      company: "Series A"
    },
   {
    name:"John Doe",
    role:"CEO, TechFlow",
    avatar:"JD",
    content:"Found my perfect co-founder in just 2 weeks. The AI matching is incredible!",
    company:"$2M raised"
   },
   {
    name:"Jane Smith",
    role:"CEO, TechFlow",
    avatar:"JS",
    content:"Found my perfect co-founder in just 2 weeks. The AI matching is incredible!",
    company:"$2M raised"
   }
  ];

  const tabData = [
    {
      label: "For Founders",
      icon: <RocketLaunch />,
      content: {
        title: "Built for ambitious founders",
        description: "Share your vision, validate ideas, and find the perfect co-founder to build your dream startup.",
        features: ["AI-powered matching", "Idea validation tools", "Investor network access"]
      }
    },
    {
      label: "For Developers",
      icon: <Code />,
      content: {
        title: "Connect with visionary leaders",
        description: "Find exciting projects that match your skills and join founding teams building the future.",
        features: ["Skill-based matching", "Equity opportunities", "Technical challenges"]
      }
    },
    {
      label: "For Investors",
      icon: <TrendingUp />,
      content: {
        title: "Discover the next unicorn",
        description: "Get early access to validated ideas and founding teams with proven traction.",
        features: ["Deal flow pipeline", "Team analysis", "Market insights"]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        ideas: prev.ideas + Math.floor(Math.random() * 2),
        teams: prev.teams + (Math.random() > 0.8 ? 1 : 0),
        startups: prev.startups + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            liveActivities.forEach((_, index) => {
              setTimeout(() => {
                setVisibleActivities(prev => new Set([...prev, index]));
              }, index * 200); 
            });
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const container = document.querySelector('[data-activity-container]');
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [liveActivities]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
     
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <Container maxWidth="xl" className="py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="text-white w-5 h-5" />
              </div>
              <Typography variant="h6" className="text-white font-bold">
                Find<span className="text-blue-500 font-bold">Your</span>
                <span className="text-pink-500 font-bold">Co</span>
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outlined" 
                className="text-white border-white/30 hover:border-white/50 "
              >
                About
              </Button>
              <Button 
                variant="outlined" 
                className="text-white border-white/30 hover:border-white/50"
              >
                Features
              </Button>
              <Button
                variant="contained"
                startIcon={<GitHub />}
                onClick={handleGitHubLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 rounded-2xl"
              >
                Login with GitHub
              </Button>
            </div>
          </div>
        </Container>
      </nav>
       
      <section className="pt-32 pb-20 px-4">
        <Container maxWidth="lg" className="text-center">
          <div className="relative flex flex-col items-center">
          <style>{`
  @keyframes fycoSweepGlow {
    0%   { transform: translate(-50%, 0) scale(0.6); opacity: 0.5; filter: blur(8px); }
    60%  { opacity: 0.75; }
    100% { transform: translate(-50%, 0) scale(2.4); opacity: 0.08; filter: blur(26px); }
  }
`}</style>
            </div>
            <div className="mb-8">
              <Chip 
                label="✨ Now in Beta" 
                className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-white/20 mb-1 -mt-10"
              />
            </div>
            <div
              className="pointer-events-none absolute  left-1/2 z-0"
              style={{
                top: '14rem',
                width: '48px',
                height: '48px',
                background: 'radial-gradient(closest-side, rgba(99,102,241,0.95) 0%, rgba(59,130,246,0.75) 40%, rgba(147,51,234,0.55) 60%, rgba(236,72,153,0.0) 82%)',
                boxShadow: '0 0 40px 16px rgba(99,102,241,0.25), 0 0 80px 24px rgba(236,72,153,0.2)',
                mixBlendMode: 'screen',
                animation: 'fycoSweepGlow 3.2s ease-in-out infinite',
              }}
            />
            <div
              className="pointer-events-none absolute  left-1/2 z-0"
              style={{
                top: '14rem',
                width: '72px',
                height: '72px',
                background: 'radial-gradient(closest-side, rgba(99,102,241,0.45) 0%, rgba(59,130,246,0.35) 40%, rgba(147,51,234,0.25) 60%, rgba(236,72,153,0.0) 82%)',
                boxShadow: '0 0 30px 12px rgba(99,102,241,0.18), 0 0 60px 18px rgba(236,72,153,0.15)',
                mixBlendMode: 'screen',
                animation: 'fycoSweepGlow 3.2s ease-in-out infinite',
                animationDelay: '0.45s',
              }}
            />
          
            <Typography 
              variant="h1" 
              className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
            Where
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Ideas </span>
            Meet
           
            <span className="relative inline-block align-baseline ml-1">
              <span className="invisible bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Cofounders</span>
              <span className="absolute inset-0 pointer-events-none">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent whitespace-pre">
              
                  {' '}C 
                  {coLetters.map((ch, idx) => (
                    <span
                      key={idx}
                      className={`inline-block transition-all duration-200 ease-out ${idx < coIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent`}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </Typography>
          
          <Typography 
            variant="h5" 
            className="text-gray-300 mb-12 py-10 mx-auto leading-relaxed"
          >
           The next-generation platform where entrepreneurs share bold ideas, connect with visionary cofounders, and turn groundbreaking concepts into reality.

          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 rounded-2xl">
            <Button
              variant="contained"
              size="large"
              startIcon={<GitHub />}
              onClick={handleGitHubLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 rounded-2xl hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            >
              Get Started with GitHub
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {animatedStats.map((s, index) => (
              <div key={index} className="text-center">
                <Typography variant="h3" className="text-white font-bold mb-1">
                  {s.display}
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  {s.label}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 px-4">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <Fade in timeout={1000}>
              <div>
                <Chip 
                  label="✨ Core Features" 
                  sx={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    mb: 4,
                    fontWeight: 'bold'
                  }}
                />
                <Typography 
                  variant="h2" 
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 700,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Everything you need to succeed
                </Typography>
                <Typography 
                  variant="h6" 
                  className="text-gray-300 max-w-8xl mx-auto"
                  sx={{ 
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                    fontWeight: 400
                  }}
                >
                  From idea validation to team formation, we've got you covered with cutting-edge tools
                </Typography>
              </div>
            </Fade>
          </div>

          <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
            {features.map((feature, index) => (
              <Box 
                key={index} 
                sx={{ mb: 6, position: 'relative' }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Connecting Line Animation */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '41.66%', // Between the two grid items (5/12 width)
                    transform: 'translateY(-50%)',
                    width: hoveredCard === index ? '16.66%' : '0%', // 2/12 width when expanded
                    height: '3px',
                    background: (() => {
                      const gradientMap = {
                        0: 'linear-gradient(90deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8))',
                        1: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))',
                        2: 'linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(20, 184, 166, 0.8))',
                        3: 'linear-gradient(90deg, rgba(236, 72, 153, 0.8), rgba(239, 68, 68, 0.8))'
                      };
                      return gradientMap[index];
                    })(),
                    borderRadius: '2px',
                    transition: 'width 0.5s ease',
                    boxShadow: hoveredCard === index 
                      ? `0 0 15px ${(() => {
                          const colorMap = {
                            0: 'rgba(251, 191, 36, 0.5)',
                            1: 'rgba(59, 130, 246, 0.5)',
                            2: 'rgba(16, 185, 129, 0.5)',
                            3: 'rgba(236, 72, 153, 0.5)'
                          };
                          return colorMap[index];
                        })()}` 
                      : 'none',
                    zIndex: 10
                  }}
                />
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                  {/* Feature Card - Center Left */}
                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Zoom in timeout={600 + index * 200}>
                      <Card
                        elevation={hoveredCard === index ? 8 : 5}
                        sx={{
                          background: 'transparent',
                          border: `2px solid ${hoveredCard === index 
                            ? (() => {
                                const borderMap = {
                                  0: 'rgba(251, 191, 36, 0.6)',
                                  1: 'rgba(59, 130, 246, 0.6)',
                                  2: 'rgba(16, 185, 129, 0.6)',
                                  3: 'rgba(236, 72, 153, 0.6)'
                                };
                                return borderMap[index];
                              })()
                            : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          transform: hoveredCard === index ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: (() => {
                            const shadowMap = {
                              0: hoveredCard === index 
                                ? '0 20px 40px -8px rgba(251, 191, 36, 0.4), 0 6px 12px -2px rgba(249, 115, 22, 0.3)'
                                : '0 10px 25px -5px rgba(251, 191, 36, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.2)',
                              1: hoveredCard === index 
                                ? '0 20px 40px -8px rgba(59, 130, 246, 0.4), 0 6px 12px -2px rgba(147, 51, 234, 0.3)'
                                : '0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(147, 51, 234, 0.2)',
                              2: hoveredCard === index 
                                ? '0 20px 40px -8px rgba(16, 185, 129, 0.4), 0 6px 12px -2px rgba(20, 184, 166, 0.3)'
                                : '0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(20, 184, 166, 0.2)',
                              3: hoveredCard === index 
                                ? '0 20px 40px -8px rgba(236, 72, 153, 0.4), 0 6px 12px -2px rgba(239, 68, 68, 0.3)'
                                : '0 10px 25px -5px rgba(236, 72, 153, 0.3), 0 4px 6px -2px rgba(239, 68, 68, 0.2)'
                            };
                            return shadowMap[index];
                            })()
                          }}
                          >
                          <CardContent
                            sx={{
                            background: 'transparent',
                            borderRadius: '14px',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box
                              sx={{
                              p: 2,
                              borderRadius: '12px',
                              background: 'transparent',
                              border: '1px solid rgba(255,255,255,0.2)',
                              color: 'white',
                              mr: 2,
                              transition: 'all 0.3s ease',
                              }}
                            >
                              {feature.icon}
                            </Box>
                            <Typography 
                              variant="h5" 
                              sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1.5rem',
                              letterSpacing: '-0.025em'
                              }}
                            >
                              {feature.title}
                            </Typography>
                            </Box>
                            
                            <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'rgba(203, 213, 225, 0.9)',
                              lineHeight: 1.7,
                              fontSize: '1.1rem',
                              flexGrow: 1,
                              fontWeight: 400,
                              mb: 2
                            }}
                            >
                            {feature.description}
                            </Typography>

                            <Box
                            sx={{
                              pt: 2,
                              borderTop: '1px solid rgba(255,255,255,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease'
                            }}
                            >
                            <Typography 
                              variant="caption" 
                              sx={{ 
                              color: 'rgba(156, 163, 175, 0.8)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                              fontWeight: 600
                              }}
                            >
                              Hover to connect →
                            </Typography>
                            </Box>
                          </CardContent>
                          </Card>
                        </Zoom>
                        </Box>
                        </Grid>

                        {/* Details Panel - Center Right */}
                  <Grid item xs={12} md={7}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Fade in timeout={800 + index * 300}>
                        <Card
                          elevation={hoveredCard === index ? 8 : 0}
                          sx={{
                            width: '100%',
                            maxWidth: '600px',
                            background: hoveredCard === index 
                              ? (() => {
                                  const bgMap = {
                                    0: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.05))',
                                    1: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05))',
                                    2: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05))',
                                    3: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.05))'
                                  };
                                  return bgMap[index];
                                })()
                              : 'transparent',
                            border: hoveredCard === index 
                              ? `1px solid ${(() => {
                                  const borderMap = {
                                    0: 'rgba(251, 191, 36, 0.3)',
                                    1: 'rgba(59, 130, 246, 0.3)',
                                    2: 'rgba(16, 185, 129, 0.3)',
                                    3: 'rgba(236, 72, 153, 0.3)'
                                  };
                                  return borderMap[index];
                                })()}`
                              : 'none',
                            borderRadius: '16px',
                            transition: 'all 0.5s ease',
                            transform: hoveredCard === index ? 'scale(1.02)' : 'scale(1)',
                            opacity: hoveredCard === index ? 1 : 0.7,
                            boxShadow: hoveredCard === index 
                              ? (() => {
                                  const shadowMap = {
                                    0: '0 8px 30px -4px rgba(251, 191, 36, 0.2)',
                                    1: '0 8px 30px -4px rgba(59, 130, 246, 0.2)',
                                    2: '0 8px 30px -4px rgba(16, 185, 129, 0.2)',
                                    3: '0 8px 30px -4px rgba(236, 72, 153, 0.2)'
                                  };
                                  return shadowMap[index];
                                })()
                              : 'none'
                          }}
                        >
                          <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                              <Box
                                sx={{
                                  p: 2,
                                  borderRadius: '12px',
                                  background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', '').split(' ').map(color => {
                                    const colorMap = {
                                      'yellow-400': '#facc15',
                                      'orange-500': '#f97316',
                                      'blue-500': '#3b82f6',
                                      'purple-600': '#9333ea',
                                      'green-500': '#10b981',
                                      'teal-500': '#14b8a6',
                                      'pink-500': '#ec4899',
                                      'red-500': '#ef4444'
                                    };
                                    return colorMap[color] || '#3b82f6';
                                  }).join(', ')})`,
                                  color: 'white',
                                  mr: 2,
                                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                }}
                              >
                                {feature.icon}
                              </Box>
                              <Box>
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                  {feature.title}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: 'rgba(203, 213, 225, 0.8)', fontSize: '0.9rem' }}>
                                  {feature.detailedInfo.subtitle}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                                Key Features
                              </Typography>
                              {feature.detailedInfo.details.map((detail, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                                  <CheckCircle 
                                    sx={{ 
                                      color: (() => {
                                        const colorMap = {
                                          0: '#facc15',
                                          1: '#3b82f6',
                                          2: '#10b981',
                                          3: '#ec4899'
                                        };
                                        return colorMap[index];
                                      })(),
                                      fontSize: '1.1rem',
                                      mr: 1.5,
                                      mt: 0.1,
                                      flexShrink: 0
                                    }} 
                                  />
                                  <Typography variant="body2" sx={{ color: 'rgba(203, 213, 225, 0.9)', lineHeight: 1.5 }}>
                                    {detail}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>

                            <Box
                              sx={{
                                p: 3,
                                borderRadius: '12px',
                                background: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                                Live Stats
                              </Typography>
                              <Grid container spacing={2}>
                                {Object.entries(feature.detailedInfo.stats).map(([key, value], idx) => (
                                  <Grid item xs={4} key={key}>
                                    <Box sx={{ textAlign: 'center' }}>
                                      <Typography 
                                        variant="h6" 
                                        sx={{ 
                                          color: (() => {
                                            const colorMap = {
                                              0: '#facc15',
                                              1: '#3b82f6',
                                              2: '#10b981',
                                              3: '#ec4899'
                                            };
                                            return colorMap[index];
                                          })(),
                                          fontWeight: 700,
                                          fontSize: '1.2rem'
                                        }}
                                      >
                                        {value}
                                      </Typography>
                                      <Typography 
                                        variant="caption" 
                                        sx={{ 
                                          color: 'rgba(156, 163, 175, 0.8)',
                                          textTransform: 'capitalize',
                                          fontSize: '0.7rem'
                                        }}
                                      >
                                        {key}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </CardContent>
                      </Card>
                      </Fade>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Container>
      </section>



      <section className="py-20 px-4">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-3xl md:text-5xl font-bold text-white mb-6">
              See it in
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> action</span>
            </Typography>
            <Typography variant="h6" className="text-gray-300 max-w-8xl mx-auto">
              Real founders, real connections, real success stories happening right now
            </Typography>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
         
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-emerald-400" />
                    <Typography variant="h6" className="text-white">Growth Metrics</Typography>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Typography variant="body2" className="text-gray-300">Ideas Posted Today</Typography>
                        <Typography variant="body2" className="text-white font-semibold">+{Math.floor(Math.random() * 50 + 20)}</Typography>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={75} 
                        className="h-2 rounded-full bg-slate-700"
                        sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#10b981' } }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <Typography variant="body2" className="text-gray-300">New Connections</Typography>
                        <Typography variant="body2" className="text-white font-semibold">+{Math.floor(Math.random() * 30 + 10)}</Typography>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={60} 
                        className="h-2 rounded-full bg-slate-700"
                        sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' } }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 backdrop-blur-sm">
                  <Typography variant="h6" className="text-white mb-4 flex items-center gap-2">
                    <People className="text-blue-400" />
                    Active Now
                  </Typography>
                  <div className="flex -space-x-2">
                    {[...Array(8)].map((_, i) => (
                      <Avatar key={i} className={`w-8 h-8 border-2 border-slate-800 ${i % 4 === 0 ? 'bg-blue-500' : i % 4 === 1 ? 'bg-green-500' : i % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500'}`}>
                        {String.fromCharCode(65 + i)}
                      </Avatar>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center">
                      <Typography variant="caption" className="text-white text-xs font-semibold">+{Math.floor(Math.random() * 99 + 1)}</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Tabs */}
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="border-b border-white/10">
                  <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    variant="scrollable"
                    scrollButtons={false}
                    className="px-6"
                    sx={{
                      '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)', textTransform: 'none' },
                      '& .MuiTab-root.Mui-selected': { color: 'white' },
                      '& .MuiTabs-indicator': { backgroundColor: '#3b82f6' }
                    }}
                  >
                    {tabData.map((t, idx) => (
                      <Tab key={idx} icon={t.icon} iconPosition="start" label={t.label} />
                    ))}
                  </Tabs>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Typography variant="h5" className="text-white font-bold mb-4">
                        {tabData[activeTab].content.title}
                      </Typography>
                      <Typography variant="body1" className="text-gray-300 mb-6 leading-relaxed">
                        {tabData[activeTab].content.description}
                      </Typography>
                      <div className="space-y-4">
                        {tabData[activeTab].content.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <Typography variant="body1" className="text-gray-200">{f}</Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-white/10 flex items-center justify-center">
                        <PlayArrow className="w-16 h-16 text-white/50" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-white/5 animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Modern Testimonials Carousel */}
      <section className="py-20 px-4 overflow-hidden">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-3xl md:text-5xl font-bold text-white mb-4">
              Success in
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent"> motion</span>
            </Typography>
            <Typography variant="h6" className="text-gray-300">
              Real stories from real founders who found their perfect match
            </Typography>
          </div>
          
          <div className="relative">
            <div className="flex gap-8 transition-transform duration-700 ease-out" 
                 style={{transform: `translateX(-${currentTestimonial * 33.33}%)`}}>
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex-shrink-0 w-full md:w-1/3">
                  <div className={`p-8 rounded-2xl transition-all duration-500 ${
                    idx === currentTestimonial 
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-purple-500/50 transform scale-105' 
                      : 'bg-slate-800/30 border border-white/10 hover:border-white/20'
                  } backdrop-blur-sm`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold">
                          {t.avatar}
                        </Avatar>
                        {idx === currentTestimonial && (
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin opacity-75"></div>
                        )}
                      </div>
                      <div>
                        <Typography variant="h6" className="text-white font-bold">{t.name}</Typography>
                        <Typography variant="body2" className="text-gray-400">{t.role}</Typography>
                        <Chip label={t.company} size="small" className="mt-1 bg-emerald-500/20 text-emerald-300 border-emerald-500/30" />
                      </div>
                    </div>
                    <Typography variant="body1" className="text-gray-200 leading-relaxed italic">
                      "{t.content}"
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <Container maxWidth="md" className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <Typography variant="body2" className="text-emerald-300 font-medium">
                {liveStats.users.toLocaleString()} founders already building
              </Typography>
            </div>
            
            <Typography variant="h2" className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your co-founder is
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> waiting</span>
            </Typography>
            
            <Typography variant="h6" className="text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the most innovative founders building tomorrow's unicorns. 
              Find your perfect match in minutes, not months.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative group">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGitHubLogin}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-lg relative overflow-hidden transition-all duration-300 transform group-hover:scale-105"
                  startIcon={loading ? null : <GitHub className="w-6 h-6" />}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Connecting...
                    </div>
                  ) : (
                    'Start Building Now'
                  )}
                </Button>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
              
              <Button
                variant="text"
                size="large"
                className="text-white/80 hover:text-white px-8 py-4 text-lg font-medium"
                endIcon={<PlayArrow />}
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <Typography variant="body2">Free to start</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Security className="w-5 h-5 text-emerald-400" />
                <Typography variant="body2">Privacy first</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Speed className="w-5 h-5 text-emerald-400" />
                <Typography variant="body2">Match in 24h</Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <Container maxWidth="xl" className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="text-white w-6 h-6" />
                </div>
                <Typography variant="h5" className="text-white font-bold">
                FindYourCO
                </Typography>
              </div>
              
              <Typography variant="body1" className="text-gray-300 mb-6 max-w-md leading-relaxed">
                The AI-powered platform where ambitious founders connect, collaborate, and create the next generation of successful startups.
              </Typography>
              
              <div className="flex gap-4">
                <IconButton className="w-12 h-12 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5">
                  <Twitter />
                </IconButton>
                <IconButton className="w-12 h-12 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5">
                  <LinkedIn />
                </IconButton>
                <IconButton className="w-12 h-12 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/5">
                  <GitHub />
                </IconButton>
              </div>
            </div>

           
            <div>
              <Typography variant="subtitle1" className="text-white font-semibold mb-4">Product</Typography>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Integrations', 'Mobile App'].map((item) => (
                  <li key={item}>
                    <Typography variant="body2" className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <Typography variant="subtitle1" className="text-white font-semibold mb-4">Company</Typography>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <Typography variant="body2" className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <Typography variant="subtitle1" className="text-white font-semibold mb-4">Resources</Typography>
              <ul className="space-y-3">
                {['Help Center', 'Community', 'Webinars', 'Success Stories', 'Newsletter'].map((item) => (
                  <li key={item}>
                    <Typography variant="body2" className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <Typography variant="body2" className="text-gray-500">
              © 2025 FindYourCO Inc. All rights reserved.
            </Typography>
            
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Typography key={item} variant="body2" className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
                  {item}
                </Typography>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-gray-500">
              <Typography variant="body2">Made with</Typography>
              <span className="text-red-500 animate-pulse">❤️</span>
              <Typography variant="body2">for entrepreneurs</Typography>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
