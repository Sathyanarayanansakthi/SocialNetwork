import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Divider, Paper, Chip, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios
import Select from "react-select"; // Import React Select

// Skill options for the dropdown
const skillOptions = [
  { label: "Programming (Web, App, DevOps, Version Control, Cloud, Game Development)", value: "programming" },
  { label: "Software Development", value: "software-development" },
  { label: "Data Structures", value: "data-structures" },
  { label: "Algorithms", value: "algorithms" },
  { label: "Database Management", value: "database-management" },
  { label: "Cloud Computing", value: "cloud-computing" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Artificial Intelligence", value: "artificial-intelligence" },
  { label: "Web Development", value: "web-development" },
  { label: "Mobile Development", value: "mobile-development" },
  { label: "Version Control (Git)", value: "version-control" },
  { label: "Networking", value: "networking" },
  { label: "DevOps", value: "devops" },
  { label: "Software Testing", value: "testing" },
];

const CollabForm = () => {
  // State hooks for form fields
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    location: "",
    description: "",
    skills: [], // Store selected skills
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle skills selection change
  const handleSkillsChange = (selectedSkills) => {
    const skills = selectedSkills ? selectedSkills.map((skill) => skill.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      skills,
    }));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!formData.title || !formData.name || !formData.location || !formData.description || formData.skills.length === 0) {
      toast.error("All fields are required. Please fill them in before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/collab", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Collaboration created successfully!");
        setFormData({ title: "", name: "", location: "", description: "", skills: [] });
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={6} sx={{ mt: 6, p: 5, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#0077b5", mb: 3, textAlign: "center" }}>
          Collaboration Form
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Form Structure */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title of the Collab"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                name="title"
                required
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of the Event"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
                name="location"
                required
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                name="description"
                required
                sx={inputStyles}
              />
            </Grid>

            {/* Skills Dropdown */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
                Skills Required
              </Typography>
              <Select
                isMulti
                options={skillOptions}
                value={skillOptions.filter((option) => formData.skills.includes(option.value))}
                onChange={handleSkillsChange}
                placeholder="Select skills..."
                closeMenuOnSelect={false}
                isSearchable
                styles={selectStyles}
              />
              {/* Display selected skills */}
              {formData.skills.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 1 }}>
                  {formData.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        bgcolor: "#0077b5",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "16px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Submit and Back Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Button
              type="submit"
              variant="contained"
              sx={submitButtonStyles}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Post Job"}
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outlined"
              sx={backButtonStyles}
            >
              Back
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

// Styles for the components
const inputStyles = {
  borderRadius: 2,
  "& .MuiOutlinedInput-root": { bgcolor: "#fff", borderColor: "#bbb" },
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#bbb",
    borderRadius: "4px",
    padding: "4px",
  }),
};

const submitButtonStyles = {
  width: "48%",
  backgroundColor: "#0077b5",
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": { backgroundColor: "#005f8a" },
};

const backButtonStyles = {
  width: "48%",
  borderColor: "#0077b5",
  color: "#0077b5",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": { borderColor: "#005f8a", color: "#005f8a" },
};

export default CollabForm;
