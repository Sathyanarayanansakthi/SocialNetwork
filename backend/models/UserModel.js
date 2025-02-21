import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null }, // Optional for OAuth users
  accessToken: { type: String, default: null }, // Store OAuth access token
  refreshToken: { type: String, default: null }, // Store OAuth refresh token
  authMethod: { type: String, default: "Local" }, // Local, Google, GitHub
  profilePic: { type: String, default: "" }, // For profile pictures from OAuth
});

const User = mongoose.model("User", userSchema);

export default User;
