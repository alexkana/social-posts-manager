import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust this path if needed

/**
 * RequireAuth component protects routes that require authentication
 * 
 * Usage:
 * <Route 
 *   path="/protected-route" 
 *   element={
 *     <RequireAuth>
 *       <ProtectedComponent />
 *     </RequireAuth>
 *   } 
 * />
 */
const RequireAuth = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth(); 
  const location = useLocation();
  console.log('isAuthenticated', isAuthenticated);

  // If not authenticated, redirect to login page with the return url
  if (!isAuthenticated) {
    // Save the location they were trying to go to for a redirect after login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default RequireAuth; 