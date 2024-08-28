import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

let accessToken = null;
let refreshToken = null;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
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



// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true,
// });

// const isTokenExpired = (token) => {
//   if (!token) return true;
//   const decodedToken = jwtDecode(token);
//   return decodedToken.exp * 1000 < Date.now();
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Extract the user type from the URL
//     const urlParts = config.url.split('/');
//     const userType = urlParts[1]; // Assuming URLs are structured like /admin/... or /hod/...

//     if (userType === 'auth') {
//       // For authentication routes, use the user type from the next part of the URL
//       const authUserType = urlParts[2];
//       const token = localStorage.getItem(`${authUserType}AccessToken`);
//       if (token && !isTokenExpired(token)) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     } else if (['admin', 'hod'].includes(userType)) {
//       // For other routes, use the token corresponding to the user type in the URL
//       const token = localStorage.getItem(`${userType}AccessToken`);
//       if (token && !isTokenExpired(token)) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
