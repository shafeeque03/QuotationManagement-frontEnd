import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const userToken = req.cookies.get("userToken")?.value || null;
  const adminToken = req.cookies.get("adminToken")?.value || null;
  const hosterToken = req.cookies.get("hosterToken")?.value || null;

  const requestedPath = req.nextUrl.pathname;

  // Check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded?.exp * 1000 < Date.now();
    } catch (error) {
      return true; // Consider invalid tokens as expired
    }
  };

  // User Protect: Protect user routes
  if (
    ["/", "/quotations", "/quotation-details", "/create-quotation"].includes(
      requestedPath
    )
  ) {
    if (!userToken || isTokenExpired(userToken)) {
      req.cookies.delete("userToken");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Prevent logged-in users from accessing the login page
  if (requestedPath === "/login" && userToken && !isTokenExpired(userToken)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home page
  }

  // Admin Protect: Protect admin routes
  if (
    requestedPath.startsWith("/admin") &&
    !(
      requestedPath.includes("/admin/login") ||
      requestedPath.includes("/admin/signup") ||
      requestedPath.includes("/admin/otp") ||
      requestedPath.includes("/admin/fotp") ||
      requestedPath.includes("/admin/forgetPassword") ||
      requestedPath.includes("/admin/newPassword")
    )
  ) {
    if (!adminToken || isTokenExpired(adminToken)) {
      req.cookies.delete("adminToken");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Prevent logged-in admins from accessing the admin login page
  if (requestedPath === "/admin/login" && adminToken && !isTokenExpired(adminToken)) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url)); // Redirect to admin dashboard
  }

  // Hoster Protect: Protect hoster routes
  if (
    requestedPath.startsWith("/hoster") &&
    !requestedPath.includes("/hoster/login")
  ) {
    if (!hosterToken || isTokenExpired(hosterToken)) {
      req.cookies.delete("hosterToken");
      return NextResponse.redirect(new URL("/hoster/login", req.url));
    }
  }

  // Prevent logged-in hosters from accessing the hoster login page
  if (requestedPath === "/hoster/login" && hosterToken && !isTokenExpired(hosterToken)) {
    return NextResponse.redirect(new URL("/hoster/dashboard", req.url)); // Redirect to hoster dashboard
  }

  return NextResponse.next();
}
