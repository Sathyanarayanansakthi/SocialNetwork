import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from "@mui/material";

const ForumCreation = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
        tags
      });

      console.log("Response:", response.data);
      alert("Your question has been submitted!");
      handleClose();
    } catch (error) {
      console.error("Error submitting question:", error.response?.data || error.message);
      alert("Error submitting question!");
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

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Question Body</Typography>
          <ReactQuill value={content} onChange={setContent} style={{ height: "200px" }} />
        </Box>

        <Box sx={{ mt: 3 }}>
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

      <DialogActions>
        <Button onClick={handleClose} color="secondary">Close</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForumCreation;
