// src/types/jobFilters.ts
export interface JobFiltersState {
  location: string;
  jobType: string[];
  experienceLevel: string[];
  salaryRange: [number, number];
  datePosted: string;
  deadline: string;
  skills: string[];
  searchQuery: string;
}
