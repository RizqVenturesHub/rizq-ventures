import React, { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/JobPost/Filters';
import JobListings from '../components/JobPost/JobListings';
// import { JobType } from '../components/types'; // or define type inline as below

// Example jobs data
const JOBS: JobType[] = [
  {
    title: 'Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Karachi, Sindh, Pakistan',
    skills: ['React', 'Java'],
    postedDate: 'Posted 2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=2832&q=80',
  },
  {
    title: 'Marketing Manager',
    company: 'Global Marketing Solutions',
    location: 'Lahore, Punjab, Pakistan',
    skills: ['Java'],
    postedDate: 'Posted 1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&w=800&q=80',
  },
  {
    title: 'Financial Analyst',
    company: 'Finance First Group',
    location: 'Islamabad, Pakistan',
    skills: ['Python'],
    postedDate: 'Posted 3 weeks ago',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&w=800&q=80',
  },
  {
    title: 'Financial Analyst',
    company: 'Finance First Group',
    location: 'Islamabad, Pakistan',
    skills: ['Python'],
    postedDate: 'Posted 3 weeks ago',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&w=800&q=80',
  },
    {
    title: 'Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Karachi, Sindh, Pakistan',
    skills: ['React', 'Java'],
    postedDate: 'Posted 2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=2832&q=80',
  },

  {
    title: 'Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Karachi, Sindh, Pakistan',
    skills: ['React', 'Java'],
    postedDate: 'Posted 2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=2832&q=80',
  },
  
];

export type JobType = {
  title: string;
  company: string;
  location: string;
  skills: string[];
  postedDate: string;
  imageUrl: string;
};

const JobPost: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // Additional filter state can go here

  // Filter jobs according to selected skills
  const filteredJobs = selectedSkills.length === 0
    ? JOBS
    : JOBS.filter(job => selectedSkills.every(skill => job.skills.includes(skill)));

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <Filters selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
          <JobListings jobs={filteredJobs} />
        </div>
      </main>
    </div>
  );
};

export default JobPost;
