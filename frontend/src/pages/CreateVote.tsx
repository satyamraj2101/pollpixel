import React, { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CreateVote() {
  const [options, setOptions] = useState(['', '']);
  const [formData, setFormData] = useState({
    topic: '',
    question: '',
    endDate: '',
    endTime: '',
  });

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend
    console.log({ ...formData, options });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Vote</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Vote Topic"
              placeholder="E.g., Budget Allocation 2024"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
            
            <Input
              label="Question"
              placeholder="What should we prioritize in the 2024 budget?"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    label=""
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                icon={Plus}
                className="mt-2"
              >
                Add Option
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
              <Input
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" icon={Clock}>
              Create Vote
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}