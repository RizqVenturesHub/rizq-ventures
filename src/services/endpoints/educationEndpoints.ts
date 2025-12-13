import api from '../api';

export const updateEducation = async (educationId: string, data: any) => {
  const resp = await api.put(`/api/users/myprofile/education/${educationId}`, data);
  return resp.data;
};

export const deleteEducation = async (educationId: string) => {
  const resp = await api.delete(`/api/users/myprofile/education/${educationId}`);
  return resp.data;
};

export const getEducation = async () => {
  const resp = await api.get('/api/users/myprofile/education');
  return resp.data;
};

export const addEducation = async (data: any) => {
  const resp = await api.post('/api/users/myprofile/education', data);
  return resp.data;
};

export default { updateEducation, deleteEducation, getEducation, addEducation };
