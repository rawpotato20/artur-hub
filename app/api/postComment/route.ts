import { connectToDb } from "@/lib/mongoose";
import Comment from "@/lib/models/comment.model";
import Post from "@/lib/models/post.model";

export async function POST(req: Request) {
  try {
    await connectToDb();
    const { content, userId, key } = await req.json();

    if (!content || !userId) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newComment = await Comment.create({
      content: content,
      user: userId,
    });

    // Optional: Push the comment into post's comments array if needed
    await Post.findOneAndUpdate(
      { key }, // key is your custom field
      { $push: { comments: newComment._id } }
    );

    return new Response(JSON.stringify({ comment: newComment }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error posting comment:", err);
    return new Response(JSON.stringify({ message: "Failed to post comment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
