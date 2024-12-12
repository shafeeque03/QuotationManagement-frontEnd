import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const userToken = req.cookies.get('userToken')?.value || null;
  const adminToken = req.cookies.get('adminToken')?.value || null;
  const hosterToken = req.cookies.get('hosterToken')?.value || null;

  const requestedPath = req.nextUrl.pathname;

  // Helper function to check token validity
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded?.exp * 1000 < Date.now(); // Compare expiration with current time
    } catch (error) {
      return true; // Treat invalid tokens as expired
    }
  };

  // User Protect
  if (
    ['/','/quotations','/quotation-details','/create-quotation']
    .includes(requestedPath) &&
    (!userToken || isTokenExpired(userToken))
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin Protect
  if (
    requestedPath.startsWith('/admin') &&
    !requestedPath.includes('/admin/login') &&
    (!adminToken || isTokenExpired(adminToken))
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Developer Protect
  if (
    requestedPath.startsWith('/hoster') &&
    !requestedPath.includes('/hoster/login') &&
    (!hosterToken || isTokenExpired(hosterToken))
  ) {
    return NextResponse.redirect(new URL('/hoster/login', req.url));
  }

  return NextResponse.next();
}
