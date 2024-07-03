import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)' ,'/','/api/uploadthing(.*)','/profile/(.*)' ,'/api/(.*)' ]);

export default clerkMiddleware((auth, request) => {
  // console.log('Request URL:', request.url); // Log the request URL
  // console.log('Is public route:', isPublicRoute(request)); // Log if it's a public route
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};