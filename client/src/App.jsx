import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import Sports from './pages/Sports';
import VideoHomePage from './pages/VideoHomePage';
import VideoPlayer from './pages/VideoPlayer';
import News from './pages/News';

function App() {

  return (

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/news" element={<News/>} />
      <Route path="/sports" element={<Sports/>} />
      <Route path="/education-video" element={<VideoHomePage/>} />
      <Route path="/education-video/watch/:id" element={<VideoPlayer/>} />
    </Routes>
  )
}

export default App
