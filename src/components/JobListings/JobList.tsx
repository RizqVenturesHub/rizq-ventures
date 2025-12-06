// components/JobListings/JobList.tsx
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobFiltersState } from '../../pages/JobListingsPage';
import JobCard from './JobCard';

interface JobListProps {
  filters: JobFiltersState;
}

// Mock data - replace with API call
const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Innovators Inc. - Karachi, Sindh, Pakistan',
    location: 'Karachi, Sindh, Pakistan',
    postedDate: '2 days ago',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    type: 'Full Time',
    experience: 'Entry Level',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Global Marketing Solutions - Lahore, Punjab, Pakistan',
    location: 'Lahore, Punjab, Pakistan',
    postedDate: '1 week ago',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    type: 'Full Time',
    experience: 'Mid Level',
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Finance First Group - Islamabad, Islamabad Capital Territory, Pakistan',
    location: 'Islamabad, Pakistan',
    postedDate: '3 weeks ago',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    type: 'Contract',
    experience: 'Senior Level',
  },
  {
    id: '4',
    title: 'Human Resources Specialist',
    company: 'People Power HR - Karachi, Sindh, Pakistan',
    location: 'Karachi, Sindh, Pakistan',
    postedDate: '1 month ago',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80',
    type: 'Part Time',
    experience: 'Entry Level',
  },
];

const JobList: React.FC<JobListProps> = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'recent' | 'companies'>('recent');
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
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
