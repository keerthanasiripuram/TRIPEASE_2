import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000/', // Your API base URL
  timeout: 5000, // Request timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
/*axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with successful response
    console.log('Response Interceptor:', response);
    return response;
  },
  (error) => {
    // Do something with response error
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
  }
);*/

export default axiosInstance;