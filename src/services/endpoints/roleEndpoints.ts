import api from '../api';

export const reviewRoleRequest = async (requestId: string, data: any) => {
  const resp = await api.post(`/api/admin/roles/${requestId}/review`, data);
  return resp.data;
};

export const revokeRole = async (userId: string, data: any) => {
  const resp = await api.post(`/api/admin/roles/revoke/${userId}`, data);
  return resp.data;
};

export const requestRole = async (data: any) => {
  const resp = await api.post('/api/admin/roles/request', data);
  return resp.data;
};

export const assignRole = async (data: any) => {
  const resp = await api.post('/api/admin/roles/assign', data);
  return resp.data;
};

export const getPending = async () => {
  const resp = await api.get('/api/admin/roles/pending');
  return resp.data;
};

export const getPendingCount = async () => {
  const resp = await api.get('/api/admin/roles/pending/count');
  return resp.data;
};

export const getMyRequests = async () => {
  const resp = await api.get('/api/admin/roles/my-requests');
  return resp.data;
};

export default { reviewRoleRequest, revokeRole, requestRole, assignRole, getPending, getPendingCount, getMyRequests };
