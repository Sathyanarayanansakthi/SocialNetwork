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
  TextField as MuiTextField,
} from "@mui/material";
import axios from "axios";

const ForumCreation = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [manualTags, setManualTags] = useState("");

  const predefinedTags = [
    "Web Development",
    "Android Development",
    "Git",
    "GitHub",
    "GitLab",
    "GitBucket",
    "Java",
    "Python",
    "JavaScript",
    "C",
    "C++",
    "C#",
    "Game Development",
    "Cloud",
    "MongoDB",
    "Frontend",
    "Backend",
    "React",
    "React Native",
    "Angular",
    "AngularJS",
    "Tailwind CSS",
    "MUI",
    "ReactJS",
    "PasswordJS",
    "Docker",
    "Other",
  ];

  const handleTagChange = (event, newTags) => {
    setTags(newTags);
  };

  const handleSubmit = async () => {
    const allTags = [
      ...tags,
      ...manualTags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    ];

    const postData = {
      title,
      content,
      tags: allTags,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/posts", postData);
      console.log("Post created successfully:", response.data);
      handleClose();
      setTitle(""); // Clear form fields after successful submission
      setContent("");
      setTags([]);
      setManualTags("");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error, e.g., display a snackbar message
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { bgcolor: "#1e1e1e", color: "white" } }}
    >
      <DialogTitle sx={{ bgcolor: "#282828" }}>
        <Typography variant="h5" color="white">
          Ask a Question
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#1e1e1e" }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
            InputLabelProps={{ style: { color: "#9aa0a6" } }}
            InputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#555" },
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }} color="white">
            Question Body
          </Typography>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "200px", backgroundColor: "#282828", color: "white" }}
            theme="snow"
          />
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 3 }} color="white">
            Tags
          </Typography>
          <Autocomplete
            multiple
            id="tags-autocomplete"
            options={predefinedTags}
            value={tags}
            onChange={handleTagChange}
            renderInput={(params) => (
              <MuiTextField
                {...params}
                label="Select Tags"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "#9aa0a6" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#333" },
                    "&:hover fieldset": { borderColor: "#555" },
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option} style={{ backgroundColor: "#282828", color: "white" }}>
                {option}
              </li>
            )}
          />
        </Box>

        {tags.includes("Other") && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ mb: 2 }} color="white">
              Add Custom Tags (comma separated)
            </Typography>
            <TextField
              label="Custom Tags"
              variant="outlined"
              fullWidth
              value={manualTags}
              onChange={(e) => setManualTags(e.target.value)}
              placeholder="e.g. Custom Tag 1, Custom Tag 2"
              InputLabelProps={{ style: { color: "#9aa0a6" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#555" },
                },
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#282828" }}>
        <Button onClick={handleClose} color="secondary" sx={{ color: "white" }}>
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#2196f3",
            "&:hover": { bgcolor: "#1976d2" },
            color: "white",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForumCreation;