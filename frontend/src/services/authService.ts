import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data as User;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }
}; 