import React from 'react';
import { useQuery } from '@tanstack/react-query';
import JobCard from './JobCard';
import { Job } from '../data/types';
import { jobEndpoints } from '../services/endpoints';

const JobSection: React.FC = () => {
  // ✅ Fixed: Proper query configuration
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['jobs'], // Simplified key
    queryFn: async () => {
      const resp = await jobEndpoints.getJobs();
      return Array.isArray(resp) ? resp : resp?.items || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: false, // Don't refetch on tab focus
    refetchOnMount: false, // Don't refetch if data exists
  });

  const jobs: Job[] = data || [];

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gray-50" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 px-4 bg-gray-50" id="jobs">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">
            {(error as any)?.message || 'Failed to load jobs.'}
          </p>
          {/* ✅ Use refetch instead of window.location.reload() */}
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
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
