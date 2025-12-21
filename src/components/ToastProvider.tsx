import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{ zIndex: 9999 }}
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#ffffff',
          color: '#0f172a',
          boxShadow: '0 8px 24px rgba(2,6,23,0.08)',
          padding: '12px 14px',
        },
        success: {
          duration: 2800,
          icon: '✅',
        },
        error: {
          duration: 5000,
          icon: '❌',
        },
      }}
    />
  );
}
