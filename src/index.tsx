import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastProvider from './components/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ Configure QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry once instead of 3 times
      refetchOnWindowFocus: false, // Don't refetch when switching tabs
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// ✅ Remove React.StrictMode for now (it causes double-mounting)
// Add it back after fixing the issue to test
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastProvider />
  </QueryClientProvider>
);

reportWebVitals();
