import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/PatternNav";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Modal,
  Grid,
  IconButton,
} from "@mui/material";
import { Description, Close } from "@mui/icons-material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Pattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/patterns`);
        setPatterns(response.data.patterns || []);
      } catch (err) {
        setError("Failed to fetch patterns");
      } finally {
        setLoading(false);
      }
    };
    fetchPatterns();
  }, []);

  const handleOpen = (url) => {
    if (!url) {
      setError("PDF URL is missing");
      return;
    }
    setPdfUrl(`${API_URL}${url}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPdfUrl(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", color: "black", minHeight: "100vh" }}>
      <PatternNav />
      <Box sx={{ p: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          Patterns
        </Typography>
        <Grid container spacing={3}>
          {patterns.map((pattern) => (
            <Grid item key={pattern._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    {pattern.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>About:</strong> {pattern.about}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Guide:</strong> {pattern.guide}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Details:</strong> {pattern.patternDetails}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, backgroundColor: "#f1f1f1", textAlign: "right" }}>
                  <IconButton onClick={() => handleOpen(pattern.fileUrl)} sx={{ color: "#007BFF" }}>
                    <Description />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PDF Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80vh",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, backgroundColor: "#eee" }}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="100%" style={{ border: "none" }} />
          ) : (
            <Typography variant="body1" color="error" textAlign="center" p={2}>
              PDF could not be loaded.
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Pattern;