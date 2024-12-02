import { NextResponse } from 'next/server';

export function middleware(req) {
  const userToken = req.cookies.get('userToken')?.value || null;
  const adminToken = req.cookies.get('adminToken')?.value || null;
  const hosterToken = req.cookies.get('hosterToken')?.value || null;

  const requestedPath = req.nextUrl.pathname;


//user protect
  if (requestedPath === '/' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath === '/products' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath === '/services' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath === '/quotation-details' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (requestedPath === '/create-quotation' && !userToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }


//admin protect
  if (
    requestedPath.startsWith('/admin') && 
    !requestedPath.includes('/admin/login') && 
    !adminToken
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }


  //developer protect
  if (
    requestedPath.startsWith('/hoster') && 
    !requestedPath.includes('/hoster/login') && 
    !adminToken
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  


  return NextResponse.next();
}