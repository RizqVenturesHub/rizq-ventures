// components/JobSection.tsx - Updated
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
      <section className="py-20 px-4 bg-gray-50" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gray-50" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50" id="jobs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            Latest Job Openings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exciting career opportunities from top companies. Find your next role today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              jobType={job.jobType}
              experienceLevel={job.experienceLevel}
              description={job.description}
              companyLogo={job.companyLogo}
              postedDate={job.postedDate}
              salary={job.salary}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSection;
