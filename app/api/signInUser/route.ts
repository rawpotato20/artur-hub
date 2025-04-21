"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { refreshToken, signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export async function POST(req: Request) {
  await connectToDb();

  console.log(req.method);

  if (req.method == "POST") {
    try {
      const { email, password } = await req.json();

      const user = await User.findOne({ email });

      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          { status: 401 }
        );
      }

      const token = signToken({ id: user.id, email: user.email });

      const cookie = serialize("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      });

      const refreshTokenValue = refreshToken({
        id: user.id,
        email: user.email,
      });

      const refreshCookie = serialize("refresh_token", refreshTokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      const headers = new Headers();
      headers.append("Set-Cookie", cookie);
      headers.append("Set-Cookie", refreshCookie);
      headers.set("Content-Type", "application/json");

      return new Response(
        JSON.stringify({
          message: "User signed in successfully",
        }),
        {
          status: 200,
          headers,
        }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({ message: `Failed to sign in user: ${err.message}` }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }
}
