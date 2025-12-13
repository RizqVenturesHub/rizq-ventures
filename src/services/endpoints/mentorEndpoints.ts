import { mockMentors } from '../../data/mentorsData';

export const getMentors = async () => {
  // Return local mock mentors for now; replace with API call when available
  return Promise.resolve(mockMentors);
};

export default { getMentors };
