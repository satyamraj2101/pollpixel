import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, Clock, Users, Share2 } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function OngoingVotes() {
  const navigate = useNavigate();
  const { token } = useAuth(); // Use token from AuthContext
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      if (!token) {
        setError('You are not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/polls/ongoing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching polls:', err);
        setError(err.response?.data?.message || 'Failed to fetch polls');
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [token]);

  const handleShare = async (pollId: number) => {
    const url = `${window.location.origin}/vote/${pollId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Vote Now', url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Vote link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing the poll:', error);
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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">Loading ongoing polls...</p>
          </div>
        </Layout>
    );
  }

  if (error) {
    return (
        <Layout>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Layout>
    );
  }

  return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Ongoing Votes</h1>

          {polls.length === 0 ? (
              <p className="text-gray-600">No ongoing polls at the moment.</p>
          ) : (
              <div className="grid gap-6">
                {polls.map((poll) => (
                    <Card key={poll.id} className="transform transition-all hover:scale-[1.01]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">{poll.topic}</h2>
                          <p className="text-gray-600 mb-4">{poll.question}</p>
                        </div>
                        <Button variant="outline" icon={Share2} onClick={() => handleShare(poll.id)}>
                          Share
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {poll.options.map((option: string, index: number) => (
                            <div
                                key={index}
                                className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              {option}
                            </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users size={20} />
                            <span>{poll.totalVotes || 0} votes</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={20} />
                            <span>{formatTimeRemaining(poll.end_time)}</span>
                          </div>
                        </div>
                        <Button onClick={() => navigate(`/vote/${poll.id}`)}>Cast Vote</Button>
                      </div>
                    </Card>
                ))}
              </div>
          )}
        </div>
      </Layout>
  );
}
