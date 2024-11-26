// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\pages\CreateVote.tsx
import React, { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function CreateVote() {
  const { token } = useAuth(); // Use token from context
  const [options, setOptions] = useState<string[]>(['', '']);
  const [formData, setFormData] = useState({
    topic: '',
    question: '',
    endDate: '',
    endTime: '',
  });

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure valid options
    const validOptions = options.filter((option) => option.trim() !== '');
    if (validOptions.length < 2) {
      alert('At least two options are required.');
      return;
    }

    // Ensure valid end date and time
    const { endDate, endTime } = formData;
    const endDateTimeString = `${endDate}T${endTime}:00`;
    const end_time = new Date(endDateTimeString);
    if (isNaN(end_time.getTime())) {
      alert('Invalid date or time format.');
      return;
    }

    // Prepare payload
    const payload = {
      ...formData,
      options: validOptions,
    };

    try {
      const response = await fetch('http://localhost:3000/polls/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Poll created successfully!');
        console.log('Created Poll:', data.poll);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create poll');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error creating poll');
    }
  };



  return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Vote</h1>
          <Card>
            <form onSubmit={handleSubmit}>
              <Input
                  label="Vote Topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  required
              />
              <Input
                  label="Question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
              />
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Options</label>
                {options.map((option, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          required
                      />
                      {options.length > 2 && (
                          <button onClick={() => removeOption(index)} type="button" className="text-red-500">
                            <Trash2 size={20} />
                          </button>
                      )}
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addOption} icon={Plus}>
                  Add Option
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <Button type="submit" icon={Clock}>
                Create Vote
              </Button>
            </form>
          </Card>
        </div>
      </Layout>
  );
}
