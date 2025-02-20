import { useState } from "react";
import { TextField, Button, Typography, Divider, Chip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const skillOptions = [
  { label: "Programming", value: "programming" },
  { label: "Software Development", value: "software-development" },
  { label: "Data Structures", value: "data-structures" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Cybersecurity", value: "cybersecurity" },
];

const CollabForm = () => {
  const navigate = useNavigate();
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-2xl bg-black bg-opacity-30 backdrop-blur-md shadow-md rounded-xl p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" className="text-blue-400 font-semibold text-center mb-4">
            Collaboration Form
          </Typography>
        </motion.div>
        <Divider className="mb-6 border-gray-700" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["title", "name", "location"].map((field, index) => (
              <motion.div key={field} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth
                  variant="outlined"
                  value={formData[field]}
                  onChange={handleChange}
                  name={field}
                  required
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-md"
                  InputLabelProps={{ className: "text-gray-300" }}
                  InputProps={{
                    style: { color: "white" },
                    className: "text-white",
                  }}
                />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-4">
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              name="description"
              required
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-md"
              InputLabelProps={{ className: "text-gray-300" }}
              InputProps={{
                style: { color: "white" },
                className: "text-white",
              }}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-300 mb-2">
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
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-md text-white"
              styles={{
                control: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }),
                menu: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }),
                multiValue: (base) => ({ ...base, backgroundColor: "#2563eb", color: "white" }),
                multiValueLabel: (base) => ({ ...base, color: "white" }),
              }}
            />
          </motion.div>
          <div className="flex justify-between mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                {loading ? "Submitting..." : "Post Job"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => navigate(-1)} variant="outlined" className="border-blue-400 text-blue-400">
                Back
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default CollabForm;
