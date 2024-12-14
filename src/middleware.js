import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const userToken = req.cookies.get('userToken')?.value || null;
  const adminToken = req.cookies.get('adminToken')?.value || null;
  const hosterToken = req.cookies.get('hosterToken')?.value || null;

  const requestedPath = req.nextUrl.pathname;

  const isTokenExpired = (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded?.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // User Protect
  if (
    ['/', '/quotations', '/quotation-details', '/create-quotation'].includes(requestedPath)
  ) {
    if (!userToken || isTokenExpired(userToken)) {
      req.cookies.delete('userToken');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Admin Protect
  if (
    requestedPath.startsWith('/admin') &&
    !requestedPath.includes('/admin/login')
  ) {
    if (!adminToken || isTokenExpired(adminToken)) {
      req.cookies.delete('adminToken');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Hoster Protect
  if (
    requestedPath.startsWith('/hoster') &&
    !requestedPath.includes('/hoster/login')
  ) {
    if (!hosterToken || isTokenExpired(hosterToken)) {
      req.cookies.delete('hosterToken');
      return NextResponse.redirect(new URL('/hoster/login', req.url));
    }
  }

  return NextResponse.next();
}
