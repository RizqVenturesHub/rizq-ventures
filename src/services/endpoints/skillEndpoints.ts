import api from '../api';

export const updateSkill = async (skillId: string, data: any) => {
  const resp = await api.put(`/api/users/myprofile/skills/${skillId}`, data);
  return resp.data;
};

export const deleteSkill = async (skillId: string) => {
  const resp = await api.delete(`/api/users/myprofile/skills/${skillId}`);
  return resp.data;
};

export const getSkills = async () => {
  const resp = await api.get('/api/users/myprofile/skills');
  return resp.data;
};

export const addSkill = async (data: any) => {
  const resp = await api.post('/api/users/myprofile/skills', data);
  return resp.data;
};

export const getSecondarySkills = async () => {
  const resp = await api.get('/api/users/myprofile/skills/secondary');
  return resp.data;
};

export const getPrimarySkills = async () => {
  const resp = await api.get('/api/users/myprofile/skills/primary');
  return resp.data;
};

export default {
  updateSkill,
  deleteSkill,
  getSkills,
  addSkill,
  getSecondarySkills,
  getPrimarySkills,
};
