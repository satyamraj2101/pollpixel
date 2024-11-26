// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateVote from './pages/CreateVote';
import OngoingVotes from './pages/OngoingVotes';
import VoteResults from './pages/VoteResults';
import Profile from './pages/Profile';
import CastVote from './pages/CastVote';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-vote" element={<CreateVote />} />
          <Route path="/ongoing-votes" element={<OngoingVotes />} />
          <Route path="/vote/:id" element={<CastVote />} />
          <Route path="/vote-results" element={<VoteResults />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;