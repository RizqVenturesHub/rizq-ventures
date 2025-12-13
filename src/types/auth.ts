export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  headline?: string;
  location?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  headline?: string;
  location?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
