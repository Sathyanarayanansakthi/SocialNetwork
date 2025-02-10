import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Divider, Paper, Chip, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";
import { motion } from "framer-motion";

const skillOptions = [
  { label: "Programming", value: "programming" },
  { label: "Software Development", value: "software-development" },
  { label: "Data Structures", value: "data-structures" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Cybersecurity", value: "cybersecurity" },
];

const CollabForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    location: "",
    description: "",
    skills: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (selectedSkills) => {
    const skills = selectedSkills ? selectedSkills.map((skill) => skill.value) : [];
    setFormData((prevData) => ({ ...prevData, skills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.name || !formData.location || !formData.description || formData.skills.length === 0) {
      toast.error("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/collab", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        toast.success("Collaboration created successfully!");
        setFormData({ title: "", name: "", location: "", description: "", skills: [] });
      } else {
        toast.error("Failed to submit form.");
      }
    } catch (error) {
      toast.error("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ mt: 6, p: 5, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#0077b5", mb: 3, textAlign: "center" }}>Collaboration Form</Typography>
        </motion.div>
        <Divider sx={{ mb: 4 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {["title", "name", "location"].map((field, index) => (
              <Grid item xs={12} md={6} key={field}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                  <TextField label={field} fullWidth variant="outlined" value={formData[field]} onChange={handleChange} name={field} required />
                </motion.div>
              </Grid>
            ))}
            <Grid item xs={12}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <TextField label="Description" multiline rows={4} fullWidth variant="outlined" value={formData.description} onChange={handleChange} name="description" required />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Skills Required</Typography>
                <Select isMulti options={skillOptions} value={skillOptions.filter((option) => formData.skills.includes(option.value))} onChange={handleSkillsChange} placeholder="Select skills..." closeMenuOnSelect={false} isSearchable />
                {formData.skills.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 1 }}>
                    {formData.skills.map((skill) => (
                      <Chip key={skill} label={skill} sx={{ bgcolor: "#0077b5", color: "#fff" }} />
                    ))}
                  </Box>
                )}
              </motion.div>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#0077b5", color: "#fff" }} disabled={loading}>{loading ? "Submitting..." : "Post Job"}</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => window.history.back()} variant="outlined" sx={{ borderColor: "#0077b5", color: "#0077b5" }}>Back</Button>
            </motion.div>
          </Box>
        </form>
      </Paper>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default CollabForm;
