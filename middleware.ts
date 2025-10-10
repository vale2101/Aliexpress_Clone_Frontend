import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/carrito") && !isAuth) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/carrito/:path*", 
    
  ],
};