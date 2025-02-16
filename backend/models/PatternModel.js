import mongoose from "mongoose";

const patternSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true }, // Store the URL or path to the file
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pattern", patternSchema);
