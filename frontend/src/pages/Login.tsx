import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Camera as CameraIcon } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Camera from '../components/Camera';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showCamera, setShowCamera] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowCamera(true);
  };

  const handleCapture = async (image: string) => {
    try {
      // TODO: Integrate with backend
      login({ token: 'dummy-token', user: { email: formData.email } });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        
        {!showCamera ? (
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full mt-6" icon={LogIn}>
              Continue to Face Verification
            </Button>
          </form>
        ) : (
          <div>
            <p className="text-center mb-4 text-gray-600">
              Look directly at the camera for face verification
            </p>
            <Camera onCapture={handleCapture} />
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowCamera(false)}
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}