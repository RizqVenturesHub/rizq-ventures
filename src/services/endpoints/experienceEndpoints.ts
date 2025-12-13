import api from '../api';

export const updateExperience = async (experienceId: string, data: any) => {
  const resp = await api.put(`/api/users/myprofile/experiences/${experienceId}`, data);
  return resp.data;
};

export const deleteExperience = async (experienceId: string) => {
  const resp = await api.delete(`/api/users/myprofile/experiences/${experienceId}`);
  return resp.data;
};

export const getExperiences = async () => {
  const resp = await api.get('/api/users/myprofile/experiences');
  return resp.data;
};

export const addExperience = async (data: any) => {
  const resp = await api.post('/api/users/myprofile/experiences', data);
  return resp.data;
};

export default { updateExperience, deleteExperience, getExperiences, addExperience };
