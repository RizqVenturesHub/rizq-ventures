// components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative min-h-[600px] bg-gradient-to-br from-primary-light via-primary-light1 to-primary-light2 py-20 px-4 overflow-hidden" 
      id="home"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, rgba(196, 233, 201, 0.5) 0%, rgba(136, 211, 146, 0.7) 100%)
        `
      }}
    >
      {/* Network Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="white" />
              <circle cx="80" cy="60" r="3" fill="white" />
              <line x1="20" y1="20" x2="80" y2="60" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-secondary">Connect. Collaborate.</span>{' '}
          <span className="text-primary">Grow.</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Join the professional networking platform built for meaningful connections. Discover mentors, find partners, and elevate your career with RizqConnect.
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
  );
};

export default Hero;
