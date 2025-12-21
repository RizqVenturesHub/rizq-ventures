import api from '../api';
import { registerUrl, loginUrl, validateUrl } from '../urls';

// Simple in-memory map to dedupe identical in-flight requests
const pending: Map<string, Promise<any>> = new Map();

export const register = async (data: any) => {
  const resp = await api.post(registerUrl, data);
  return resp.data;
};

export const login = async (data: any) => {
  const key = `login:${JSON.stringify(data || {})}`;
  if (pending.has(key)) {
    return pending.get(key);
  }

  const promise = api.post(loginUrl, data).then((resp) => resp.data).finally(() => {
    pending.delete(key);
  });

  pending.set(key, promise);
  return promise;
};

export const validate = async () => {
  const resp = await api.get(validateUrl);
  return resp.data;
};

export default { register, login, validate };
