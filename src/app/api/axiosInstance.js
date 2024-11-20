import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005/";
const userBaseURL = baseURL;
const adminBaseURL = `${baseURL}admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    timeoutErrorMessage: "Request timeout. Please try again.",
  });
  return instance;
};

// User Axios Instance
export const userAxiosInstance = createAxiosInstance(userBaseURL);

// Admin Axios Instance
export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
