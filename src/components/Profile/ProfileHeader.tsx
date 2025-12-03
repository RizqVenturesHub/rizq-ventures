// components/ProfileHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Plus, Bell } from 'lucide-react';
import rizqventuresLogo from '../../assets/Images/rizqVenturesLogo.png';

interface ProfileHeaderProps {
  isAuthenticated?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src={rizqventuresLogo}
              alt="Rizq Ventures Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-gray-800 text-xl font-bold">Rizq ventures</span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="/#home" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="/posts" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Posts
              </a>
            </li>

            <li>
              <a href="/#jobs" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Jobs
              </a>
            </li>
            <li>
              <a href="/#about" className="text-gray-700 hover:text-primary transition-colors font-medium">
                About Us
              </a>
            </li>
            <li>
              <a href="/#mentors" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Mentors
              </a>
            </li>
          </ul>

          {/* Auth Buttons or User Actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-all">
                <Plus className="w-5 h-5 text-green-600" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all"
                onClick={() => navigate('/profile')}
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ProfileHeader;
