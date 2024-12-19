import axios from 'axios';
import Cookies from 'js-cookie';
import store from '@/redux/Store';
import { userLogin, userLogout } from '@/redux/slice/UserSlice';
import { adminLogin, adminLogout } from '@/redux/slice/AdminSlice';
import { hosterLogin, hosterLogout } from '@/redux/slice/HosterSlice';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555/';
const userBaseURL = baseURL;
const adminBaseURL = `${baseURL}admin`;
const hosterBaseURL = `${baseURL}hoster`;

// Create Axios instance
const createAxiosInstance = (baseURL, loginAction, logoutAction, userType) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    timeoutErrorMessage: 'Request timeout. Please try again.',
    withCredentials: true, // Send cookies with every request
  });

  // Request interceptor to add token
  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401 Unauthorized (token expiration)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If token expired (401 error) and it's not a retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Call backend refresh token API (refreshToken is automatically sent via cookies)
          const res = await axios.post(`${baseURL}auth/refresh-token`, {role:userType}, { 
            withCredentials: true 
          });

          const { accessToken } = res.data;

          // Update accessToken in cookies
          Cookies.set('accessToken', accessToken, { expires: 0.5 });


          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, log out the user and redirect to login page
          store.dispatch(logoutAction());
          let redirectPath;
          switch (userType) {
            case 'user':
              redirectPath = '/login';
              break;
            case 'admin':
              redirectPath = '/admin/login';
              break;
            case 'hoster':
              redirectPath = '/hoster/login';
              break;
            default:
              redirectPath = '/login';
          }
          window.location.href = redirectPath;
        }
      } else if (error.response?.status === 401) {
        // If there's no valid token, redirect to login page
        console.log("ivde calling")
        store.dispatch(logoutAction());
        let redirectPath;
        switch (userType) {
          case 'user':
            redirectPath = '/login';
            break;
          case 'admin':
            redirectPath = '/admin/login';
            break;
          case 'hoster':
            redirectPath = '/hoster/login';
            break;
          default:
            redirectPath = '/login';
        }
        window.location.href = redirectPath;
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instances for user, admin, and hoster
export const userAxiosInstance = createAxiosInstance(userBaseURL, userLogin, userLogout, 'user');
export const adminAxiosInstance = createAxiosInstance(adminBaseURL, adminLogin, adminLogout, 'admin');
export const hosterAxiosInstance = createAxiosInstance(hosterBaseURL, hosterLogin, hosterLogout, 'hoster');