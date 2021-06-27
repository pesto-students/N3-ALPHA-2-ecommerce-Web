import axios from 'axios';

const DEVELOPMENT = true; // set false for production
const baseURLProduction = '';
const baseURLDevelopment = '';
const baseURL = DEVELOPMENT ? baseURLDevelopment : baseURLProduction;

const apiClient = axios.create({
    baseURL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        const auth = token ? `Bearer ${token}` : '';
        config.headers.common['Authorization'] = auth;
        return config;
    },
    (error) => Promise.reject(error)
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
