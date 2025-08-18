import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RequireAuthProps {
  redirectTo?: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth(); 
  const location = useLocation();
  console.log('isAuthenticated', isAuthenticated);

  // If not authenticated, redirect to login page with the return url
  if (!isAuthenticated) {
    // Save the location they were trying to go to for a redirect after login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return <Outlet />;
};
