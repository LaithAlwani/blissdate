import { clerkMiddleware  } from "@clerk/nextjs/server";

export default clerkMiddleware ({
  // Routes that can be accessed while signed out
  // publicRoutes: [
  //   "/"
  // ],
  // // Routes that can always be accessed, and have
  // // no authentication information
  // ignoredRoutes: [""],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
