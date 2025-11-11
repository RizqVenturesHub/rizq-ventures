import { API } from "../lib/axios";

// ✅ LOGIN
export const loginAPI = (payload: any) =>
  API.post("/api/auth/login", payload);

// ✅ REGISTER (SIGNUP)
export const registerAPI = (payload: any) =>
  API.post("/api/auth/register", payload);

// ✅ VALIDATE TOKEN
export const validateAPI = () =>
  API.get("/api/auth/validate");
