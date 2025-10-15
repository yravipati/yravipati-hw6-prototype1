import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const submitProfile = async (profileData) => {
  try {
    const response = await api.post('/user/profile', profileData);
    return {
      success: true,
      profileId: response.data.profileId,
      data: response.data,
    };
  } catch (error) {
    console.error('Profile submission error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to submit profile',
    };
  }
};

export const getProfile = async (profileId) => {
  try {
    const response = await api.get(`/user/profile/${profileId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch profile',
    };
  }
};

export default api;
