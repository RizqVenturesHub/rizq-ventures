// data/jobsData.ts
import { Job } from './types';

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'software engineering',
    description: "Tailor Anima's Landing Page UI Kit to your unique style and brand with customizable components. No time!",
    icon: '⚡',
    iconBg: 'bg-red-100',
    company: 'Tech Corp',
    location: 'Remote',
    jobType: 'Full Time',
    experienceLevel: 'Mid'
  },
  {
    id: 2,
    title: 'Full-stack developer',
    description: "No need to worry about screen size. Anima's Landing Page UI Kit adapts to any screen size, from desktop to mobile.",
    icon: '🔗',
    iconBg: 'bg-blue-100',
    company: 'Startup Inc',
    location: 'Hybrid',
    jobType: 'Full Time',
    experienceLevel: 'Senior'
  },
  {
    id: 3,
    title: '.net developer',
    description: "Zero coding skills required. Anima's Landing Page UI Kit empowers you to create stunning landing pages with ease.",
    icon: '👋',
    iconBg: 'bg-yellow-100',
    company: 'Dev Solutions',
    location: 'On-site',
    jobType: 'Contract',
    experienceLevel: 'Entry'
  }
];
