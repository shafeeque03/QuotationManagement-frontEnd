import axios from 'axios';
import Cookies from 'js-cookie';
;
import store from '@/redux/Store';
import { userLogin,userLogout } from '@/redux/slice/UserSlice';
import { adminLogin,adminLogout } from '@/redux/slice/AdminSlice';
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
  });

  // Request interceptor to add token
  instance.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  // Response interceptor to handle 401 Unauthorized (token expiration)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If token expired (401 error) and it's not a retry, then refresh token
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          try {
            // Call backend refresh token API to get new access and refresh tokens
            const res = await axios.post(`${baseURL}auth/refresh-token`, { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = res.data;

            // Update cookies with new tokens
            Cookies.set('accessToken', accessToken, { expires: 0.5 });
            Cookies.set('refreshToken', newRefreshToken, { expires: 1 });

            // Fetch user/admin/hoster data after token refresh
            const dataResponse = await axios.get(`${baseURL}${userType}/me`);  // Simulated endpoint to get current user data
            const userData = dataResponse.data;

            // Update Redux store with the user data
            store.dispatch(loginAction({ token: accessToken, data: userData }));

            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh token fails, log out the user and redirect to login page
            store.dispatch(logoutAction());
            window.location.href = `/${userType}/login`; // Redirect to the respective login page
          }
        }
      } else if (error.response.status === 401) {
        // If there's no valid token, redirect to login page
        store.dispatch(logoutAction());
        window.location.href = `/${userType}/login`; // Redirect to the respective login page
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
