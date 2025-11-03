// components/MentorSection.tsx
import React from 'react';
import MentorCard from './MentorCard';

const MentorSection: React.FC = () => {
  const mentors = [
    {
      name: 'Aman Shaikh',
      role: 'UX Designer',
      company: 'BBello',
      description: 'Sharing actionable advice for creative breakthroughs in UI/UX and helping new designers build real-world skills.',
      image: '/mentors/aman.jpg'
    },
    {
      name: 'Naiem Shaikh',
      role: 'Creative Director',
      company: 'Rko',
      description: 'Guiding professionals through career transitions and supporting them on tech journeys for a confident future.',
      image: '/mentors/naiem.jpg'
    },
    {
      name: 'Arman',
      role: 'UI Designer',
      company: 'BBob',
      description: 'Empowering members to connect, learn, and grow through collaborative design solutions and practical resources.',
      image: '/mentors/arman.jpg'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-primary-light to-white" id="mentors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">
          Our Mentors
        </h2>
        <p className="text-center text-gray-600 mb-16">
          See how our funding page ui kit is making an impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorCard
              key={index}
              name={mentor.name}
              role={mentor.role}
              company={mentor.company}
              description={mentor.description}
              image={mentor.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
