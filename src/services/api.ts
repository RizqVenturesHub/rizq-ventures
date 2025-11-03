// services/api.ts
import { Job, Mentor } from '../data/types';
import { mockJobs } from '../data/jobsData';
import { mockMentors } from '../data/mentorsData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Job API Functions
export const jobsAPI = {
  // Fetch all jobs
  async getJobs(): Promise<Job[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/jobs`);
      // const data = await response.json();
      // return data;
      
      // Using mock data for now
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockJobs), 500);
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Fetch single job by ID
  async getJobById(id: string | number): Promise<Job | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      // const data = await response.json();
      // return data;
      
      return new Promise((resolve) => {
        const job = mockJobs.find(j => j.id === id);
        setTimeout(() => resolve(job || null), 500);
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  }
};

// Mentor API Functions
export const mentorsAPI = {
  // Fetch all mentors
  async getMentors(): Promise<Mentor[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/mentors`);
      // const data = await response.json();
      // return data;
      
      // Using mock data for now
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockMentors), 500);
      });
    } catch (error) {
      console.error('Error fetching mentors:', error);
      throw error;
    }
  },

  // Fetch single mentor by ID
  async getMentorById(id: string | number): Promise<Mentor | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/mentors/${id}`);
      // const data = await response.json();
      // return data;
      
      return new Promise((resolve) => {
        const mentor = mockMentors.find(m => m.id === id);
        setTimeout(() => resolve(mentor || null), 500);
      });
    } catch (error) {
      console.error('Error fetching mentor:', error);
      throw error;
    }
  }
};
