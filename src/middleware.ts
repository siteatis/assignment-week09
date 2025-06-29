import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// All private apart from sign-in & sign-up page... // TODO: and public forum
const isPublic = createRouteMatcher([
  "/signup(.*)",
  "/signin(.*)",
  "/forum(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
