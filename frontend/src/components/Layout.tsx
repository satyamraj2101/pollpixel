// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\components\Layout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Vote, 
  BarChart3, 
  UserCircle, 
  LogOut,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'Create Vote', path: '/create-vote' },
    { icon: Vote, label: 'Ongoing Votes', path: '/ongoing-votes' },
    { icon: BarChart3, label: 'Vote Results', path: '/vote-results' },
    { icon: UserCircle, label: 'My Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <Vote className="text-blue-500" size={32} />
            <span className="font-bold text-xl">Poll Pixel</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors"
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
        
        {/* Developer Footer */}
        <footer className="bg-white border-t p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Satyam Raj</h3>
                <p className="text-gray-600">Full Stack Developer</p>
                <p className="text-gray-600">Bhubaneshwar, India</p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:satyamraj620@gmail.com"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Contact</p>
                <p className="text-gray-600">+91 8340489427</p>
                <p className="text-gray-600">satyamraj620@gmail.com</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}