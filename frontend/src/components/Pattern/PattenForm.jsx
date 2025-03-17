import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const PatternForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    submittedDate: "",
    guide: "",
    patternDetails: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!file || Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields and select a PDF file");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("pdfFile", file);
    for (const key in formData) {
      uploadFormData.append(key, formData[key]);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/patterns/upload",
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message || "File uploaded successfully!");
      setFile(null);
      setFormData({
        name: "",
        about: "",
        submittedDate: "",
        guide: "",
        patternDetails: "",
      });
    } catch (error) {
      console.error("Upload Error:", error);
      if (error.response) {
        toast.error(error.response.data.error || "Upload failed. Server Error.");
      } else if (error.request) {
        toast.error("Upload failed. No response from server.");
      } else {
        toast.error(error.message || "Upload failed. Check your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer />
      <Paper
        elevation={6}
        sx={{
          padding: "32px",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          position: "relative",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 16, right: 16, color: "#d32f2f" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Form title */}
        <Typography
          variant="h5"
          textAlign="center"
          mb={4}
          sx={{ fontWeight: 600, color: "#333" }}
        >
          Upload Research Paper
        </Typography>

        {/* Form fields */}
        {[{ label: "Name", name: "name" },
          { label: "About Paper", name: "about" },
          { label: "Submission Date", name: "submittedDate", type: "date" },
          { label: "Guide", name: "guide" },
          { label: "Pattern Details", name: "patternDetails", multiline: true, rows: 4 }]
          .map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            name={field.name}
            fullWidth
            variant="outlined"
            value={formData[field.name]}
            onChange={handleChange}
            type={field.type || "text"}
            multiline={field.multiline || false}
            rows={field.rows || 1}
            sx={{
              marginBottom: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#999" },
              },
              input: { color: "#333" },
              label: { color: "#666" },
            }}
          />
        ))}

        {/* File upload section */}
        <Box
          sx={{
            border: "2px dashed #999",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            marginBottom: "24px",
            backgroundColor: "#f9f9f9",
            color: "#666",
            cursor: "pointer",
          }}
        >
          <Typography variant="body2" color="textSecondary" mb={1}>
            Drag & Drop a PDF or Click to Select
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
              sx={{
                padding: "10px 24px",
                fontSize: "16px",
                textTransform: "capitalize",
                color: "#1976d2",
                borderColor: "#1976d2",
              }}
            >
              Choose File
            </Button>
          </label>
        </Box>

        {/* Display selected file name */}
        {file && (
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
            <Typography variant="body2" color="textSecondary">
              Selected File: <strong>{file.name}</strong>
            </Typography>
          </Box>
        )}

        {/* Upload button */}
        <Button
          onClick={handleUpload}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            padding: "12px 20px",
            fontSize: "16px",
            textTransform: "capitalize",
            fontWeight: "600",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            color: "white",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
        </Button>
      </Paper>
    </div>
  );
};

export default PatternForm;
