import api from '../api';

export const searchUsers = async (params?: any) => {
  const resp = await api.get('/api/search/users', { params });
  return resp.data;
};

export const searchJobs = async (params?: any) => {
  const resp = await api.get('/api/search/jobs', { params });
  return resp.data;
};

export default { searchUsers, searchJobs };
