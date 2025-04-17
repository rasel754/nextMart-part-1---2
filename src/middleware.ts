import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type TRole = keyof typeof rolebasedPrivateRoute;

const authRoute = ["/login", "/register"];

const rolebasedPrivateRoute = {
  user: [/^\/user/ ,/^\/createshop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && rolebasedPrivateRoute[userInfo.role as TRole]) {
    const routes = rolebasedPrivateRoute[userInfo.role as TRole];

    if(routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/login", "/createshop" , "/admin" , "/admin/:page" , "/user" , "/user/:page"],
};
