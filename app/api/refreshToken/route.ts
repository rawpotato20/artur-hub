import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { refreshToken, signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const cookieStore = await cookies();
    const oldRefreshToken = cookieStore.get("refresh_token")?.value;

    if (!oldRefreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    // Decode without verifying to get email/id
    let decoded: any;
    try {
      decoded = jwt.decode(oldRefreshToken);
    } catch {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const user = await User.findOne({ id: decoded.id });

    if (!user) {
      return NextResponse.json(
        { message: "User not found or no refresh token stored" },
        { status: 404 }
      );
    }

    // If valid, generate a new access token
    const newAccessToken = signToken({ id: user.id, email: user.email });
    const newRefreshToken = refreshToken({ id: user.id, email: user.email });

    const activeCookie = serialize("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    const refreshCookie = serialize("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    const headers = new Headers();
    headers.append("Set-Cookie", activeCookie);
    headers.append("Set-Cookie", refreshCookie);
    headers.set("Content-Type", "application/json");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
