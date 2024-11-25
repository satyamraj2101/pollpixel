import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Camera as CameraIcon } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Camera from '../components/Camera';

export default function Signup() {
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowCamera(true);
  };

  const handleCapture = async (image: string) => {
    try {
      // TODO: Integrate with backend
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        
        {!showCamera ? (
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" className="w-full mt-6" icon={UserPlus}>
              Continue to Face Registration
            </Button>
          </form>
        ) : (
          <div>
            <p className="text-center mb-4 text-gray-600">
              Look directly at the camera to register your face
            </p>
            <Camera onCapture={handleCapture} />
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowCamera(false)}
            >
              Back to Signup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}