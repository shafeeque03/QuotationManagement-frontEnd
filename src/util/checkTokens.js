import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export const cleanExpiredTokens = () => {
  const reduxState = JSON.parse(localStorage.getItem("reduxState") || "{}");

  // Check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded?.exp * 1000 < Date.now();
    } catch (error) {
      return true; // Consider invalid tokens as expired
    }
  };

  const newState = { ...reduxState };

  // Fetch tokens from cookies
  const userToken = Cookies.get("userToken");
  const adminToken = Cookies.get("adminToken");
  const hosterToken = Cookies.get("hosterToken");

  // Validate and clean user token
  if (!userToken || isTokenExpired(userToken)) {
    newState.user = { token: null, user: null };
    Cookies.remove("userToken"); // Remove invalid cookie
  }

  // Validate and clean admin token
  if (!adminToken || isTokenExpired(adminToken)) {
    newState.admin = { token: null, admin: null };
    Cookies.remove("adminToken"); // Remove invalid cookie
  }

  // Validate and clean hoster token
  if (!hosterToken || isTokenExpired(hosterToken)) {
    newState.hoster = { token: null, hoster: null };
    Cookies.remove("hosterToken"); // Remove invalid cookie
  }

  // Update the localStorage with the cleaned state
  localStorage.setItem("reduxState", JSON.stringify(newState));
};
