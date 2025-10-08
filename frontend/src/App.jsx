import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import CreatePost from './pages/CreatePost.jsx'
import AIChat from './pages/AIChat.jsx'
import Matchings from './pages/Matchings.jsx'

function App() {

  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/create-post" element={<Layout><CreatePost /></Layout>} />
        <Route path="/ai-chat" element={<Layout><AIChat /></Layout>} />
        <Route path="/matchings" element={<Layout><Matchings /></Layout>} />
      </Routes>
  
  )}

export default App;
