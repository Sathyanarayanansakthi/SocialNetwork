import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/patternNav";
import { Card, CardContent, Typography, Box, Link, CircularProgress } from "@mui/material";

const Pattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patterns");
        console.log("Response Data:", response.data);

        if (response.data && response.data.patterns) {
          setPatterns(response.data.patterns);
        } else if (Array.isArray(response.data)) {
          setPatterns(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        setError("Failed to fetch patterns");
        console.error("Error fetching patterns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>{/* Dark background for the whole page */}
      <PatternNav />
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: "white" }}> {/* White title */}
          Patterns
        </Typography>

        <Box sx={{ width: '100%' }}>
          {patterns.map((pattern) => (
            <Card key={pattern._id} sx={{ mb: 2, display: 'flex', flexDirection: 'column', backgroundColor: "#1e1e1e", color: "white" }}> {/* Dark card background */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: "white" }}> {/* White text */}
                  {pattern.name}
                </Typography>
                <Typography variant="body2" color="#9aa0a6" gutterBottom> {/* Lighter gray for meta */}
                  About: {pattern.about}
                </Typography>
                <Typography variant="body2" color="#9aa0a6" gutterBottom>
                  Guide: {pattern.guide}
                </Typography>
                <Typography variant="body2" color="#c5c8ce"> {/* Slightly lighter gray for details */}
                  Details: {pattern.patternDetails}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, backgroundColor: "#282828" }}> {/* Darker box for link */}
                <Link
                  href={pattern.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: "#2196f3" }} // Blue link color
                >
                  View PDF
                </Link>
              </Box>
            </Card>
          ))}
        </Box>

      </Box>
    </div>
  );
};

export default Pattern;