import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    "/carrito",
    "/cuenta",
    "/confirmar-pedido",
    "/direccion",
    "/mis-pedidos"
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/carrito/:path*",
    "/cuenta/:path*",
    "/confirmar-pedido/:path*",
    "/direccion/:path*",
    "/mis-pedidos/:path*",
    "/cuenta/productos/:path*",
    "/cuenta/pedidos/:path*",
  ],
};