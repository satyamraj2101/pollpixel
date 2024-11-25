import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vote as VoteIcon, Users, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

export default function CastVote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock vote data
  const mockVote = {
    id: 1,
    topic: 'Budget Allocation 2024',
    question: 'What should we prioritize in the 2024 budget?',
    totalVotes: 145,
    endTime: '2024-03-20T18:00:00',
    options: ['Infrastructure', 'Education', 'Healthcare', 'Technology'],
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);
    try {
      // TODO: Integrate with backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/vote-results');
    } catch (error) {
      console.error('Failed to cast vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cast Your Vote</h1>

        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{mockVote.topic}</h2>
            <p className="text-gray-600">{mockVote.question}</p>
          </div>

          <div className="space-y-3 mb-6">
            {mockVote.options.map((option) => (
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
                <span>{mockVote.totalVotes} votes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>Ends in 2 days</span>
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