import NextAuth from "next-auth";

import { authConfig } from "@/app/(auth)/auth.config";

export default NextAuth(authConfig).auth;

// import { NextRequest, NextResponse } from "next/server";
// import getSession from "./lib/session";

// interface Routes {
//   [key: string]: boolean;
// }

// const publicOnlyUrls: Routes = {
//   "/": true,
//   "/login": true,
//   "/create-account": true,
//   "/github/start": true,
//   "/github/complete": true,
// };

// export async function middleware(request: NextRequest) {
//   const session = await getSession();
//   const exists = publicOnlyUrls[request.nextUrl.pathname];
//   if (!session.id) {
//     if (!exists) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   } else {
//     if (exists) {
//       return NextResponse.redirect(new URL("/chat", request.url));
//     }
//   }
// }

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// export const config = {
//   matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
// };
