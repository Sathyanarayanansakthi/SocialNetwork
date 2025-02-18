import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Autocomplete, TextField as MuiTextField } from "@mui/material";
import axios from "axios";

const ForumCreation = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [manualTags, setManualTags] = useState("");

  // Predefined tags including "Other"
  const predefinedTags = [
    "Web Development", "Android Development", "Git", "GitHub", "GitLab", "GitBucket",
    "Java", "Python", "JavaScript", "C", "C++", "C#", "Game Development", "Cloud", 
    "MongoDB", "Frontend", "Backend", "React", "React Native", "Angular", "AngularJS", 
    "Tailwind CSS", "MUI", "ReactJS", "PasswordJS", "Docker", "Other"
  ];

  const handleTagChange = (event, newTags) => {
    setTags(newTags);
  };

  const handleSubmit = async () => {
    // Combine predefined tags and manual tags, ensuring they are properly split and trimmed
    const allTags = [
      ...tags,
      ...manualTags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    ];

    // Create the post data to be sent to the backend
    const postData = {
      title,
      content,
      tags: allTags,
    };

    try {
      // Send POST request to the backend to create a post
      const response = await axios.post("http://localhost:5000/api/posts", postData);
      console.log("Post created successfully:", response.data);

      // Close the dialog on successful post creation
      handleClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Ask a Question</DialogTitle>
      <DialogContent dividers>
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

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Question Body</Typography>
          <ReactQuill value={content} onChange={setContent} style={{ height: "200px" }} />
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Tags</Typography>
          <Autocomplete
            multiple
            id="tags-autocomplete"
            options={predefinedTags}
            value={tags}
            onChange={handleTagChange}
            renderInput={(params) => (
              <MuiTextField {...params} label="Select Tags" variant="outlined" fullWidth />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
        </Box>

        {/* Show custom tags input only if "Other" is selected */}
        {tags.includes("Other") && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h6" sx={{ mb: 10 }}>Add Custom Tags (comma separated)</Typography>
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

      <DialogActions>
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
