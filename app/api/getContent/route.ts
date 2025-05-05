import { connectToDb } from "@/lib/mongoose";
import "@/lib/models/user.model";
import Post from "@/lib/models/post.model";
import "@/lib/models/comment.model";

export async function GET(req: Request) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");

    if (_id) {
      const post = await Post.findOne({ _id: _id })
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "personName image",
          },
        });

      if (!post) {
        return new Response(JSON.stringify({ message: "Post not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ post }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // No id provided — return all posts
    const posts = await Post.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "personName image",
        },
      });

    if (posts.length === 0) {
      return new Response(JSON.stringify({ message: "No content found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch content error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch content", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
