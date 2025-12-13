import api from '../api';

export const getJob = async (jobId: string) => {
  const resp = await api.get(`/api/jobs/${jobId}`);
  return resp.data;
};

export const updateJob = async (jobId: string, data: any) => {
  const resp = await api.put(`/api/jobs/${jobId}`, data);
  return resp.data;
};

export const deleteJob = async (jobId: string) => {
  const resp = await api.delete(`/api/jobs/${jobId}`);
  return resp.data;
};

export const getJobs = async (params?: any) => {
  const resp = await api.get('/api/jobs', { params });
  return resp.data;
};

export const createJob = async (data: any) => {
  const resp = await api.post('/api/jobs', data);
  return resp.data;
};

export const getRecommendedJobs = async () => {
  const resp = await api.get('/api/jobs/recommended');
  return resp.data;
};

export const getMyJobs = async () => {
  const resp = await api.get('/api/jobs/my-jobs');
  return resp.data;
};

export default { getJob, updateJob, deleteJob, getJobs, createJob, getRecommendedJobs, getMyJobs };
