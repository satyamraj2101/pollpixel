// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\utils\axiosInstance.js
import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to all requests if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Or sessionStorage depending on your preference
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle Unauthorized error (e.g., token expired or invalid)
            console.log('Session expired or Unauthorized');
            // Redirect to login or logout user
            window.location.href = '/login'; // Redirect to login page or show a message
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
