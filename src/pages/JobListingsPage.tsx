// src/pages/JobListingsPage.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JobFilters from '../components/JobListings/JobFilters';
import JobList from '../components/JobListings/JobList';
import { JobFiltersState } from '../types/jobFilters'; // see step 2

const JobListingsPage: React.FC = () => {
  const [filters, setFilters] = useState<JobFiltersState>({
    location: 'Pune',
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, 8000000],
    datePosted: 'Past 24 hours',
    deadline: '',
    skills: ['React', 'Java', 'Python'],
    searchQuery: '',
  });

  const handleFilterChange = (newFilters: Partial<JobFiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <JobFilters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <div className="flex-1">
            <JobList filters={filters} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobListingsPage;
