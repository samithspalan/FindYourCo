import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Star, 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock co-founder data
  const coFounders = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Full Stack Developer & Product Manager',
      location: 'San Francisco, CA',
      avatar: 'SC',
      skills: ['React', 'Node.js', 'Product Management', 'UI/UX Design'],
      experience: '5+ years',
      bio: 'Experienced full-stack developer with a passion for creating user-centric products. Previously led development at two successful startups.',
      githubUrl: 'https://github.com/sarahchen',
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      rating: 4.9,
      projects: 12,
      lookingFor: 'Technical co-founder for B2B SaaS',
      availability: 'Full-time'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      title: 'Marketing & Sales Expert',
      location: 'New York, NY',
      avatar: 'MJ',
      skills: ['Digital Marketing', 'Sales', 'Business Development', 'Analytics'],
      experience: '7+ years',
      bio: 'Marketing strategist who has helped scale 3 startups from 0 to $1M+ ARR. Expert in growth hacking and customer acquisition.',
      githubUrl: null,
      linkedinUrl: 'https://linkedin.com/in/marcusjohnson',
      rating: 4.8,
      projects: 8,
      lookingFor: 'Technical co-founder for FinTech startup',
      availability: 'Part-time'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      title: 'AI/ML Engineer',
      location: 'Austin, TX',
      avatar: 'ER',
      skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
      experience: '4+ years',
      bio: 'AI researcher turned entrepreneur. PhD in Computer Science with expertise in natural language processing and computer vision.',
      githubUrl: 'https://github.com/elenarodriguez',
      linkedinUrl: 'https://linkedin.com/in/elenarodriguez',
      rating: 4.9,
      projects: 6,
      lookingFor: 'Business co-founder for AI startup',
      availability: 'Full-time'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Mobile Developer & Designer',
      location: 'Seattle, WA',
      avatar: 'DK',
      skills: ['React Native', 'iOS', 'Android', 'UI/UX Design'],
      experience: '6+ years',
      bio: 'Mobile-first developer with a keen eye for design. Built and launched 5 mobile apps with 100K+ downloads.',
      githubUrl: 'https://github.com/davidkim',
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      rating: 4.7,
      projects: 15,
      lookingFor: 'Business co-founder for mobile app',
      availability: 'Full-time'
    },
    {
      id: 5,
      name: 'Lisa Park',
      title: 'Operations & Finance Expert',
      location: 'Chicago, IL',
      avatar: 'LP',
      skills: ['Operations', 'Finance', 'Strategy', 'Legal'],
      experience: '8+ years',
      bio: 'Former McKinsey consultant with experience in startup operations and fundraising. Helped raise $50M+ across multiple ventures.',
      githubUrl: null,
      linkedinUrl: 'https://linkedin.com/in/lisapark',
      rating: 4.8,
      projects: 4,
      lookingFor: 'Technical co-founder for HealthTech',
      availability: 'Part-time'
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      title: 'Blockchain Developer',
      location: 'Remote',
      avatar: 'AH',
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
      experience: '3+ years',
      bio: 'Blockchain enthusiast and smart contract developer. Built DeFi protocols with $10M+ TVL.',
      githubUrl: 'https://github.com/ahmedhassan',
      linkedinUrl: 'https://linkedin.com/in/ahmedhassan',
      rating: 4.6,
      projects: 9,
      lookingFor: 'Business co-founder for DeFi project',
      availability: 'Full-time'
    }
  ];

  const filters = ['all', 'technical', 'business', 'design', 'marketing'];

  const filteredCoFounders = coFounders.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         person.skills.some(skill => {
                           switch(selectedFilter) {
                             case 'technical':
                               return ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Solidity', 'iOS', 'Android'].includes(skill);
                             case 'business':
                               return ['Sales', 'Business Development', 'Operations', 'Finance', 'Strategy'].includes(skill);
                             case 'design':
                               return skill.includes('Design');
                             case 'marketing':
                               return ['Marketing', 'Digital Marketing', 'Analytics'].includes(skill);
                             default:
                               return true;
                           }
                         });
    
    return matchesSearch && matchesFilter;
  });

  const handleConnect = (person) => {
    // Mock connect action
    alert(`Connection request sent to ${person.name}! 🚀`);
  };

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
      className="relative space-y-6 overflow-hidden"
    >
      {/* Subtle animated background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent blur-3xl opacity-30" />
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Match</h1>
        <p className="text-muted-foreground">Discover potential co-founders who complement your skills and vision.</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Count */}
      <motion.div variants={itemVariants}>
        <p className="text-sm text-muted-foreground">
          {filteredCoFounders.length} co-founder{filteredCoFounders.length !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      {/* Co-founder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoFounders.map((person) => (
          <motion.div
            key={person.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                {/* Avatar and Basic Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {person.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">{person.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{person.title}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{person.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {person.location}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {person.bio}
                </p>
                
                {/* Skills */}
                <div>
                  <p className="text-sm font-medium mb-2 text-foreground">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {person.skills.length > 4 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                        +{person.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{person.experience} experience</span>
                  <span>{person.projects} projects</span>
                </div>

                {/* Looking For */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Looking for:</p>
                  <p className="text-sm text-foreground">{person.lookingFor}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleConnect(person)}
                    className="flex-1"
                    size="sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  
                  <div className="flex gap-1">
                    {person.githubUrl && (
                      <Button asChild variant="outline" size="sm" className="p-2">
                        <a href={person.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    
                    <Button asChild variant="outline" size="sm" className="p-2">
                      <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="p-2">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCoFounders.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-foreground">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find more co-founders.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Matches;
