import mongoose from "mongoose";

const patternSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    name: { type: String, required: true },
    about: { type: String, required: true },
    submittedDate: { type: String, required: true },
    guide: { type: String, required: true },
    patternDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Pattern", patternSchema);
