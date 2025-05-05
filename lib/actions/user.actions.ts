"use server";

import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { refreshToken, signToken } from "../jwt";
import { serialize } from "cookie";

interface RegisterProps {
  email: string;
  password: string;
  username: string;
  image: string;
  provider: string;
}

interface SignInProps {
  email: string;
  password: string;
}

// export async function registerUser({
//   email,
//   password,
//   username,
//   image,
//   provider,
// }: RegisterProps) {
//   const hashed = await bcrypt.hash(password, 10);

//   const values = {
//     id: uuidv4(),
//     email: email,
//     username: username,
//     password: hashed,
//     personName: username,
//     image: image,
//     provider: provider,
//   };

//   try {
//     await connectToDb();

//     const userExists = await User.findOne({ $or: [{ email }, { username }] });

//     if (userExists) {
//       return { success: false, message: "User already exists" };
//     }

//     await User.create(values);

//     return { success: true };
//   } catch (err: any) {
//     throw new Error(`Failed to create user: ${err.message}`);
//   }
// }

// export async function signInUser({ email, password }: SignInProps) {
//   try {
//     await connectToDb();

//     const user = await User.findOne({ email });

//     if (!user) {
//       return { success: false, message: "User not found" };
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return { success: false, message: "Invalid credentials" };
//     }

//     const token = signToken({ id: user.id, email: user.email });

//     const cookie = serialize("access_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 15 * 60, // 15 minutes
//       path: "/",
//     });

//     const refreshTokenValue = refreshToken({
//       id: user.id,
//       email: user.email,
//     });

//     const hashedRefreshToken = await bcrypt.hash(refreshTokenValue, 10);

//     await User.updateOne(
//       { email: user.email },
//       { $set: { refreshToken: hashedRefreshToken } }
//     );

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
//     });
//   } catch (err: any) {
//     throw new Error(`Failed to sign in user: ${err.message}`);
//   }
// }
