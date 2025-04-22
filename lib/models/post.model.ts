import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, default: 0 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentType: { type: String, enum: ["Video", "Photo"], required: true },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
