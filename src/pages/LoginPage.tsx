// pages/LoginPage.tsx
import React from 'react';
import NetworkBackground from '../components/NetworkBackground';

const LoginPage: React.FC = () => {
  return (
    <NetworkBackground className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-secondary">Login</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/forgot-password" className="text-primary hover:underline">
            Forget your password? Click here!
          </a>
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-primary font-semibold hover:underline">
            Sign UP
          </a>
        </div>
      </div>
    </NetworkBackground>
  );
};

export default LoginPage;
