import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Code, 
  Star, 
  Users, 
  TrendingUp, 
  Activity,
  Calendar,
  Github
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Dashboard = () => {
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
      { name: 'awesome-project', stars: 234, language: 'JavaScript' },
      { name: 'ml-toolkit', stars: 187, language: 'Python' },
      { name: 'react-components', stars: 156, language: 'TypeScript' },
    ]
  };

  const recentActivity = [
    { type: 'commit', repo: 'awesome-project', message: 'Added new feature for user authentication', time: '2 hours ago' },
    { type: 'star', repo: 'ml-toolkit', message: 'Received a star from user_123', time: '5 hours ago' },
    { type: 'fork', repo: 'react-components', message: 'Forked by developer_456', time: '1 day ago' },
    { type: 'commit', repo: 'awesome-project', message: 'Fixed bug in payment processing', time: '2 days ago' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your GitHub profile overview.</p>
      </motion.div>

      {/* GitHub Profile Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Github className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">@{githubStats.username}</CardTitle>
                <CardDescription>Full Stack Developer & Entrepreneur</CardDescription>
              </div>
              <div className="ml-auto">
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repositories</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{githubStats.repositories}</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{githubStats.followers}</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contributions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{githubStats.contributions}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Following</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{githubStats.following}</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Languages & Top Repositories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Top Languages
              </CardTitle>
              <CardDescription>Programming languages you use most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {githubStats.languages.map((language, index) => (
                  <div key={language} className="flex items-center justify-between">
                    <span className="font-medium">{language}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${100 - index * 15}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{100 - index * 15}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Top Repositories
              </CardTitle>
              <CardDescription>Your most starred repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {githubStats.topRepos.map((repo) => (
                  <div key={repo.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{repo.name}</p>
                      <p className="text-sm text-muted-foreground">{repo.language}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{repo.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest GitHub activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.repo}</span> - {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
