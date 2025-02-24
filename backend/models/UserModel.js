import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null }, // Optional for OAuth users
  bio: { type: String, default: "" },
  description: { type: String, default: "" },
  profilePic: { type: String, default: "https://via.placeholder.com/150" },
  authMethod: { type: String, default: "Local" }, // Local, Google, GitHub
});

const User = mongoose.model("User", userSchema);

export default User;