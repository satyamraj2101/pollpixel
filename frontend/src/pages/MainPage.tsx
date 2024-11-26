// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\pages\MainPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, UserCircle2, Github, Linkedin, Mail } from 'lucide-react';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-8">
            <Vote size={64} className="text-white" />
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Poll Pixel
          </h1>
          
          <p className="text-xl mb-12 text-blue-100">
            Cast your vote securely with cutting-edge face recognition technology.
            Your voice matters, your identity is protected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link
              to="/signup"
              className="group relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 transition-all duration-300 hover:bg-opacity-20 hover:transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              <UserCircle2 size={32} className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
              <p className="text-blue-100">
                Create your account with secure face authentication
              </p>
            </Link>

            <Link
              to="/login"
              className="group relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 transition-all duration-300 hover:bg-opacity-20 hover:transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              <Vote size={32} className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Login</h2>
              <p className="text-blue-100">
                Access your account using face verification
              </p>
            </Link>
          </div>

          <div className="mt-16">
            <p className="text-sm text-blue-100">
              Powered by AWS Rekognition • Secure • Private • Reliable
            </p>
          </div>
        </div>
      </div>
      
      {/* Developer Footer */}
      <footer className="bg-white bg-opacity-10 backdrop-blur-lg text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="font-bold text-lg mb-1">Satyam Raj</h3>
              <p className="text-blue-100">Full Stack Developer</p>
              <p className="text-blue-100">Bhubaneshwar, India</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:satyamraj620@gmail.com"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Contact</p>
              <p className="text-blue-100">+91 8340489427</p>
              <p className="text-blue-100">satyamraj620@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}