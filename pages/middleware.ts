import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import type { NextRequest } from "next/server";

const secret = 'secretss';

const userSecret = 'secret';

export default function middleware(req: NextRequest) {
  const { cookies }: any = req;

  const jwt = cookies.OursiteJWT;

  const url = req.url;
  console.log({ url });
  if (url?.includes('/admin')) {
    if (jwt === undefined) {
      return NextResponse.redirect("/admin/login");
    }

    try {
      verify(jwt, userSecret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/admin/login");
    }
  }

  if (!url?.includes('/admin')) {
    if (jwt === undefined) {
      return NextResponse.redirect("/");
    }

    try {
      verify(jwt, userSecret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/");
    }
  }

  return NextResponse.next();
}