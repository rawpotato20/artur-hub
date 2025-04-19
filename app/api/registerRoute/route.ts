import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { email, username, password, image, name } = await req.json();

  console.log(image);

  try {
    await connectToDb();

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      id: uuidv4(),
      email,
      username,
      personName: name,
      password: hashed,
      image,
      provider: "credentials",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
