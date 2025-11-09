// data/types.ts - Updated Job interface
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  description: string;
  companyLogo?: string;
  postedDate?: string;
  salary?: string;
}

export interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
  expertise?: string[];
}
