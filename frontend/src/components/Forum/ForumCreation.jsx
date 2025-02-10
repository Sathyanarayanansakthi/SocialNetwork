import React, { useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from "@mui/material";

const ForumCreation = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Start writing your question here...");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    console.log("Question Title:", title);
    console.log("Question Content:", content);
    console.log("Tags:", tags);
    alert("Your question has been submitted!");
    handleClose(); // Close popup after submission
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Ask a Question</DialogTitle>
      <DialogContent dividers>
        {/* Question Title */}
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

        {/* Question Body */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Question Body
          </Typography>
          <ReactQuill value={content} onChange={setContent} style={{ height: "200px" }} />
        </Box>

        {/* Tags */}
        <Box sx={{ mt: 10 }}>
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. JavaScript, React, CSS"
          />
        </Box>
      </DialogContent>

      {/* Buttons */}
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
