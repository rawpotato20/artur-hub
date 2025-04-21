import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personName: { type: String, required: true },
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
  provider: { type: String, enum: ["Credentials", "Google"], required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
