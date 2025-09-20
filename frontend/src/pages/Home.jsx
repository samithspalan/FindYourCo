import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { MessageCircle, Repeat2, Heart, Share2, Image as ImageIcon, Hash, Plus, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('for-you');

  const posts = useMemo(
    () => [
      {
        id: 1,
        author: { name: 'Sarah Chen', handle: '@sarah_chen', avatar: 'SC' },
        time: '2h',
        content:
          'Building an AI-powered task manager that prioritizes your day automatically based on impact and deadlines. Looking for a business co-founder experienced in B2B SaaS.',
        tags: ['AI', 'Productivity', 'B2B', 'SaaS'],
        stats: { comments: 12, reposts: 8, likes: 64, shares: 3 },
      },
      {
        id: 2,
        author: { name: 'Marcus Johnson', handle: '@marcus_markets', avatar: 'MJ' },
        time: '5h',
        content:
          'Exploring a FinTech idea: micro-investments for Gen Z with round-up spare change and AI-driven portfolios. Need a technical co-founder with Node + React.',
        tags: ['FinTech', 'Investing', 'React', 'Node'],
        stats: { comments: 9, reposts: 5, likes: 41, shares: 2 },
      },
      {
        id: 3,
        author: { name: 'Elena Rodriguez', handle: '@elena_ai', avatar: 'ER' },
        time: '1d',
        content:
          'Healthcare NLP startup — extracting insights from clinical notes to reduce admin time by 40%. Looking for a business co-founder with healthcare ops experience.',
        tags: ['Healthcare', 'NLP', 'Startup'],
        stats: { comments: 22, reposts: 11, likes: 120, shares: 7 },
      },
    ],
    []
  );

  const trending = [
    { tag: 'AI', count: '12.3K' },
    { tag: 'FinTech', count: '8.1K' },
    { tag: 'SaaS', count: '6.7K' },
    { tag: 'Healthcare', count: '5.4K' },
    { tag: 'Web3', count: '4.2K' },
  ];

  const suggestions = [
    { name: 'David Kim', handle: '@david_ui', avatar: 'DK', bio: 'Mobile dev & designer' },
    { name: 'Elena Rodriguez', handle: '@elena_ai', avatar: 'ER', bio: 'AI/ML Engineer' },
    { name: 'Lisa Park', handle: '@lisa_ops', avatar: 'LP', bio: 'Ops & Finance' },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient animated background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl opacity-30" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with tabs */}
        <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/60 border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center">
            <h1 className="text-xl font-bold text-foreground">Home</h1>
          </div>
          <LayoutGroup>
            <div className="flex items-center gap-4">
              {[
                { key: 'for-you', label: 'For you' },
                { key: 'following', label: 'Following' },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`relative py-3 text-sm font-medium transition-colors ${
                    activeTab === t.key
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                  {activeTab === t.key && (
                    <motion.span layoutId="tab-underline" className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Composer */}
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center">
                    YO
                  </div>
                  <div className="flex-1">
                    <div
                      className="w-full rounded-lg bg-muted px-4 py-3 text-muted-foreground cursor-text"
                      onClick={() => navigate('/post-idea')}
                    >
                      Share what you're building...
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Button type="button" variant="ghost" size="sm" className="px-2">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="px-2">
                          <Hash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button size="sm" onClick={() => navigate('/post-idea')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
                      <CardContent className="pt-5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center">
                            {post.author.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground truncate">{post.author.name}</p>
                              <span className="text-muted-foreground truncate">{post.author.handle} · {post.time}</span>
                            </div>
                            <p className="mt-1 text-foreground whitespace-pre-line">{post.content}</p>
                            {post.tags?.length ? (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {post.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                            <div className="mt-3 grid grid-cols-4 text-sm text-muted-foreground">
                              {[
                                { icon: MessageCircle, value: post.stats.comments },
                                { icon: Repeat2, value: post.stats.reposts },
                                { icon: Heart, value: post.stats.likes },
                                { icon: Share2, value: post.stats.shares },
                              ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                  <motion.button
                                    key={i}
                                    whileTap={{ scale: 0.95 }}
                                    className="group inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
                                  >
                                    <Icon className="h-4 w-4 group-hover:text-foreground" />
                                    <span>{item.value}</span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Trending</CardTitle>
                <CardDescription className="text-muted-foreground">Popular topics among co-founders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {trending.map((t) => (
                  <div key={t.tag} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">#{t.tag}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.count} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Who to follow</CardTitle>
                <CardDescription className="text-muted-foreground">People you may find interesting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((s) => (
                  <div key={s.handle} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold flex items-center justify-center">
                        {s.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.handle} · {s.bio}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="py-10 text-center text-xs text-muted-foreground">
          <p>Mock feed for demo. Connect real backend later.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
