import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  GitHub,
  Lightbulb,
  People,
  TrendingUp,
  ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <Container maxWidth="xl" className="py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="text-white w-5 h-5" />
              </div>
              <Typography variant="h6" className="text-white font-bold">
                CofounderConnect
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8 bg-blue-500">
                <GitHub className="w-4 h-4" />
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                className="text-white border-white/30 hover:border-white/50"
              >
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-24 pb-12 px-4">
        <Container maxWidth="xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <Typography variant="h3" className="text-white font-bold mb-4">
              Welcome to your Dashboard! 🚀
            </Typography>
            <Typography variant="h6" className="text-gray-300 mb-8">
              This is a dummy dashboard. The real implementation will come later.
            </Typography>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
                  <Typography variant="h4" className="text-white font-bold mb-2">
                    12
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Ideas Posted
                  </Typography>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6 text-center">
                  <People className="text-green-400 w-12 h-12 mx-auto mb-4" />
                  <Typography variant="h4" className="text-white font-bold mb-2">
                    3
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Connections
                  </Typography>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="text-pink-400 w-12 h-12 mx-auto mb-4" />
                  <Typography variant="h4" className="text-white font-bold mb-2">
                    85%
                  </Typography>
                  <Typography variant="body1" className="text-gray-300">
                    Profile Score
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="bg-black/20 backdrop-blur-sm border border-white/10 mb-8">
            <CardContent className="p-8">
              <Typography variant="h5" className="text-white font-bold mb-6">
                Recent Activity
              </Typography>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div>
                      <Typography variant="body1" className="text-white">
                        Posted new idea: "AI-powered code review tool"
                      </Typography>
                      <Typography variant="body2" className="text-gray-400">
                        2 hours ago
                      </Typography>
                    </div>
                  </div>
                  <Chip label="Idea" className="bg-blue-500/20 text-blue-300 border-blue-500/30" />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div>
                      <Typography variant="body1" className="text-white">
                        Connected with Sarah Johnson
                      </Typography>
                      <Typography variant="body2" className="text-gray-400">
                        1 day ago
                      </Typography>
                    </div>
                  </div>
                  <Chip label="Connection" className="bg-green-500/20 text-green-300 border-green-500/30" />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div>
                      <Typography variant="body1" className="text-white">
                        Joined project: "EcoTrack - Sustainability App"
                      </Typography>
                      <Typography variant="body2" className="text-gray-400">
                        3 days ago
                      </Typography>
                    </div>
                  </div>
                  <Chip label="Project" className="bg-purple-500/20 text-purple-300 border-purple-500/30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
            <CardContent className="p-8">
              <Typography variant="h5" className="text-white font-bold mb-6">
                Quick Actions
              </Typography>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3"
                  fullWidth
                >
                  Post New Idea
                </Button>
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-3"
                  fullWidth
                >
                  Find Cofounders
                </Button>
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3"
                  fullWidth
                >
                  Browse Ideas
                </Button>
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3"
                  fullWidth
                >
                  My Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
