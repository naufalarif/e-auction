import { NextResponse } from "next/server";
import { verify } from "./utils/jwt";
import type { NextRequest } from "next/server";

const adminSecret = 'secretss';

const userSecret = 'secret';

export async function middleware(req: NextRequest) {
  const url = req.url;

  const { pathname } = req.nextUrl;

  // Protect admin page
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const jwt = req.cookies.get('AdminSession');

    // If JWT is empty redirect to admin login page
    if (
      (pathname === '/admin' ||
      pathname === '/admin/shipping' ||
      pathname === '/admin/order' ||
      pathname === '/admin/product' ||
      pathname === '/admin/report' ||
      pathname === '/admin/payment') &&
      jwt === undefined
    ) {
      return NextResponse.redirect(new URL("/admin/login", url));
    }

    if (pathname === '/admin/logout' && jwt) {
      try {
        await verify(jwt, adminSecret);
        return NextResponse.next();
      } catch (e) {
        return NextResponse.redirect(new URL("/admin/login", url));
      }
    }

    // Redirect if admin already logged in
    if (pathname === '/admin/login' && jwt) {
      try {
        await verify(jwt, adminSecret);
        return NextResponse.redirect(new URL("/admin", url));
      } catch (e) {
        return NextResponse.next();
      }
    }

    // Check if jwt valid or not
    if (jwt) {
      try {
        await verify(jwt, adminSecret);
        return NextResponse.next();
      } catch (e) {
        return NextResponse.redirect(new URL("/", url));
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ]
}