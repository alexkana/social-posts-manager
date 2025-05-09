import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable credentials to allow cookies to be sent with requests
 withCredentials: true,
});



// Response interceptor to handle authentication errors
 api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Authentication error, redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);  

export default api; 