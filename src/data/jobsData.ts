// data/jobsData.ts - Complete with all fields
import { Job } from './types';

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Backend Developer',
    company: 'CRED',
    location: 'Bangalore',
    jobType: 'Full Time',
    experienceLevel: 'Mid (3-5 years)',
    description: 'Build scalable fintech solutions for millions of users. Work with cutting-edge technologies.',
    companyLogo: '/assets/companies/cred.png',
    postedDate: '2 days ago',
    salary: '₹20L - ₹35L/year',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Ola',
    location: 'Remote',
    jobType: 'Full Time',
    experienceLevel: 'Senior (5+ years)',
    description: 'Transform urban mobility. Build features used by millions of riders across India.',
    companyLogo: '/assets/companies/ola.png',
    postedDate: '5 days ago',
    salary: '₹25L - ₹45L/year',
  },
  {
    id: 3,
    title: 'Software Engineer',
    company: 'boAt',
    location: 'Mumbai',
    jobType: 'Full Time',
    experienceLevel: 'Junior (1-3 years)',
    description: "Join India's #1 audio brand. Work on IoT, mobile apps, and e-commerce platforms.",
    companyLogo: '/assets/companies/boat.png',
    postedDate: '1 week ago',
    salary: '₹8L - ₹15L/year',
  },
];
