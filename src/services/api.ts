// services/api.ts - Complete API service
import { Job } from '../data/types';
import { mockJobs } from '../data/jobsData';
import { mockMentors } from '../data/mentorsData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jobsAPI = {
  getJobs: async (): Promise<Job[]> => {
    await delay(500); // Simulate network delay
    return mockJobs;
  },
  
  getJobById: async (id: number): Promise<Job | undefined> => {
    await delay(300);
    return mockJobs.find(job => job.id === id);
  },
};

export const mentorsAPI = {
  getMentors: async () => {
    await delay(500);
    return mockMentors;
  },
  
  getMentorById: async (id: number) => {
    await delay(300);
    return mockMentors.find(mentor => mentor.id === id);
  },
};
