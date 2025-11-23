// hooks/useProfileData.ts
import { useState, useEffect } from 'react';

interface ProfileData {
  name: string;
  title: string;
  company: string;
  connections: number;
  profileCompletion: number;
  bannerImage?: string;
  profileImage?: string;
}

interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  companyLogo?: string;
}

interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  logo?: string;
}

interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
}

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Fatima Khan',
    title: 'Senior Product Manager at Innovate Solutions',
    company: 'Innovate Solutions',
    connections: 120,
    profileCompletion: 75,
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      period: '2020 - Present',
      title: 'Senior Product Manager',
      company: 'Innovate Solutions',
    },
    {
      id: '2',
      period: '2018 - 2020',
      title: 'Product Manager',
      company: 'Tech Forward Inc.',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      period: '2014 - 2018',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
    },
  ]);

  const [skills, setSkills] = useState<string[]>([
    'Product Management',
    'Agile Methodologies',
    'User Research',
    'Market Analysis',
    'Cross-functional Team Leadership',
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      year: '2022',
      title: 'Project Phoenix',
      description:
        'Led the development of a new mobile application, resulting in a 30% increase in user engagement.',
    },
    {
      id: '2',
      year: '2021',
      title: 'Project Nova',
      description:
        'Managed the launch of a new product feature, leading to a 20% growth in customer retention.',
    },
  ]);

  const [loading, setLoading] = useState(false);

  return {
    profile,
    experiences,
    education,
    skills,
    projects,
    loading,
  };
};
