// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\pages\CastVote.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vote as VoteIcon, Users, Clock, AlertCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode

import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

// Define interface for token payload
interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

// Define interface for poll
interface Poll {
  id: number;
  topic: string;
  question: string;
  options: string[];
  totalVotes: number;
  end_time: string;
}

export default function CastVote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // Destructure logout method
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Token validation function
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Invalid token", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchPoll = async () => {
      // Enhanced token validation
      if (!token || !isTokenValid()) {
        setError('Your session has expired. Please log in again.');
        logout(); // Clear invalid token
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/polls/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Specific handling for unauthorized
          setError('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch poll data');
        }

        const pollData: Poll = await response.json();

        // Check if poll is still active
        const isVotingOpen = new Date(pollData.end_time).getTime() > new Date().getTime();
        if (!isVotingOpen) {
          setError('This poll has already closed.');
          return;
        }

        setPoll(pollData);
      } catch (err: any) {
        console.error('Error fetching poll:', err.message);
        setError(err.message || 'An error occurred while fetching poll data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id, token, navigate, logout]);

  const handleSubmit = async () => {
    // Validate token before submission
    if (!token || !isTokenValid()) {
      alert('Your session has expired. Please log in again.');
      logout();
      navigate('/login');
      return;
    }

    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3000/votes/${id}/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          selected_option: selectedOption
        }),
      });

      if (response.status === 401) {
        // Specific handling for unauthorized
        alert('Session expired. Please log in again.');
        logout();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Vote casting error:', errorData);
        throw new Error(errorData.error || 'Failed to cast vote');
      }

      const result = await response.json();
      alert('Vote cast successfully!');
      navigate(`/vote-results/${id}`);
    } catch (err: any) {
      console.error('Failed to cast vote:', err);
      alert(err.message || 'An error occurred while casting your vote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeRemaining = (endTime: string) => {
    const timeDifference = new Date(endTime).getTime() - new Date().getTime();
    if (timeDifference <= 0) return 'Voting closed';
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    return days > 0 ? `${days} days remaining` : `${hours} hours remaining`;
  };

  if (loading) {
    return (
        <Layout>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading poll details...</p>
          </div>
        </Layout>
    );
  }

  if (error) {
    return (
        <Layout>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Layout>
    );
  }

  if (!poll) {
    return null;
  }

  return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cast Your Vote</h1>

          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{poll.topic}</h2>
              <p className="text-gray-600">{poll.question}</p>
            </div>

            <div className="space-y-3 mb-6">
              {poll.options.map((option: string) => (
                  <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                          selectedOption === option
                              ? 'bg-blue-50 border-2 border-blue-500'
                              : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                          className={`w-4 h-4 rounded-full border-2 ${
                              selectedOption === option
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-400'
                          }`}
                      />
                      {option}
                    </div>
                  </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{poll.totalVotes || 0} votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{formatTimeRemaining(poll.end_time)}</span>
                </div>
              </div>
              <Button
                  onClick={handleSubmit}
                  disabled={!selectedOption || isSubmitting}
                  isLoading={isSubmitting}
                  icon={VoteIcon}
              >
                Submit Vote
              </Button>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-yellow-500 shrink-0" size={20} />
              <p className="text-sm text-yellow-700">
                Your vote is final and cannot be changed. Please review your selection carefully before submitting.
              </p>
            </div>
          </Card>
        </div>
      </Layout>
  );
}