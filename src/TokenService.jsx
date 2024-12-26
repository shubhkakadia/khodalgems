import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Token Service for authentication and verification
export const TokenService = {
  // Save token to localStorage
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // Verify token with server
  verifyToken: async () => {
    const token = TokenService.getToken();
    
    if (!token) {
      return false;
    }

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/verifyToken`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // If verification is successful, return true
      return response.data.valid === true;
    } catch (error) {
      // Token is invalid or expired
      console.error('Token verification failed:', error);
      return false;
    }
  }
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify token with server
        const isValid = await TokenService.verifyToken();
        
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          TokenService.removeToken();
          
          // Safely check if toast is available before calling
          // if (toast && typeof toast.error === 'function') {
          //   toast.error('Your session has expired. Please log in again.', {
          //     position: "top-right",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //   });
          // }
          
          // Redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return isAuthenticated ? children : null;
};

// Axios Interceptor for adding token to requests
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = TokenService.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling token-related errors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired
        TokenService.removeToken();
        
        // Redirect to login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};