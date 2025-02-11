import React, { useEffect, useState } from 'react';
import CollabNav from "../components/Collab/CollabNav";
import axios from "axios";
import { Container, Typography, Paper, List, ListItem, ListItemText, Chip, Box, CircularProgress, Alert, Button, Avatar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Share as ShareIcon } from "@mui/icons-material";

const Collab = () => {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/collab");
        setCollabs(response.data);
      } catch (error) {
        setError("Error fetching collaborations. Please try again later.");
        console.error("Error fetching collaborations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollabs();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleShare = (id) => {
    const shareableLink = `${window.location.origin}/collab/${id}`;
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <CollabNav />
      <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0056b3", mb: 4, textAlign: "center" }}>
          Explore Collaborations
        </Typography>
        <List>
          {collabs.map((collab) => (
            <motion.div whileHover={{ scale: 1.02 }} key={collab._id}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: "#f9f9f9", transition: "0.3s", '&:hover': { boxShadow: 6 }, mb: 3 }}>
                <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar alt={collab.name} src={collab.profileImage} sx={{ width: 56, height: 56, mr: 2 }} />
                  <ListItemText
                    primary={<Typography variant="h5" sx={{ fontWeight: 700, color: "#004080" }}>{collab.title}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          <strong>Published on:</strong> {new Date(collab.publishedAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body1"><strong>Name:</strong> {collab.name}</Typography>
                        <Typography variant="body1"><strong>Location:</strong> {collab.location}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {expanded[collab._id] ? collab.description : `${collab.description.slice(0, 100)}...`}
                        </Typography>
                        <Button size="small" onClick={() => toggleExpand(collab._id)} sx={{ color: "#0077b5" }}>
                          {expanded[collab._id] ? "Read Less" : "Read More"}
                        </Button>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, color: "#333" }}>
                          Skills Required:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                          {collab.skills.map((skill, index) => (
                            <Chip key={index} label={skill} sx={{ bgcolor: "#0077b5", color: "#fff" }} />
                          ))}
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                          <IconButton onClick={() => handleShare(collab._id)} sx={{ color: "#0077b5" }}>
                            <ShareIcon />
                          </IconButton>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            </motion.div>
          ))}
        </List>
      </Container>
    </motion.div>
  );
};

export default Collab;
