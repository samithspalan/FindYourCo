import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './components/HomePage.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import CreatePost from './pages/CreatePost.jsx'
import AIChat from './pages/AIChat.jsx'
import Matchings from './pages/Matchings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/create-post" element={<Layout><CreatePost /></Layout>} />
        <Route path="/ai-chat" element={<Layout><AIChat /></Layout>} />
        <Route path="/matchings" element={<Layout><Matchings /></Layout>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
