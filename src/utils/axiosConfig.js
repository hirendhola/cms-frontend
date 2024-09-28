import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


let accessToken = null;
let refreshToken = null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  withCredentials: true,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};

axiosInstance.interceptors.request.use(
  (config) => {
    const urlParts = config.url.split('/');
    const userType = urlParts[1];

    if (userType === 'auth') {
      const authUserType = urlParts[2];
      const token = localStorage.getItem(`${authUserType}AccessToken`);
      if (token && !isTokenExpired(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else if(isTokenExpired(token)) {
          console.log("hell yeah")
      }
    } else if (['admin', 'hod'].includes(userType)) {
      const token = localStorage.getItem(`${userType}AccessToken`);
      if (token && !isTokenExpired(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && refreshToken && !isTokenExpired(refreshToken)) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post('http://localhost:3000/api/auth/admin/refreshtoken', {}, {
          withCredentials: true
        });

        if (refreshResponse.status === 200) {
          accessToken = refreshResponse.data.accessToken;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
