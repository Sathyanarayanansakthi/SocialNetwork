import mongoose from "mongoose";

const PatternSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileUrl: { type: String, required: true },
  name: { type: String, required: true },
  about: { type: String, required: true },
  submittedDate: { type: Date, required: true },
  guide: { type: String, required: true },
  patternDetails: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PatternModel = mongoose.model("Pattern", PatternSchema);
export default PatternModel;
