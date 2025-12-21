import api from '../api';

export const getPost = async (postId: string) => {
  const resp = await api.get(`/api/posts/${postId}`);
  return resp.data;
};

export const updatePost = async (postId: string, data: any) => {
  const resp = await api.put(`/api/posts/${postId}`, data);
  return resp.data;
};

export const deletePost = async (postId: string) => {
  const resp = await api.delete(`/api/posts/${postId}`);
  return resp.data;
};

export const createPost = async (data: any) => {
  const resp = await api.post('/api/posts', data);
  return resp.data;
};

export const likePost = async (postId: string) => {
  const resp = await api.post(`/api/posts/${postId}/like`);
  return resp.data;
};

export const getPostLikesCount = async (postId: string) => {
  const resp = await api.get(`/api/posts/${postId}/likes/count`);
  return resp.data;
};

export const isPostLiked = async (postId: string) => {
  const resp = await api.get(`/api/posts/${postId}/is-liked`);
  return resp.data;
};

export const getPostsByUser = async (userId: string) => {
  const resp = await api.get(`/api/posts/user/${userId}`);
  return resp.data;
};

export const getFeed = async () => {
  const resp = await api.get('/api/posts/feed');
  return resp.data;
};

export const getPosts = async (params?: any) => {
  const resp = await api.get('/api/posts', { params });
  return resp.data;
};

export default {
  getPost,
  updatePost,
  deletePost,
  createPost,
  likePost,
  getPostLikesCount,
  isPostLiked,
  getPostsByUser,
  getFeed,
  getPosts,
};
