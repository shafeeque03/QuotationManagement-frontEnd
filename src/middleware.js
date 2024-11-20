import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export function middleware(req) {
  const userToken = req.cookies.get('userToken')?.value || null;
  const adminToken = req.cookies.get('adminToken')?.value || null;

  const requestedPath = req.nextUrl.pathname;

  if (requestedPath === '/' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath.startsWith('/home') && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath.startsWith('/admin/users') && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (requestedPath.startsWith('/admin/dashboard') && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}
