import { LoginRequest, SignupRequest, AuthResponse, User } from '../types/auth';
import * as endpoints from './endpoints/authEndpoints';

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      return await endpoints.login(credentials);
    } catch (error) {
      throw error;
    }
  },

  // Signup user
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      return await endpoints.register(userData);
    } catch (error) {
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    try {
      // backend may expose /api/users/myprofile - use that if available
      // fallback to auth validate/me if needed
      // Here we try validate endpoint to get status; user endpoints exist separately
      const valid = await endpoints.validate();
      return (valid && (valid.user as User)) || ({} as User);
    } catch (error) {
      throw error;
    }
  },

  // Logout user (client-side only, token cleanup handled by AuthContext)
  logout: (): void => {},

  // Validate token
  validateToken: async (): Promise<boolean> => {
    try {
      await endpoints.validate();
      return true;
    } catch (error) {
      return false;
    }
  }
};
