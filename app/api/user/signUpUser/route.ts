import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const { email, password, username, image, provider, key } =
      await req.json();

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const values = {
      id: uuidv4(),
      email,
      username,
      password: hashed,
      personName: username,
      image,
      provider,
      imageKey: key,
    };

    console.log(values);

    await User.create(values);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: `Failed to create user: ${err.message}` },
      { status: 500 }
    );
  }
}
