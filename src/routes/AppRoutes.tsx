// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/ProfilePage';
import PostsPage from '../pages/PostsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignUpPage';
import MessagingPage from '../pages/MessagingPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected routes */}
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/posts"
        element={isAuthenticated ? <PostsPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/messages"
        element={isAuthenticated ? <MessagingPage /> : <Navigate to="/login" replace />}
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
