import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL+'api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const affiliateId = +Cookies.get('affiliateId');
  const clickId = +Cookies.get('clickId');
  if (affiliateId || clickId) {
    if (config.data) {
      config.data = {
        ...config.data,
        affiliateId,
        clickId,
      };
    } else {
      config.data = { affiliateId, clickId };
    }
    
  }
  return config;
});

export default axiosInstance;