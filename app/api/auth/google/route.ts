import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();
    if (!credential) {
      return NextResponse.json({ error: "Missing credential" }, { status: 400 });
    }

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 400 });
    }

    const { email, sub: googleId, name, picture } = payload;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Sign up
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name,
          role: "ADMIN", // Default role for new users in this app
        },
      });
    } else if (!user.googleId) {
      // Link Google account to existing email user
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      });
    }

    // Create session
    const session = await getSession();
    session.username = user.name || user.email.split("@")[0];
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}
