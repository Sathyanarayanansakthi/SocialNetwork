import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const ForumCreation = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [manualTags, setManualTags] = useState("");

  const predefinedTags = [
    "Web Development", "Android Development", "Git", "GitHub", "GitLab",
    "Java", "Python", "JavaScript", "C", "C++", "C#", "Game Development",
    "Cloud", "MongoDB", "Frontend", "Backend", "React", "React Native",
    "Angular", "Tailwind CSS", "MUI", "Docker", "Other"
  ];

  const handleTagChange = (event, newTags) => setTags(newTags);

  const handleSubmit = async () => {
    const allTags = [...tags, ...manualTags.split(",").map(tag => tag.trim()).filter(tag => tag)];
    const postData = { title, content, tags: allTags };

    try {
      await axios.post("http://localhost:5000/api/posts", postData);
      handleClose();
      setTitle("");
      setContent("");
      setTags([]);
      setManualTags("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "#f5f5f5", fontWeight: "bold", textAlign: "center" }}>
        Ask a Question
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#ffffff" }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Question Body
          </Typography>
          <ReactQuill value={content} onChange={setContent} style={{ height: "200px" }} theme="snow" />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Tags
          </Typography>
          <Autocomplete
            multiple
            options={predefinedTags}
            value={tags}
            onChange={handleTagChange}
            renderInput={(params) => <TextField {...params} label="Select Tags" variant="outlined" fullWidth />}
          />
        </Box>

        {tags.includes("Other") && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Add Custom Tags (comma separated)
            </Typography>
            <TextField
              label="Custom Tags"
              variant="outlined"
              fullWidth
              value={manualTags}
              onChange={(e) => setManualTags(e.target.value)}
              placeholder="e.g. Custom Tag 1, Custom Tag 2"
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#f5f5f5", p: 2 }}>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForumCreation;