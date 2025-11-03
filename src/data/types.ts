// data/types.ts
export interface Job {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  company?: string;
  location?: string;
  jobType?: string;
  experienceLevel?: string;
}

export interface Mentor {
  id: string | number;
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
  expertise?: string[];
}
