import { clerkMiddleware, createRouteMatcher, auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = new URL(request.url);

  // Redirect signed-in users away from sign-in or sign-up to dashboard
  if (userId && isPublicRoute(request) && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(request) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Otherwise continue as normal
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
