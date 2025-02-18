import Event from '../models/EvenModel.js'

export const createEvent = async (req, res) => {
  try {
    const { eventName, eventType, location, collegeName, eventDescription } = req.body;
    const poster = req.file ? req.file.path : null;  // Handle the poster

    console.log("Request Body from Frontend:", req.body); // **DEBUG: Log received data**
    console.log("Uploaded File:", req.file); // **DEBUG: Log uploaded file info**

    if (!eventName || !eventType || !location || !collegeName || !eventDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      eventName,
      eventType,
      location,
      collegeName,
      eventDescription,
      poster,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error in createEvent:", error);
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};
