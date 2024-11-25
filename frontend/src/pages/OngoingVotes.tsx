import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, Clock, Users, Share2 } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function OngoingVotes() {
  const navigate = useNavigate();

  const mockVotes = [
    {
      id: 1,
      topic: 'Budget Allocation 2024',
      question: 'What should we prioritize in the 2024 budget?',
      totalVotes: 145,
      endTime: '2024-03-20T18:00:00',
      options: ['Infrastructure', 'Education', 'Healthcare', 'Technology'],
    },
    // Add more mock votes as needed
  ];

  const handleShare = (id: number) => {
    // TODO: Implement share functionality
    const url = `${window.location.origin}/vote/${id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ongoing Votes</h1>

        <div className="grid gap-6">
          {mockVotes.map((vote) => (
            <Card key={vote.id} className="transform transition-all hover:scale-[1.01]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{vote.topic}</h2>
                  <p className="text-gray-600 mb-4">{vote.question}</p>
                </div>
                <Button
                  variant="outline"
                  icon={Share2}
                  onClick={() => handleShare(vote.id)}
                >
                  Share
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {vote.options.map((option, index) => (
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
                    <span>{vote.totalVotes} votes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={20} />
                    <span>Ends in 2 days</span>
                  </div>
                </div>
                <Button onClick={() => navigate(`/vote/${vote.id}`)}>
                  Cast Vote
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}