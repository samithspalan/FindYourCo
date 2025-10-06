import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/Layout.jsx';
import ParticleBackground from '../components/ParticleBackground.jsx';

const AIChat = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickPrompts = [
    {
      icon: <Lightbulb className="w-4 h-4" />,
      text: "Help me refine my startup idea and identify key market opportunities"
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "What qualities should I look for in a co-founder for my tech startup?"
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: "Create a go-to-market strategy for my SaaS product"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "Help me validate my business model and find potential customers"
    }
  ];



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    // Hide welcome screen on first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message) => {
    // Enhanced AI response simulation
    const responses = [
      "Great question! Here's my analysis of your startup challenge:\n\n**1. Market Opportunity**: First, let's validate the problem you're solving. Are you addressing a real pain point that people are willing to pay for?\n\n**2. Competitive Landscape**: Research who else is in this space. What makes your approach unique?\n\n**3. Execution Strategy**: Focus on building an MVP that tests your core hypothesis with real users.",
      
      "Based on successful startup patterns, I recommend focusing on:\n\n• **Customer Discovery**: Start with 10-15 customer interviews to validate assumptions\n• **MVP Development**: Build the smallest viable version that delivers core value\n• **Metrics Setup**: Track key performance indicators from day one\n\nWould you like me to dive deeper into any of these areas?",
      
      "Let me break this down strategically:\n\n**Short-term (0-3 months):**\n- Validate core assumptions through customer interviews\n- Build and test initial prototype\n- Define your value proposition clearly\n\n**Medium-term (3-6 months):**\n- Launch beta version to early adopters\n- Gather user feedback and iterate\n- Start building traction metrics\n\n**Long-term (6+ months):**\n- Scale based on learnings\n- Consider fundraising if needed\n\nWhat's your current stage in this journey?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickPrompt = (promptText) => {
    setCurrentMessage(promptText);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
    
      <ParticleBackground />
  
      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full px-4" style={{ zIndex: 10 }}>
        
        <div className="flex-1 overflow-y-auto py-8">
          
          {showWelcome && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className={`text-4xl font-bold ${theme.text} mb-4`}>
                  AI Co-Founder Assistant
                </h1>
                <p className={`text-xl ${theme.textSecondary} max-w-2xl mx-auto`}>
                  Get expert guidance for your startup journey. I can help with idea validation, 
                  co-founder matching, business strategy, and growth planning.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl"
              >
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group p-4 rounded-xl ${theme.cardBg} backdrop-blur-xl ${theme.border} border ${theme.hover} transition-all text-left shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 group-hover:text-purple-500 transition-colors">
                        {prompt.icon}
                      </div>
                      <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
                        {prompt.text}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {!showWelcome && (
            <div className="space-y-6 pb-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-gradient-to-r from-green-500 to-teal-600'
                      }`}>
                        {message.type === 'user' ? (
                          <span className="text-white font-bold text-sm">YO</span>
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      
                      <div className={`${theme.cardBg} backdrop-blur-xl ${theme.border} border rounded-2xl p-4 shadow-lg`}>
                        <div className={`${theme.text} leading-relaxed whitespace-pre-wrap`}>
                          {message.content}
                        </div>
                        <span className={`text-xs ${theme.textMuted} mt-2 block`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3 max-w-2xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className={`${theme.cardBg} backdrop-blur-xl ${theme.border} border rounded-2xl p-4`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 p-4">
          <div className="max-w-3xl mx-auto">
            <div className={`relative ${theme.cardBg} backdrop-blur-xl ${theme.border} border rounded-3xl shadow-2xl overflow-hidden`}>
              <textarea
                ref={inputRef}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI Assistant..."
                className={`w-full bg-transparent ${theme.text} placeholder-gray-400 p-4 pr-12 focus:outline-none resize-none min-h-[60px] max-h-[200px] text-base`}
                rows={1}
                style={{ 
                  height: 'auto',
                  minHeight: '60px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                }}
              />
              
            
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                  currentMessage.trim() 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className={`text-xs ${theme.textMuted} text-center mt-3`}>
              AI Assistant can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;