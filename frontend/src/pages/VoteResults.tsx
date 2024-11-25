import React from 'react';
import { BarChart3, Users, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

export default function VoteResults() {
  const mockResults = [
    {
      id: 1,
      topic: 'Budget Allocation 2024',
      question: 'What should we prioritize in the 2024 budget?',
      totalVotes: 245,
      endDate: '2024-03-15',
      options: [
        { name: 'Infrastructure', votes: 89 },
        { name: 'Education', votes: 76 },
        { name: 'Healthcare', votes: 45 },
        { name: 'Technology', votes: 35 },
      ],
    },
    // Add more mock results as needed
  ];

  const calculatePercentage = (votes: number, total: number) => {
    return ((votes / total) * 100).toFixed(1);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vote Results</h1>

        <div className="grid gap-8">
          {mockResults.map((result) => (
            <Card key={result.id}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{result.topic}</h2>
                <p className="text-gray-600">{result.question}</p>
              </div>

              <div className="space-y-4 mb-6">
                {result.options.map((option) => {
                  const percentage = calculatePercentage(option.votes, result.totalVotes);
                  return (
                    <div key={option.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{option.name}</span>
                        <span className="text-gray-600">
                          {option.votes} votes ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{result.totalVotes} total votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>Ended on {new Date(result.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}