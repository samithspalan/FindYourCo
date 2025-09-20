import React, { useState } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard,
  PlusCircle, 
  Users, 
  MessagesSquare, 
  Sun, 
  Moon, 
  Menu, 
  X 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Post', href: '/post-idea', icon: PlusCircle },
    { name: 'Matches', href: '/matches', icon: Users },
    { name: 'Chat', href: '/chat', icon: MessagesSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <h1 className="text-xl font-bold">Co-Founder Connect</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    end={item.href === '/'}
                    aria-label={item.name}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Fixed Top bar */}
        <header className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-background border-b border-border px-4 lg:px-6 z-40">
          <div className="flex h-full items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Page content (padding top to account for fixed header height) */}
        <main className="pt-20 p-4 lg:pt-20 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
