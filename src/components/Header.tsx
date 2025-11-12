// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-gray-800 text-xl font-bold">Rizq ventures</span>
          </div>
          
          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            <li><a href="#home" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</a></li>
            <li><a href="#posts" className="text-gray-700 hover:text-primary transition-colors font-medium">Posts</a></li>
            <li><a href="#jobs" className="text-gray-700 hover:text-primary transition-colors font-medium">Jobs</a></li>
            <li><a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium">About Us</a></li>
            <li><a href="#mentors" className="text-gray-700 hover:text-primary transition-colors font-medium">Mentors</a></li>
          </ul>
          
          {/* Auth Buttons */}
          <div className="flex space-x-3">
            <button className="border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-all">
              Login
            </button>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
export {};