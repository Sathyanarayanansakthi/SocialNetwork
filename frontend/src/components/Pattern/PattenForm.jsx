import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, TextField, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PatternForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [guide, setGuide] = useState("");
  const [patternDetails, setPatternDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !about || !submittedDate || !guide || !patternDetails) {
      toast.error("Please fill in all fields and select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("name", name);
    formData.append("about", about);
    formData.append("submittedDate", submittedDate);
    formData.append("guide", guide);
    formData.append("patternDetails", patternDetails);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/patterns/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "File uploaded successfully!");
      setFile(null);
      setName("");
      setAbout("");
      setSubmittedDate("");
      setGuide("");
      setPatternDetails("");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.error || error.message || "An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setName("");
    setAbout("");
    setSubmittedDate("");
    setGuide("");
    setPatternDetails("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <ToastContainer />
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 16, right: 16, color: "#f44336" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" textAlign="center" mb={4} sx={{ fontWeight: 600, color: "#2D3A56" }}>
          Upload Research Paper
        </Typography>

        <TextField label="Name" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} sx={{ marginBottom: "16px", bgcolor: "#f7f7f7", borderRadius: "8px" }} />
        <TextField label="About Paper" fullWidth variant="outlined" value={about} onChange={(e) => setAbout(e.target.value)} sx={{ marginBottom: "16px", bgcolor: "#f7f7f7", borderRadius: "8px" }} />
        <TextField label="Submission Date" type="date" fullWidth variant="outlined" value={submittedDate} onChange={(e) => setSubmittedDate(e.target.value)} sx={{ marginBottom: "16px", bgcolor: "#f7f7f7", borderRadius: "8px" }} />
        <TextField label="Guide" fullWidth variant="outlined" value={guide} onChange={(e) => setGuide(e.target.value)} sx={{ marginBottom: "16px", bgcolor: "#f7f7f7", borderRadius: "8px" }} />
        <TextField label="Pattern Details" fullWidth variant="outlined" multiline rows={4} value={patternDetails} onChange={(e) => setPatternDetails(e.target.value)} sx={{ marginBottom: "16px", bgcolor: "#f7f7f7", borderRadius: "8px" }} />

        <Box sx={{ border: "2px dashed #42a5f5", borderRadius: "8px", padding: "16px", textAlign: "center", marginBottom: "24px", backgroundColor: "#f0f8ff" }}>
          <Typography variant="body2" color="textSecondary" mb={1}>Drag & Drop a PDF or Click to Select</Typography>
          <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span" color="primary" sx={{ padding: "10px 24px", fontSize: "16px", textTransform: "capitalize" }}>Choose File</Button>
          </label>
        </Box>

        {file && (
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
            <Typography variant="body2" color="textSecondary">Selected File: {file.name}</Typography>
          </Box>
        )}

        <Button onClick={handleUpload} variant="contained" color="primary" fullWidth sx={{ padding: "12px 20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "600" }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Box>
    </div>
  );
};

export default PatternForm;