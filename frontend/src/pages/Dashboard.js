import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Code, 
  Star, 
  Users, 
  TrendingUp, 
  Activity,
  Calendar,
  Github,
  ChevronRight,
  GitCommit,
  GitPullRequest,
  GitFork
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock GitHub profile data
  const githubStats = {
    username: 'john_doe',
    avatar: 'https://github.com/github.png',
    repositories: 42,
    followers: 125,
    following: 89,
    contributions: 847,
    languages: ['JavaScript', 'Python', 'TypeScript', 'Go', 'React'],
    topRepos: [
      { name: 'awesome-project', stars: 234, language: 'JavaScript', description: 'A collection of awesome things' },
      { name: 'ml-toolkit', stars: 187, language: 'Python', description: 'Machine learning utilities' },
      { name: 'react-components', stars: 156, language: 'TypeScript', description: 'Reusable React components' },
    ]
  };

  const recentActivity = [
    { 
      type: 'commit', 
      repo: 'awesome-project', 
      message: 'Added new feature for user authentication', 
      time: '2 hours ago',
      icon: <GitCommit className="h-4 w-4 text-blue-500" />
    },
    { 
      type: 'star', 
      repo: 'ml-toolkit', 
      message: 'Received a star from user_123', 
      time: '5 hours ago',
      icon: <Star className="h-4 w-4 text-yellow-500" />
    },
    { 
      type: 'fork', 
      repo: 'react-components', 
      message: 'Forked by developer_456', 
      time: '1 day ago',
      icon: <GitFork className="h-4 w-4 text-purple-500" />
    },
    { 
      type: 'pr', 
      repo: 'awesome-project', 
      message: 'Merged PR #42: Fixed payment processing bug', 
      time: '2 days ago',
      icon: <GitPullRequest className="h-4 w-4 text-green-500" />
    },
  ];

  const handleLogin = () => {
    // No backend yet: navigate directly to Home Feed
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen bg-background p-4 md:p-6">
      {/* Subtle animated background gradient */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent blur-3xl opacity-20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground/70">Welcome</span>
          </h1>
          <p className="text-muted-foreground">Connect your GitHub to personalize your dashboard. Since we don't have a backend yet, use the Login button to jump into the Home feed.</p>
          

          {/* Tabs (kept for layout, optional) */}
          <div className="flex space-x-1 mt-6 p-1 bg-muted rounded-lg max-w-md">
            {['overview', 'repositories', 'projects', 'packages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-card shadow text-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* GitHub Profile Section */}
          <motion.div variants={item}>
            <Card className="bg-card/80 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Github className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground">@{githubStats.username}</CardTitle>
                    <CardDescription className="text-muted-foreground">Full Stack Developer & Open Source Contributor</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">JavaScript</span>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">React</span>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">Node.js</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        className="group transition-all duration-200 hover:bg-accent hover:border-border"
                        onClick={handleLogin}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Login & Go to Home
                        <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={item}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Repositories', value: githubStats.repositories, icon: <GitBranch className="h-5 w-5" />, change: '+3', color: 'indigo' },
                { title: 'Followers', value: githubStats.followers, icon: <Users className="h-5 w-5" />, change: '+12', color: 'blue' },
                { title: 'Contributions', value: githubStats.contributions, icon: <Activity className="h-5 w-5" />, change: 'This year', color: 'green' },
                { title: 'Following', value: githubStats.following, icon: <TrendingUp className="h-5 w-5" />, change: '+5', color: 'purple' },
              ].map((stat) => (
                <motion.div 
                  key={stat.title}
                  variants={item}
                  whileHover={item.hover}
                  whileTap={item.tap}
                >
                  <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                          {stat.icon}
                        </div>
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Languages Card */}
            <motion.div 
              variants={item}
              className="lg:col-span-1"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Code className="mr-2 h-5 w-5 text-primary" />
                    Top Languages
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Your most used languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {githubStats.languages.map((language, index) => {
                      const width = 90 - (index * 15);
                      const colorHue = index * 70 + 200;
                      return (
                        <div key={language} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{language}</span>
                            <span className="text-xs text-muted-foreground">{width}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div 
                              className="h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${width}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              style={{ 
                                backgroundColor: `hsl(${colorHue}, 80%, 60%)`,
                                boxShadow: `0 0 10px hsla(${colorHue}, 80%, 60%, 0.4)`
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Repositories & Activity */}
            <motion.div 
              variants={item}
              className="lg:col-span-2 space-y-6"
            >
              {/* Top Repositories */}
              <motion.div variants={item}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center text-foreground">
                      <Star className="mr-2 h-5 w-5 text-yellow-500" />
                      Top Repositories
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">Your most starred repositories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <AnimatePresence>
                        {githubStats.topRepos.map((repo, index) => (
                          <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="group"
                          >
                            <div className="flex flex-col p-4 rounded-lg bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Code className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {repo.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1 text-yellow-500">
                                  <Star className="h-4 w-4" />
                                  <span className="text-sm text-muted-foreground">{repo.stars}</span>
                                </div>
                              </div>
                              {repo.description && (
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                  {repo.description}
                                </p>
                              )}
                              <div className="mt-2 flex items-center justify-between">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {repo.language}
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={item}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center text-foreground">
                      <Activity className="mr-2 h-5 w-5 text-purple-500" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">Your latest GitHub activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {recentActivity.map((activity, index) => (
                          <motion.div
                            key={`${activity.repo}-${index}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                          >
                            <div className="relative pl-6 pb-4 border-l-2 border-border last:border-0 last:pb-0 group-hover:border-primary/40 transition-colors">
                              <div className="absolute left-0 w-3 h-3 rounded-full bg-primary -translate-x-[calc(0.5rem+1px)] translate-y-1.5 group-hover:bg-primary/90 transition-colors"></div>
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {activity.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground">
                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                      {activity.repo}
                                    </span>{' '}
                                    {activity.message}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
