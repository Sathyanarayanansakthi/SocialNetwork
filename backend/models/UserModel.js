import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // Optional for OAuth users
    accessToken: { type: String, default: null }, // Store Access Token
    refreshToken: { type: String, default: null }, // Store Refresh Token
});

const User = mongoose.model("User", userSchema);

export default User;
