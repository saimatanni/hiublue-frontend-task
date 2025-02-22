import axios from 'axios';

// ✅ Create Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Use .env variable for flexibility
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Attach Request Interceptor
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") { // ✅ Ensure it's running on client-side
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Attach Response Interceptor (Optional: Handle Global Errors)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.message || error.message);
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    
    }
);

export default api;
