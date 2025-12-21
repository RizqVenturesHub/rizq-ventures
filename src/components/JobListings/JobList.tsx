// components/JobListings/JobList.tsx
import React, { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobFiltersState } from '../../types/jobFilters';
import JobCard from './JobCard';
import { jobEndpoints } from '../../services/endpoints';

interface JobListProps {
  filters: JobFiltersState;
}

const JobList: React.FC<JobListProps> = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'recent' | 'companies'>('recent');
  const [error, setError] = useState<string>('');
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetch = async () => {
        setLoading(true);
        setError('');
        try {
          const params = {
            page: currentPage,
            limit: 10,
            ...filters,
          };
          const data = await jobEndpoints.getJobs(params as any);
          const items = data?.items || data || [];
          setJobs(items);
        } catch (e: any) {
          setError(e?.message || 'Failed to load jobs');
        } finally {
          setLoading(false);
        }
      };
  
      fetch();
    }, [filters, currentPage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
        <p className="text-gray-600">Explore opportunities that match your skills and career goals.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-3 bg-primary-light border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('recent')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'recent'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Most Recent
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'companies'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Companies
        </button>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {loading && !error ? (
            <div className="py-12 text-center text-gray-500">Loading jobs...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-600">{error}</div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobList;
