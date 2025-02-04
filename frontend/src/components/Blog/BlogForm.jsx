import { Container, Typography, Box, TextField, Button, IconButton, Avatar, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";  // Import Close icon
import { useState } from "react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // State for storing the uploaded image
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

  // Close button logic (for example, navigating back to the blog list page)
  const handleCloseForm = () => {
    // You can implement closing behavior here, such as redirecting
    // or just clearing the form (optional).
    console.log("Form closed");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",  // Subtle background color for the page
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit} // Handle form submission
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={handleCloseForm} // Implement the close behavior
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#f44336",
            fontSize: "1.5rem",
          }}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          component={Link}
          to="/blog" // Navigate back to the Blog page
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#3f51b5",
            fontSize: "1.5rem",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{ fontWeight: 600, color: "#2D3A56" }}
        >
          Create a New Blog
        </Typography>

        <TextField
          label="Blog Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          sx={{
            marginBottom: "16px",
            bgcolor: "#f7f7f7",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E0E0E0",
              },
              "&:hover fieldset": {
                borderColor: "#3f51b5",
              },
            },
          }}
        />

        <TextField
          label="Content"
          type="text"
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={handleContentChange}
          variant="outlined"
          sx={{
            marginBottom: "16px",
            bgcolor: "#f7f7f7",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E0E0E0",
              },
              "&:hover fieldset": {
                borderColor: "#3f51b5",
              },
            },
          }}
        />

        {/* Image upload section */}
        <Box
          sx={{
            border: "2px dashed #42a5f5",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            marginBottom: "24px",
            backgroundColor: "#f0f8ff",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e0f7fa",
            },
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
              sx={{
                padding: "10px 24px",
                fontSize: "16px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
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
            <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
              <Avatar
                src={image} // Use the temporary URL as the image source
                alt="Blog Image Preview"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  borderRadius: "8px",
                  marginBottom: "12px",
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
          sx={{
            padding: "12px 20px",
            fontSize: "16px",
            textTransform: "capitalize",
            fontWeight: "600",
            boxShadow: "none",
          }}
        >
          Submit Blog
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
