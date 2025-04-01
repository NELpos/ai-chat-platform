import { getIronSession } from "iron-session";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>((cookies() as unknown as UnsafeUnwrappedCookies), {
    cookieName: "ai-chat",
    password: process.env.COOKIE_PASSWORD!,
  });
}
