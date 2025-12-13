import api from '../api';

export const updateComment = async (postId: string, commentId: string, data: any) => {
  const resp = await api.put(`/api/posts/${postId}/comments/${commentId}`, data);
  return resp.data;
};

export const deleteComment = async (postId: string, commentId: string) => {
  const resp = await api.delete(`/api/posts/${postId}/comments/${commentId}`);
  return resp.data;
};

export const getComments = async (postId: string) => {
  const resp = await api.get(`/api/posts/${postId}/comments/`);
  return resp.data;
};

export const addComment = async (postId: string, data: any) => {
  const resp = await api.post(`/api/posts/${postId}/comments/`, data);
  return resp.data;
};

export const getReplies = async (postId: string, commentId: string) => {
  const resp = await api.get(`/api/posts/${postId}/comments/${commentId}/replies`);
  return resp.data;
};

export const getCommentsCount = async (postId: string) => {
  const resp = await api.get(`/api/posts/${postId}/comments/count`);
  return resp.data;
};

export default { updateComment, deleteComment, getComments, addComment, getReplies, getCommentsCount };
