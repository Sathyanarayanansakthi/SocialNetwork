import { Container, Typography, Box, TextField, Button, IconButton, Avatar, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);  // State for storing the uploaded image
  const [isUploading, setIsUploading] = useState(false); // State to track the upload status

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Set uploading state to true while processing
      setImage(URL.createObjectURL(file)); // Create a temporary URL for the uploaded image

      // Simulate a delay for upload (for example, a network request)
      setTimeout(() => {
        setIsUploading(false); // Reset uploading state after image is processed
      }, 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the data (including the image) to an API here
    console.log("Blog Created:", { title, content, image });

    // Reset the form after submission (optional)
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit} // Handle form submission
        sx={{
          backgroundColor: "rgba(200, 355, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          width: "100%",
          maxWidth: "500px",
          position: "relative",
        }}
      >
        <IconButton
          component={Link}
          to="/blog" // Navigate back to the Blog page
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "#f44336",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" mb={3}>
          Create a New Blog
        </Typography>
        
        <TextField
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Content"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleContentChange}
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        
        {/* Image upload section */}
        <Box
          sx={{
            border: "2px dashed #42a5f5",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="body2" color="textSecondary" mb={1}>
            Drag & Drop an Image or Click to Select
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              color="primary"
              sx={{ padding: "10px", fontSize: "16px" }}
            >
              Choose Image
            </Button>
          </label>
        </Box>

        {/* Image preview with loading indication */}
        {isUploading ? (
          <CircularProgress size={50} sx={{ display: "block", margin: "auto" }} />
        ) : (
          image && (
            <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
              <Avatar
                src={image} // Use the temporary URL as the image source
                alt="Blog Image Preview"
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <Typography variant="body2" color="textSecondary">
                Image Preview
              </Typography>
            </Box>
          )
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "10px", fontSize: "16px" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
