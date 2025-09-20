import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'Sarah Chen', content: 'Hey! I saw your project idea about the AI-powered task management app. Really interesting concept!', timestamp: '10:30 AM', isOwn: false },
      { id: 2, sender: 'You', content: 'Thanks Sarah! I\'ve been thinking about this for a while. The current task management tools lack intelligent prioritization.', timestamp: '10:32 AM', isOwn: true },
      { id: 3, sender: 'Sarah Chen', content: 'Exactly! I have experience building ML models for productivity apps. Would love to discuss potential collaboration.', timestamp: '10:35 AM', isOwn: false },
      { id: 4, sender: 'You', content: 'That sounds perfect! I was actually looking for someone with ML expertise. What kind of models have you worked with?', timestamp: '10:37 AM', isOwn: true },
      { id: 5, sender: 'Sarah Chen', content: 'I\'ve built recommendation systems and NLP models for content analysis. Also worked on time-series forecasting for resource planning.', timestamp: '10:40 AM', isOwn: false },
      { id: 6, sender: 'You', content: 'Impressive! The time-series forecasting could be really useful for deadline prediction. Are you available for a call this week?', timestamp: '10:42 AM', isOwn: true },
      { id: 7, sender: 'Sarah Chen', content: 'Absolutely! I\'m free Thursday afternoon or Friday morning. Which works better for you?', timestamp: '10:45 AM', isOwn: false }
    ],
    2: [
      { id: 1, sender: 'Marcus Johnson', content: 'Hi there! I came across your fintech idea and I\'m really excited about the market opportunity.', timestamp: '2:15 PM', isOwn: false },
      { id: 2, sender: 'You', content: 'Hi Marcus! Great to meet you. I see you have extensive marketing experience. That\'s exactly what I need for this project.', timestamp: '2:18 PM', isOwn: true },
      { id: 3, sender: 'Marcus Johnson', content: 'I\'ve helped scale 3 fintech startups in the past 5 years. Happy to share some insights and discuss how we could work together.', timestamp: '2:20 PM', isOwn: false }
    ]
  });

  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      lastMessage: 'Absolutely! I\'m free Thursday afternoon...',
      timestamp: '10:45 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      avatar: 'MJ',
      lastMessage: 'Happy to share some insights and discuss...',
      timestamp: '2:20 PM',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      avatar: 'ER',
      lastMessage: 'The AI model architecture looks promising...',
      timestamp: 'Yesterday',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'DK',
      lastMessage: 'I can start working on the mobile mockups...',
      timestamp: 'Monday',
      unread: 0,
      online: false
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setMessage('');

    // Simulate typing and response after 1.6s
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "That's a great point! Let me think about that.",
        "I agree! When would be a good time to discuss this further?",
        "Interesting approach. Have you considered the scalability aspects?",
        "I can help with that. Let me check my schedule.",
        "That makes sense. What's the next step?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const selectedConversation = conversations.find(c => c.id === selectedChat);

      const responseMessage = {
        id: Date.now() + 1,
        sender: selectedConversation.name,
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), responseMessage]
      }));
      setIsTyping(false);
    }, 1600);
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  return (
    <div className="relative h-[calc(100vh-8rem)] bg-background rounded-lg border border-border overflow-hidden">
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

      <div className="h-full flex">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border flex flex-col bg-card/60 backdrop-blur-sm">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 cursor-pointer border-b border-border/50 ${
                  selectedChat === conversation.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-medium">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background/60 backdrop-blur-sm">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedConversation.avatar}
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {currentMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            msg.isOwn
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-muted-foreground mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-xs lg:max-w-md order-1">
                        <div className="px-4 py-2 rounded-lg bg-muted text-foreground inline-flex items-center gap-1">
                          {[0,1,2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">typing...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-top border-border bg-card/60 backdrop-blur-sm border-t">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  
                  <div className="flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-0 bg-muted focus-visible:ring-1"
                    />
                  </div>
                  
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button type="button" variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button type="submit" size="icon" disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">Choose a conversation from the sidebar to start chatting.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
