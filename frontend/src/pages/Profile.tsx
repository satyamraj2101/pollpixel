import React from 'react';
import { Share2, Calendar, Vote, User } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const mockCreatedVotes = [
    {
      id: 1,
      topic: 'Budget Allocation 2024',
      endTime: '2024-03-20T18:00:00',
      totalVotes: 145,
      isActive: true,
    },
    {
      id: 2,
      topic: 'Office Location Change',
      endTime: '2024-03-15T18:00:00',
      totalVotes: 89,
      isActive: false,
    },
  ];

  const handleShare = (id: number) => {
    const url = `${window.location.origin}/vote/${id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="outline" icon={User}>Edit Profile</Button>
        </div>

        <div className="grid gap-8">
          <Card>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={40} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">{user?.name || 'John Doe'}</h2>
                <p className="text-gray-600">{user?.email || 'john@example.com'}</p>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-4">My Created Votes</h2>
            <div className="grid gap-4">
              {mockCreatedVotes.map((vote) => (
                <Card key={vote.id} className="transform transition-all hover:scale-[1.01]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">{vote.topic}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Vote size={16} />
                          <span>{vote.totalVotes} votes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>
                            {vote.isActive ? 'Ends' : 'Ended'} on{' '}
                            {new Date(vote.endTime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        icon={Share2}
                        onClick={() => handleShare(vote.id)}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}