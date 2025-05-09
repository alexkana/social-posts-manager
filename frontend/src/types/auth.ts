import { User } from './post';
import { ReactNode } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
} 