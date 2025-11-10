// components/Hero.tsx
import React from 'react';
import NetworkBackground from './NetworkBackground';

const Hero: React.FC = () => {
  return (
      <NetworkBackground className="min-h-screen">
      <section className="py-20 px-4" id="home">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-secondary">Connect. Collaborate.</span>{' '}
            <span className="text-primary">Grow.</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the professional networking platform built for meaningful connections. Discover
            mentors, find partners, and elevate your career with RizqConnect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark hover:shadow-lg transition-all">
              Get Started Free
            </button>
            <button className="bg-white border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-secondary hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </NetworkBackground>
  );
};

export default Hero;
