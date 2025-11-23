// components/JobListings/JobFilters.tsx
import React from 'react';
import { JobFiltersState } from '../../pages/JobListingsPage';
import LocationFilter from './LocationFilter'; 
import JobTypeFilter from './JobTypeFilter'; 
import ExperienceFilter from './ExperienceFilter';
import SalaryRangeFilter from './SalaryRangeFilter'; 
import DatePostedFilter from './DatePostedFilter';
import DeadlineFilter from './DeadlineFilter';
import SkillsFilter from './SkillsFilter';

interface JobFiltersProps {
  filters: JobFiltersState;
  onFilterChange: (filters: Partial<JobFiltersState>) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <LocationFilter 
        value={filters.location} 
        onChange={(location) => onFilterChange({ location })} 
      />
      
      <JobTypeFilter 
        value={filters.jobType} 
        onChange={(jobType) => onFilterChange({ jobType })} 
      />
      
      <ExperienceFilter 
        value={filters.experienceLevel} 
        onChange={(experienceLevel) => onFilterChange({ experienceLevel })} 
      />
      
      <SalaryRangeFilter 
        value={filters.salaryRange} 
        onChange={(salaryRange) => onFilterChange({ salaryRange })} 
      />
      
      <DatePostedFilter 
        value={filters.datePosted} 
        onChange={(datePosted) => onFilterChange({ datePosted })} 
      />
      
      <DeadlineFilter 
        value={filters.deadline} 
        onChange={(deadline) => onFilterChange({ deadline })} 
      />
      
      <SkillsFilter 
        value={filters.skills} 
        onChange={(skills) => onFilterChange({ skills })} 
      />
    </div>
  );
};

export default JobFilters;
