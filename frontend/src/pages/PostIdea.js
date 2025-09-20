import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Plus, X, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

const PostIdea = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: []
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust',
    'UI/UX Design', 'Product Management', 'Marketing', 'Sales', 'Data Science',
    'Machine Learning', 'DevOps', 'Mobile Development', 'Blockchain'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      requiredSkills: []
    });
    setSkillInput('');
    setIsSubmitting(false);
    
    // Show success message (you could add a toast notification here)
    alert('Idea posted successfully! 🚀');
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
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Post Your Idea</h1>
        <p className="text-muted-foreground">Share your startup idea and find the perfect co-founder to bring it to life.</p>
      </motion.div>

      {/* Main Form */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
              Project Details
            </CardTitle>
            <CardDescription>
              Describe your idea in detail to attract the right co-founder match.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-foreground">
                  Project Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., AI-Powered Task Management App"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="text-lg"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-foreground">
                  Project Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your idea, target market, unique value proposition, and any existing progress..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <label htmlFor="skills" className="text-sm font-medium text-foreground">
                  Required Skills
                </label>
                
                {/* Skill Input */}
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="Add a skill (e.g., React, UI/UX Design)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillKeyPress}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addSkill(skillInput.trim())}
                    disabled={!skillInput.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Selected Skills */}
                {formData.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                    {formData.requiredSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-primary-foreground"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-primary-foreground/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Predefined Skills */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Popular Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedSkills
                      .filter(skill => !formData.requiredSkills.includes(skill))
                      .slice(0, 8)
                      .map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSkill(skill)}
                        className="text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !formData.title || !formData.description}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Idea
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tips for a Great Post</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Be clear and specific about your idea and what you're looking for in a co-founder
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Include your target market, business model, and any traction you've gained
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                List both technical and non-technical skills you need in a co-founder
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Be honest about the current stage and what commitment level you expect
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PostIdea;
