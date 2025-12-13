import api from '../api';

export const updateApplicationStatus = async (applicationId: string, data: any) => {
  const resp = await api.put(`/api/jobs/applications/${applicationId}/status`, data);
  return resp.data;
};

export const applyToJob = async (jobId: string, data: any) => {
  const resp = await api.post(`/api/jobs/${jobId}/apply`, data);
  return resp.data;
};

export const hasApplied = async (jobId: string) => {
  const resp = await api.get(`/api/jobs/${jobId}/has-applied`);
  return resp.data;
};

export const getApplications = async (jobId: string) => {
  const resp = await api.get(`/api/jobs/${jobId}/applications`);
  return resp.data;
};

export const getApplicationsCount = async (jobId: string) => {
  const resp = await api.get(`/api/jobs/${jobId}/applications/count`);
  return resp.data;
};

export const getMyApplications = async () => {
  const resp = await api.get('/api/jobs/my-applications');
  return resp.data;
};

export default { updateApplicationStatus, applyToJob, hasApplied, getApplications, getApplicationsCount, getMyApplications };
