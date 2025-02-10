import mongoose from "mongoose";

const CollabSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skills: { type: [String], required: true, validate: (arr) => arr.length > 0 }, // Ensure at least one skill
  },
  { timestamps: true }
);

const Collab = mongoose.model("Collab", CollabSchema);
export default Collab;
