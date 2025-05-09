import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        try {
          const userObj = JSON.parse(savedUser);
          setUser(userObj);
          setIsAuthenticated(true);
        } catch (error) {
          // If parsing fails, clear localStorage
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (): Promise<boolean> => {
    try {
      const currentUser = await authService.getCurrentUser();
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(currentUser));
      
      setUser(currentUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      // Clear user from localStorage
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <div>Loading authentication...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 