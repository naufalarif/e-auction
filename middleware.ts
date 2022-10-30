import { NextResponse } from "next/server";
import { verify } from "./utils/jwt";
import type { NextRequest } from "next/server";

const adminSecret = 'secretss';

const userSecret = 'secret';

export async function middleware(req: NextRequest) {
  const url = req.url;

  // Protect admin page
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const jwt = req.cookies.get('AdminSession');

    // If JWT is empty redirect to admin login page
    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/admin/login", url));
    }

    // Redirect if admin already logged in
    if (req.nextUrl.pathname === '/admin/login') {
      try {
        await verify(jwt, adminSecret);
        return NextResponse.redirect(new URL("/admin", url));
      } catch (e) {
        return NextResponse.next();
      }
    }

    // Check if jwt valid or not
    try {
      await verify(jwt, adminSecret);
      console.log('run verify');
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/", url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path"]
}