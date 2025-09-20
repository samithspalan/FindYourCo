import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PostIdea from './pages/PostIdea';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Root shows marketing Landing page */}
            <Route index element={<LandingPage />} />
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Home Feed */}
            <Route path="/home" element={<Home />} />
            {/* Other sections */}
            <Route path="/post-idea" element={<PostIdea />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
