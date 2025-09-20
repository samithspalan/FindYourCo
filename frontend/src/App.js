import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PostIdea from './pages/PostIdea';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
