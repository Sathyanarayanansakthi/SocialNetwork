import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/PatternNav";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  CircularProgress,
  Modal,
  Grid,
  IconButton,
} from "@mui/material";
import { Description, Close } from "@mui/icons-material";

const Pattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patterns");
        if (response.data && response.data.patterns) {
          setPatterns(response.data.patterns);
        } else {
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        setError("Failed to fetch patterns");
      } finally {
        setLoading(false);
      }
    };
    fetchPatterns();
  }, []);

  const handleOpen = (url) => {
    const fullUrl = `http://localhost:5000${url}`;
    setPdfUrl(fullUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPdfUrl(null);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
      <PatternNav />
      <Box sx={{ p: 5 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4, color: "white", textAlign: "center" }}
        >
          Patterns
        </Typography>
        <Grid container spacing={3}>
          {patterns.map((pattern) => (
            <Grid item key={pattern._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: "bold", color: "white", mb: 2 }}
                  >
                    {pattern.name}
                  </Typography>
                  <Typography variant="body2" color="#9aa0a6" sx={{ mb: 1 }}>
                    <strong>About:</strong> {pattern.about}
                  </Typography>
                  <Typography variant="body2" color="#9aa0a6" sx={{ mb: 1 }}>
                    <strong>Guide:</strong> {pattern.guide}
                  </Typography>
                  <Typography variant="body2" color="#c5c8ce">
                    <strong>Details:</strong> {pattern.patternDetails}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#282828",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    onClick={() => handleOpen(pattern.fileUrl)}
                    sx={{ color: "#2196f3" }}
                  >
                    <Description />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              title="PDF Viewer"
              style={{ border: "none" }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Pattern;