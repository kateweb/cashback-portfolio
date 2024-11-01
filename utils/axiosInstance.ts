import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL+'api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const affiliateId = localStorage.getItem('aid');
  const clickId = localStorage.getItem('aff_sub');

  // Include the params in the request if they exist
  if (affiliateId) {
    config.params = { ...config.params, affiliateId };
  }
  if (clickId) {
    config.params = { ...config.params, clickId };
  }

  return config;
});

export default axiosInstance;