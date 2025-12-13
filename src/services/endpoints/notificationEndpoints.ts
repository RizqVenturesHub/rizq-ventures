import api from '../api';

export const markAsRead = async (notificationId: string) => {
  const resp = await api.put(`/api/notifications/${notificationId}/read`);
  return resp.data;
};

export const markAllRead = async () => {
  const resp = await api.put(`/api/notifications/read-all`);
  return resp.data;
};

export const getNotifications = async () => {
  const resp = await api.get('/api/notifications');
  return resp.data;
};

export const getUnreadCount = async () => {
  const resp = await api.get('/api/notifications/unread-count');
  return resp.data;
};

export const deleteNotification = async (notificationId: string) => {
  const resp = await api.delete(`/api/notifications/${notificationId}`);
  return resp.data;
};

export default { markAsRead, markAllRead, getNotifications, getUnreadCount, deleteNotification };
