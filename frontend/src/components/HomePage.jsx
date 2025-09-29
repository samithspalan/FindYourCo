import { useState } from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Chip,
  IconButton
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
  Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleGitHubLogin = () => {
    // For now, just navigate to dashboard (dummy)
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Share Ideas",
      description: "Post your innovative ideas and get feedback from potential cofounders",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <People className="w-8 h-8" />,
      title: "Find Cofounders",
      description: "Connect with like-minded entrepreneurs who complement your skills",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <RocketLaunch className="w-8 h-8" />,
      title: "Build Together",
      description: "Collaborate on projects and turn ideas into successful startups",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Scale Up",
      description: "Access resources, mentorship, and network to grow your venture",
      gradient: "from-pink-500 to-red-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "2.5K+", label: "Ideas Shared" },
    { number: "500+", label: "Teams Formed" },
    { number: "150+", label: "Startups Launched" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <Container maxWidth="xl" className="py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="text-white w-5 h-5" />
              </div>
              <Typography variant="h6" className="text-white font-bold">
                CofounderConnect
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outlined" 
                className="text-white border-white/30 hover:border-white/50"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6"
              >
                Login with GitHub
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <Container maxWidth="lg" className="text-center">
          <div className="mb-8">
            <Chip 
              label="✨ Now in Beta" 
              className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-white/20 mb-6"
            />
          </div>
          
          <Typography 
            variant="h1" 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Where
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Ideas </span>
            Meet
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Cofounders</span>
          </Typography>
          
          <Typography 
            variant="h5" 
            className="text-gray-300 mb-12 py-10 mx-auto leading-relaxed"
          >
            The X-style platform for entrepreneurs to share innovative ideas, 
            connect with potential cofounders, and build the next big thing together.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              variant="contained"
              size="large"
              startIcon={<GitHub />}
              onClick={handleGitHubLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            >
              Get Started with GitHub
            </Button>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              className="text-white border-white/30 hover:border-white/50 px-8 py-3 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <Typography variant="h3" className="text-white font-bold mb-1">
                  {stat.number}
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 px-4">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography 
              variant="h2" 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Everything you need to
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> succeed</span>
            </Typography>
            <Typography 
              variant="h6" 
              className="text-gray-300 max-w-2xl mx-auto"
            >
              From idea validation to team formation, we've got you covered
            </Typography>
          </div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  className={`h-full bg-gradient-to-br ${feature.gradient} p-0.5 rounded-xl cursor-pointer transition-all duration-300 ${
                    hoveredCard === index ? 'scale-105 shadow-2xl' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="bg-slate-900/90 backdrop-blur-sm h-full rounded-xl p-8">
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} text-white mr-4`}>
                        {feature.icon}
                      </div>
                      <Typography variant="h5" className="text-white font-bold">
                        {feature.title}
                      </Typography>
                    </div>
                    <Typography variant="body1" className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <Container maxWidth="md">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10">
            <CardContent className="p-12 text-center">
              <Business className="text-white w-16 h-16 mx-auto mb-6" />
              <Typography variant="h3" className="text-white font-bold mb-4">
                Ready to find your cofounder?
              </Typography>
              <Typography variant="h6" className="text-gray-300 mb-8 max-w-lg mx-auto">
                Join thousands of entrepreneurs already building the future together
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<GitHub />}
                onClick={handleGitHubLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 text-lg"
              >
                Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="text-white w-5 h-5" />
              </div>
              <Typography variant="h6" className="text-white font-bold">
                CofounderConnect
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-400">
              © 2024 CofounderConnect. Building the future, together.
            </Typography>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
