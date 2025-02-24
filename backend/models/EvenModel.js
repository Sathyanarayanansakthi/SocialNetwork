import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    location: { type: String, required: true },
    collegeName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    poster: { type: String }, // Stores the file name
    contactDetails: [
      {
        type: { type: String, required: true }, // e.g., email, phoneNumber, website
        value: { type: String, required: true }, // e.g., example@example.com, +1234567890
      },
    ],
    registrationLink: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;