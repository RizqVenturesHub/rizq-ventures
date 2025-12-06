// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToHash from './components/ScrollToHash';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;