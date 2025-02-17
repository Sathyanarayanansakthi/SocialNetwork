import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/patternNav";
import { Card, CardContent, Typography, Grid, Box, Link, CircularProgress } from "@mui/material"; // Import Typography

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
    <div>
      <PatternNav />
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Patterns
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {patterns.map((pattern) => (
            <Grid item xs={12} sm={6} md={4} key={pattern._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {pattern.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    About: {pattern.about}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Guide: {pattern.guide}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Details: {pattern.patternDetails}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Link
                    href={pattern.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                  >
                    View PDF
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Pattern;