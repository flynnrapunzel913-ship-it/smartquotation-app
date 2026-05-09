import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  username?: string;
  isLoggedIn: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "dev-only-unsafe-change-me-in-production-use-32-chars",
  cookieName: "smartquotation_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session;
}

export async function requireUser(): Promise<{ username: string }> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.username) {
    throw new Error("Unauthorized");
  }
  return { username: session.username };
}
