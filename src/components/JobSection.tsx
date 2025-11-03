// components/JobSection.tsx
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { Job } from '../data/types';
import { jobsAPI } from '../services/api';

const JobSection: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await jobsAPI.getJobs();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-primary-light via-white to-primary-light" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-primary-light via-white to-primary-light" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary-light via-white to-primary-light" id="jobs">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-secondary">
          Job posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
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
