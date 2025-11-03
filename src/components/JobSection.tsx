// components/JobSection.tsx
import React from 'react';
import JobCard from './JobCard';

const JobSection: React.FC = () => {
  const jobs = [
    {
      title: 'software engineering',
      description: "Tailor Anima's Landing Page UI Kit to your unique style and brand with customizable components. No time!",
      icon: '⚡',
      iconBg: 'bg-red-100'
    },
    {
      title: 'Full-stack developer',
      description: "No need to worry about screen size. Anima's Landing Page UI Kit adapts to any screen size, from desktop to mobile.",
      icon: '🔗',
      iconBg: 'bg-blue-100'
    },
    {
      title: '.net developer',
      description: "Zero coding skills required. Anima's Landing Page UI Kit empowers you to create stunning landing pages with ease.",
      icon: '👋',
      iconBg: 'bg-yellow-100'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary-light via-white to-primary-light" id="jobs">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-secondary">
          Job posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              description={job.description}
              icon={job.icon}
              iconBg={job.iconBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSection;
