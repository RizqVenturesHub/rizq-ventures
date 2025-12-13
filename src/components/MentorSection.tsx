// components/MentorSection.tsx
import React, { useEffect, useState } from 'react';
import MentorCard from './MentorCard';
import { Mentor } from '../data/types';
import { mentorEndpoints } from '../services/endpoints';

const MentorSection: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await mentorEndpoints.getMentors();
        setMentors(data);
        setError(null);
      } catch (err) {
        setError('Failed to load mentors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-white via-primary-light to-white" id="mentors">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading mentors...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-white via-primary-light to-white" id="mentors">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

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
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
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
