import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongoose"; // adjust your path
import Post from "@/lib/models/post.model"; // your content schema model

export async function POST(req: Request) {
  try {
    await connectToDb();

    const DATA = await req.json();

    const newPost = new Post({
      url: DATA.url,
      title: DATA.title,
      tags: DATA.tags,
      content: DATA.content,
      contentType: DATA.contentType,
      user: DATA.userId,
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Content uploaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to upload content" },
      { status: 500 }
    );
  }
}
