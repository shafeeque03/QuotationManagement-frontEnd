import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

// Helper function to check if a token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded?.exp * 1000 < Date.now(); // Compare expiration with current time
  } catch (error) {
    return true; // Treat invalid tokens as expired
  }
};

// Function to validate tokens and clean up expired ones
export const checkAndClearExpiredTokens = () => {
  const state = JSON.parse(localStorage.getItem("reduxState") || "{}");

  // User token check
  if (state.user?.token && isTokenExpired(state.user.token)) {
    localStorage.setItem(
      "reduxState",
      JSON.stringify({ ...state, user: { token: null, user: null } })
    );
    Cookies.remove("userToken");
    window.location.href = "/login";
  }

  // Admin token check
  if (state.admin?.token && isTokenExpired(state.admin.token)) {
    localStorage.setItem(
      "reduxState",
      JSON.stringify({ ...state, admin: { token: null, admin: null } })
    );
    Cookies.remove("adminToken");
    window.location.href = "/admin/login";
  }

  // Hoster token check
  if (state.hoster?.token && isTokenExpired(state.hoster.token)) {
    localStorage.setItem(
      "reduxState",
      JSON.stringify({ ...state, hoster: { token: null, hoster: null } })
    );
    Cookies.remove("hosterToken");
    window.location.href = "/hoster/login";
  }
};
