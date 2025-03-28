import Event from "../models/EvenModel.js"

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      location,  
      collegeName,
      eventDescription,
      contactDetails,
      registrationLink,
    } = req.body;
    const poster = req.file ? req.file.filename : null;

    // Validate required fields
    if (!eventName || !eventType || !location || !collegeName || !eventDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse contactDetails if it's a string
    let parsedContactDetails = [];
    try {
      parsedContactDetails = contactDetails ? JSON.parse(contactDetails) : [];
    } catch (error) {
      console.error("Error parsing contactDetails:", error);
    }

    // Create a new event object
    const newEvent = new Event({
      eventName,
      eventType,
      location,
      collegeName,
      eventDescription,
      poster,
      contactDetails: parsedContactDetails,
      registrationLink,
    });

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ 
      message: "Event created successfully", 
      event: newEvent 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Fetch all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ 
      message: "Error fetching events", 
      error: error.message 
    });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ 
      message: "Error fetching event", 
      error: error.message 
    });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ 
      message: "Error deleting event", 
      error: error.message 
    });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      updates.poster = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ 
      message: "Event updated successfully", 
      event: updatedEvent 
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ 
      message: "Error updating event", 
      error: error.message 
    });
  }
};