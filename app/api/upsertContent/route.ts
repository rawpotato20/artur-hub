import { connectToDb } from "@/lib/mongoose";
import Post from "@/lib/models/post.model";

export async function POST(req: Request): Promise<Response> {
  await connectToDb();

  const params = await req.json();
  try {
    const existing = await Post.findOne({ key: params.key });

    if (existing) {
      await Post.findOneAndUpdate(
        { key: params.key },
        {
          $set: {
            title: params.title,
            content: params.content,
            thumbnail: params.thumbnail,
            contentType: params.contentType,
            user: params.user,
          },
          $addToSet: {
            tags: { $each: params.tags || [] },
            comments: { $each: params.comments || [] },
          },
        },
        { new: true }
      );

      return new Response(
        JSON.stringify({
          message: "Post updated successfully",
          key: params.key,
          updated: true,
          created: false,
        }),
        { status: 200 }
      );
    } else {
      await Post.create(params);

      return new Response(
        JSON.stringify({
          message: "Post created successfully",
          key: params.key,
          updated: false,
          created: true,
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Upsert failed:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        key: params.key,
        updated: false,
        created: false,
      }),
      { status: 500 }
    );
  }
}
