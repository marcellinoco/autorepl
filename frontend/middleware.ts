import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

async function isGoogleAccessTokenValid(accessToken: string): Promise<boolean> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("access_token")?.value;

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

  const isTokenValid = await isGoogleAccessTokenValid(accessToken ?? "");

  if (!isTokenValid && !request.nextUrl.pathname.includes("/auth")) {
    const authUrl = new URL("/auth", request.url).toString();
    return NextResponse.redirect(authUrl);
  }

  if (isTokenValid && request.nextUrl.pathname.startsWith("/auth")) {
    const homeUrl = new URL("/", request.url).toString();
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
