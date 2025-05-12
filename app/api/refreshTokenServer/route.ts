import { verify, decode } from "jsonwebtoken";
import { serialize } from "cookie";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { refreshToken, signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectToDb();

    // Get refresh token from headers
    const oldRefreshToken = req.headers.get("x-refresh-token");

    if (!oldRefreshToken) {
      return new Response(JSON.stringify({ message: "No refresh token" }), {
        status: 401,
      });
    }

    // Decode (not verify) to get user ID/email
    let decoded: any;
    try {
      decoded = decode(oldRefreshToken);
    } catch {
      return new Response(
        JSON.stringify({ message: "Invalid refresh token" }),
        {
          status: 403,
        }
      );
    }

    const user = await User.findOne({ id: decoded?.id });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Generate new tokens
    const newAccessToken = signToken({ id: user.id, email: user.email });
    const newRefreshToken = refreshToken({ id: user.id, email: user.email });

    // Serialize new cookies
    const accessCookie = serialize("access_token", newAccessToken, {
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
    headers.append("Set-Cookie", accessCookie);
    headers.append("Set-Cookie", refreshCookie);
    headers.set("Content-Type", "application/json");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
