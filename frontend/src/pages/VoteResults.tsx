// frontend/components/VoteResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import axios from 'axios';

export default function VoteResults() {
    const { pollId } = useParams(); // Get pollId from URL parameters
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            setError('No authentication token found');
            setLoading(false);
            return;
        }

        // Fetch results for the specific poll
        axios
            .get(`http://localhost:3000/votes/${pollId}/results`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setResults(response.data.poll);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching results');
                setLoading(false);
                console.error('Error fetching results:', error);
            });
    }, [pollId]);

    const calculatePercentage = (votes, total) => {
        if (total === 0) return 0;
        return ((votes / total) * 100).toFixed(1);
    };

    if (loading) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Loading...</h1>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-red-500">{error}</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">{results.topic}</h1>
                <div className="mb-6 text-xl">{results.question}</div>
                <div className="grid gap-8">
                    {results.options.map((option) => {
                        const percentage = calculatePercentage(option.votes, results.totalVotes);
                        return (
                            <Card key={option.name}>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">{option.name}</h2>
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
                            </Card>
                        );
                    })}
                    <div className="pt-4 border-t text-gray-600">
                        <div className="flex items-center gap-2">
                            <Users size={20} />
                            <span>{results.totalVotes} total votes</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
