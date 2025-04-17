import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: {
    type: String,
    required: true,
    default: "@/public/other/default_profile_icon.png",
  },
  bio: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  signedIn: { type: Boolean, default: false, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
