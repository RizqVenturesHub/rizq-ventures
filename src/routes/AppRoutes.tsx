// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
// import SignupPage from '../pages/SignupPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ProfilePage />} />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/profile" replace /> : <LoginPage />} 
      />
      {/* <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/profile" replace /> : <SignupPage />} 
      /> */}

      {/* Protected routes */}
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />}
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
