// controllers/collabController.js
import Collab from "../models/CollabModel.js";

// @desc    Create a new collaboration
// @route   POST /api/collab
// @access  Public
export const createCollab = async (req, res) => {
  try {
    const { title, name, location, description, skills } = req.body;

    // Validate input fields
    if (!title || !name || !location || !description || !skills || skills.length === 0)  {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new collab entry
    const newCollab = new Collab({ title, name, location, description, skills });

    // Save to database
    await newCollab.save();

    res.status(201).json({ message: "Collaboration successfully created", collab: newCollab });
  } catch (error) {
    console.error("Error creating collab:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// @desc    Get all collaborations
// @route   GET /api/collab
// @access  Public
export const getAllCollabs = async (req, res) => {
  try {
    const collabs = await Collab.find().sort({ createdAt: -1 });
    res.status(200).json(collabs);
  } catch (error) {
    console.error("Error fetching collabs:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
