import React, { useState } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import the default style for Quill
import { Button, TextField, Typography, Box, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForumCreation = () => {
  const [title, setTitle] = useState(""); // State for question title
  const [content, setContent] = useState("Start writing your question here..."); // State for question content
  const [tags, setTags] = useState(""); // State for tags

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = () => {
    console.log("Question Title:", title);
    console.log("Question Content:", content);
    console.log("Tags:", tags);
    alert("Your question has been submitted! Check the console for data.");
    // Send this data to your backend (Express + MongoDB)
  };

  const handleClose = () => {
    // Navigate back to the previous page
    navigate(-1); // `-1` tells react-router-dom to go back one step in history
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>
            Ask a Question
          </Typography>

          {/* Close Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ textTransform: "capitalize" }}
          >
            Close
          </Button>
        </Box>

        {/* Question Title */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
            sx={{ backgroundColor: "#f9f9f9" }}
          />
        </Box>

        {/* Question Body */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Question Body
          </Typography>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Type your question content here..."
            style={{ height: "300px", border: "1px solid #ddd", borderRadius: "8px" }}
          />
        </Box>

        {/* Tags */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={handleTagsChange}
            placeholder="e.g. JavaScript, React, CSS"
            sx={{ backgroundColor: "#f9f9f9" }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Separate tags with commas.
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              paddingX: 4,
              paddingY: 2,
              fontSize: "16px",
              textTransform: "capitalize",
              fontWeight: "600",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
            }}
          >
            Submit Question
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForumCreation;
