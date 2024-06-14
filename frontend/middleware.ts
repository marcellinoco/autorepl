import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import parseJwtPayload from "./utils/parseJwtPayload";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("access_token");

  if (
    request.nextUrl.pathname.endsWith(".js") ||
    request.nextUrl.pathname.endsWith(".css")
  ) {
    return NextResponse.next();
  }

  if (!accessToken && !request.nextUrl.pathname.includes("/auth")) {
    const authUrl = new URL("/auth", request.url).toString();
    return NextResponse.redirect(authUrl);
  }

  const payload = parseJwtPayload(accessToken?.value ?? "");
  if (
    (!payload ||
      !payload.expiredAt ||
      new Date(payload.expiredAt) <= new Date()) &&
    !request.nextUrl.pathname.includes("/auth")
  ) {
    const authUrl = new URL("/auth", request.url).toString();
    return NextResponse.redirect(authUrl);
  }

  if (
    payload &&
    payload.expiredAt &&
    new Date(payload.expiredAt) > new Date() &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    const homeUrl = new URL("/", request.url).toString();
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
