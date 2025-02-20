import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/patternNav";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  CircularProgress,
  Modal,
  Button,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Pattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleOpen = (url) => {
    setPdfUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPageNumber(1); // Reset page number when modal is closed
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
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error("PDF load error:", error);
            }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Page {pageNumber} of {numPages}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <Button onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages}>
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Pattern;