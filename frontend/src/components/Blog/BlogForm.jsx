import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
  Modal,
} from "@mui/material";
import { toast } from "react-toastify"; // Import toast
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BlogForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setFormData((prevData) => ({ ...prevData, image: file }));
      setTimeout(() => setIsUploading(false), 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image } = formData;

    if (!title || !content || !image) {
      return toast.error("Please fill all fields before submitting.");
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("content", content);
    formDataToSend.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/blogs/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog submitted successfully!");
      setFormData({ title: "", content: "", image: null });
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Error submitting blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 16, right: 16, color: "#f44336" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" textAlign="center" mb={4} sx={{ fontWeight: 600, color: "#2D3A56" }}>
          Create a New Blog
        </Typography>

        <TextField
          label="Blog Title"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.title}
          onChange={handleChange}
          name="title"
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
          value={formData.content}
          onChange={handleChange}
          name="content"
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

        {isUploading ? (
          <CircularProgress size={50} sx={{ display: "block", margin: "auto" }} />
        ) : formData.image ? (
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
            <Avatar
              src={URL.createObjectURL(formData.image)}
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
        ) : null}

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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Blog"}
        </Button>
      </Box>
    </Modal>
  );
};

export default BlogForm;
