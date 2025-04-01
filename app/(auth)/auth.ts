import { compare } from "bcrypt-ts";
import NextAuth, { type User, type Session } from "next-auth";
import Github from "next-auth/providers/github";
import Okta from "next-auth/providers/okta";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/lib/db/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);
        if (users.length === 0) return null;
        // biome-ignore lint: Forbidden non-null assertion.
        const passwordsMatch = await compare(password, users[0].password!);
        if (!passwordsMatch) return null;
        return users[0] as any;
      },
    }),
    Github,
    // Okta({
    //   clientId: process.env.OKTA_CLIENT_ID,
    //   clientSecret: process.env.OKTA_CLIENT_SECRET,
    //   issuer: process.env.OKTA_ISSUER,
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
