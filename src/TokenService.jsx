import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

// Token Service for authentication and verification
export const TokenService = {
  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('authToken');
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
export const ProtectedRoute = ({ children, adminRoute }) => {
  const user = useSelector((state) => state.user.success);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // Verify token first
        const isValid = await TokenService.verifyToken();
        
        if (!isValid) {
          TokenService.removeToken();
          navigate('/login');
          return;
        }

        // Then check admin status from Redux
        const isAdmin = user?.admin === 1;

        // Route protection logic
        if (adminRoute && !isAdmin) {
          toast.error("Admin access required");
          navigate('/dashboard');
          return;
        }

        if (!adminRoute && isAdmin) {
          toast.error("User access required");
          navigate('/admin');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Access verification failed:', error);
        TokenService.removeToken();
        navigate('/login');
      }
    };

    verifyAccess();
  }, [navigate, adminRoute, user?.admin]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return children;
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