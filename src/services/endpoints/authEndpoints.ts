import api from '../api';
import { registerUrl, loginUrl, validateUrl } from '../urls';

export const register = async (data: any) => {
  const resp = await api.post(registerUrl, data);
  return resp.data;
};

export const login = async (data: any) => {
  const resp = await api.post(loginUrl, data);
  return resp.data;
};

export const validate = async () => {
  const resp = await api.get(validateUrl);
  return resp.data;
};

export default { register, login, validate };
