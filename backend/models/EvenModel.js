import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    location: { type: String, required: true },
    collegeName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    poster: { type: String }, // Optional field
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;