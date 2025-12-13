import api from '../api';

export const getMyProfile = async () => {
  const resp = await api.get('/api/users/myprofile');
  return resp.data;
};

export const updateMyProfile = async (data: any) => {
  const resp = await api.put('/api/users/myprofile', data);
  return resp.data;
};

export const getUserById = async (userId: string) => {
  const resp = await api.get(`/api/users/${userId}`);
  return resp.data;
};

export default { getMyProfile, updateMyProfile, getUserById };
