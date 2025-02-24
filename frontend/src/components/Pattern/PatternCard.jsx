import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  CircularProgress,
  Modal,
} from "@mui/material";

const PatternCard = () => {
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
  
    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  
    return (
      <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
        <PatternNav />
        <Box sx={{ p: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 4, color: "white" }}>
            Patterns
          </Typography>
          <Box sx={{ width: "100%" }}>
            {patterns.map((pattern) => (
              <Card key={pattern._id} sx={{ mb: 2, backgroundColor: "#1e1e1e", color: "white" }}>
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", color: "white" }}>
                    {pattern.name}
                  </Typography>
                  <Typography variant="body2" color="#9aa0a6">
                    About: {pattern.about}
                  </Typography>
                  <Typography variant="body2" color="#9aa0a6">
                    Guide: {pattern.guide}
                  </Typography>
                  <Typography variant="body2" color="#c5c8ce">
                    Details: {pattern.patternDetails}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, backgroundColor: "#282828" }}>
                  <Link onClick={() => handleOpen(pattern.fileUrl)} variant="body2" sx={{ color: "#2196f3", cursor: "pointer" }}>
                    View PDF
                  </Link>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
  
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height:"80vh", bgcolor: "background.paper", boxShadow: 24, p: 1 }}>
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
export default PatternCard