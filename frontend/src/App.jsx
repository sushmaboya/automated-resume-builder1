import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import './App.css'; // Keep the global styles if any

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/build" element={<ResumeBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
