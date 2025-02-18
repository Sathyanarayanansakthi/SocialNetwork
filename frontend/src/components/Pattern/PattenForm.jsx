import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, TextField, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PatternForm = () => {
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
      const response = await axios.post("http://localhost:5000/api/patterns/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "File uploaded successfully!");
      setFile(null);
      setFormData({ name: "", about: "", submittedDate: "", guide: "", patternDetails: "" });
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
    setFile(null);
    setFormData({ name: "", about: "", submittedDate: "", guide: "", patternDetails: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <ToastContainer />
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: "16px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
          padding: "32px",
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 16, right: 16, color: "#f44336" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" textAlign="center" mb={4} sx={{ fontWeight: 600, color: "white" }}>
          Upload Research Paper
        </Typography>

        {[
          { label: "Name", name: "name" },
          { label: "About Paper", name: "about" },
          { label: "Submission Date", name: "submittedDate", type: "date" },
          { label: "Guide", name: "guide" },
          { label: "Pattern Details", name: "patternDetails", multiline: true, rows: 4 },
        ].map((field, index) => (
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
              bgcolor: "#282828",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#555" },
              },
              input: { color: "white" },
              label: { color: "#9aa0a6" },
            }}
          />
        ))}

        <Box
          sx={{
            border: "2px dashed #fff",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            marginBottom: "24px",
            backgroundColor: "#333",
            color: "white",
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
              color="primary"
              sx={{
                padding: "10px 24px",
                fontSize: "16px",
                textTransform: "capitalize",
                color: "white",
                borderColor: "#42a5f5",
              }}
            >
              Choose File
            </Button>
          </label>
        </Box>

        {file && (
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
            <Typography variant="body2" color="textSecondary">
              Selected File: {file.name}
            </Typography>
          </Box>
        )}

        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            padding: "12px 20px",
            fontSize: "16px",
            textTransform: "capitalize",
            fontWeight: "600",
            backgroundColor: "#2196f3",
            "&:hover": { backgroundColor: "#1976d2" },
            color: "white",
          }}
        >
          {loading ? <CircularProgress size={24} color="white" /> : "Upload"}
        </Button>
      </Box>
    </div>
  );
};

export default PatternForm;