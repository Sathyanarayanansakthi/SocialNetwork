import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";

const Collabform = () => {
  const [skills, setSkills] = useState([]);

  const handleSkillChange = (event) => {
    setSkills(event.target.value);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, p: 6, boxShadow: 10, borderRadius: 3, bgcolor: "white" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#0A3D91' }}>
          Job Collaboration Form
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form>
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ bgcolor: "#f5f5f5" }}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Type</InputLabel>
            <Select defaultValue="" variant="outlined" sx={{ bgcolor: "#f5f5f5" }}>
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ bgcolor: "#f5f5f5" }}
          />

          <TextField
            label="Location"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ bgcolor: "#f5f5f5" }}
          />

          <TextField
            label="Job Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ bgcolor: "#f5f5f5" }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Skills Required</InputLabel>
            <Select
              multiple
              value={skills}
              onChange={handleSkillChange}
              variant="outlined"
              sx={{ bgcolor: "#f5f5f5" }}
            >
              <MenuItem value="programming">Programming (Web, App, DevOps, Version Control, Cloud, Game Development)</MenuItem>
              <MenuItem value="software-development">Software Development</MenuItem>
              <MenuItem value="data-structures">Data Structures</MenuItem>
              <MenuItem value="algorithms">Algorithms</MenuItem>
              <MenuItem value="database-management">Database Management</MenuItem>
              <MenuItem value="cloud-computing">Cloud Computing</MenuItem>
              <MenuItem value="machine-learning">Machine Learning</MenuItem>
              <MenuItem value="cybersecurity">Cybersecurity</MenuItem>
              <MenuItem value="artificial-intelligence">Artificial Intelligence</MenuItem>
              <MenuItem value="web-development">Web Development</MenuItem>
              <MenuItem value="mobile-development">Mobile Development</MenuItem>
              <MenuItem value="version-control">Version Control (Git)</MenuItem>
              <MenuItem value="networking">Networking</MenuItem>
              <MenuItem value="devops">DevOps</MenuItem>
              <MenuItem value="testing">Software Testing</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: "48%" }}>
              Post Job
            </Button>
            <Button onClick={handleBack} variant="outlined" color="secondary" sx={{ width: "48%" }}>
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Collabform;
