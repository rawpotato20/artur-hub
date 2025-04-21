import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const cookies = req.headers.get("cookie") || "";
  const refreshToken = cookies
    .split(";")
    .find((c) => c.trim().startsWith("refresh_token="))
    ?.split("=")[1];

  if (!refreshToken) {
    return new Response(JSON.stringify({ message: "No refresh token" }), {
      status: 401,
    });
  }

  try {
    await connectToDb();

    const payload: any = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const user = await User.findOne({ id: payload.id });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new Error("Invalid refresh token");

    // Refresh token is valid, send a new access token
    const newAccessToken = signToken({ id: user.id, email: user.email });
    const accessCookie = serialize("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": accessCookie },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 403,
    });
  }
}
