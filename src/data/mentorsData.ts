// data/mentorsData.ts
import { Mentor } from './types';

export const mockMentors: Mentor[] = [
  {
    id: 1,
    name: 'Aman Shaikh',
    role: 'UX Designer',
    company: 'BBello',
    description: 'Sharing actionable advice for creative breakthroughs in UI/UX and helping new designers build real-world skills.',
    image: '/mentors/aman.jpg',
    expertise: ['UI/UX', 'Design Systems', 'User Research']
  },
  {
    id: 2,
    name: 'Naiem Shaikh',
    role: 'Creative Director',
    company: 'Rko',
    description: 'Guiding professionals through career transitions and supporting them on tech journeys for a confident future.',
    image: '/mentors/naiem.jpg',
    expertise: ['Career Coaching', 'Leadership', 'Tech Strategy']
  },
  {
    id: 3,
    name: 'Arman',
    role: 'UI Designer',
    company: 'BBob',
    description: 'Empowering members to connect, learn, and grow through collaborative design solutions and practical resources.',
    image: '/mentors/arman.jpg',
    expertise: ['UI Design', 'Prototyping', 'Design Thinking']
  }
];
