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
  return instance;
};

// // Create instances for user, admin, and hoster
export const userAxiosInstance = createAxiosInstance(userBaseURL, userLogin, userLogout, 'user');
export const adminAxiosInstance = createAxiosInstance(adminBaseURL, adminLogin, adminLogout, 'admin');
export const hosterAxiosInstance = createAxiosInstance(hosterBaseURL, hosterLogin, hosterLogout, 'hoster');