// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\pages\Dashboard.tsx
import React from 'react';
import { Clock, Users, Vote } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

function Dashboard() {
  const stats = [
    { icon: Vote, label: 'Total Votes Cast', value: '1,234' },
    { icon: Users, label: 'Active Polls', value: '12' },
    { icon: Clock, label: 'Completed Polls', value: '45' },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <stat.icon className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Vote className="text-blue-500" size={20} />
                <div>
                  <p className="font-medium">New vote cast on "Budget Proposal 2024"</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Upcoming Polls</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Community Guidelines Update</p>
                  <p className="text-sm text-gray-600">Ends in 2 days</p>
                </div>
                <Button variant="outline">Vote Now</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Dashboard;