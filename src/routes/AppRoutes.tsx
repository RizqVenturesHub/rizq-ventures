// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/ProfilePage';
import PostsPage from '../pages/PostsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignUpPage';
import MessagingPage from '../pages/MessagingPage';
import MentorPage from '../pages/MentorPage';
// routes/AppRoutes.tsx
import NotificationsPage from '../pages/NotificationsPage';
import JobListingsPage from '../pages/JobListingsPage';
import NormalPostPage from '../pages/job-posting/NormalPostPage';
import JobPostPage from '../pages/job-posting/JobPostPage';
import JobDetailPage from '../pages/JobDetailPage';
import JobApplicationsPage from '../pages/JobApplicationsPage';


const AppRoutes: React.FC = () => {
  const { isLoading } = useAuth();

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
      <Route path="/mentors" element={<MentorPage />} /> {/* Public - anyone can view */}
      <Route path="/jobs" element={<JobListingsPage />} /> {/* Public - anyone can view */}

      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <PostsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <NormalPostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <JobPostPage />
          </ProtectedRoute>
        }
      />
      <Route path="/jobs/:id" element={<JobDetailPage/>} />
      <Route path="/jobs/:id/applications" element={<ProtectedRoute><JobApplicationsPage/></ProtectedRoute>} />
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
