import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    // Decode without verifying to get email/id
    let decoded: any;
    try {
      decoded = jwt.decode(refreshToken);
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

    const cookie = serialize("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
