import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { Edit, Close, CameraAlt } from "@mui/icons-material";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Tech Enthusiast | Collaborator | Event Organizer",
    description:
      "Passionate about building meaningful software solutions and collaborating with others.",
    profilePic: "https://via.placeholder.com/150",
  });

  const [formData, setFormData] = useState({ ...profile });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setProfile({ ...formData, profilePic: newProfilePic || profile.profilePic });
    setIsOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#0d1117", minHeight: "100vh", p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: "linear-gradient(135deg, #1f2937 30%, #111827 90%)",
          borderRadius: 3,
          color: "#e5e7eb",
        }}
      >
        {/* Profile Picture & Edit */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profile.profilePic}
              alt="Profile Picture"
              sx={{ width: 100, height: 100, border: "3px solid #6366f1" }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#6366f1",
                color: "#fff",
                '&:hover': { backgroundColor: "#4f46e5" }
              }}
              component="label"
            >
              <CameraAlt />
              <input type="file" hidden onChange={handleProfilePicChange} />
            </IconButton>
          </Box>

          {/* User Info */}
          <Box>
            <Typography variant="h5" fontWeight="bold" color="#f3f4f6">
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" color="#9ca3af">
              {profile.username}
            </Typography>
            <Typography variant="body2" mt={1} color="#d1d5db">
              {profile.bio}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                mt: 2,
                color: "#6366f1",
                borderColor: "#6366f1",
                '&:hover': { backgroundColor: "#4f46e5", color: "#fff" }
              }}
              onClick={() => setIsOpen(true)}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

        {/* Profile Stats Section */}
        <Grid container spacing={3} mt={4}>
          {[
            { label: "Collaborations", count: 10 },
            { label: "Events Joined", count: 5 },
            { label: "Blogs Written", count: 12 },
            { label: "Forum Posts", count: 20 },
            { label: "Patterns Shared", count: 7 },
            { label: "Papers Submitted", count: 3 },
          ].map((stat, idx) => (
            <Grid item xs={6} sm={4} key={idx}>
              <Typography variant="h6" color="#93c5fd">
                {stat.label}
              </Typography>
              <Typography color="#bfdbfe">{stat.count}</Typography>
            </Grid>
          ))}
        </Grid>

        {/* Quick Navigation Section */}
        <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
          {[
            "Go to Collaboration",
            "View Events",
            "My Blogs",
            "Forum Activity",
            "Pattern Library",
            "Research Papers",
          ].map((btn, idx) => (
            <Button
              key={idx}
              variant="contained"
              sx={{
                backgroundColor: "#6366f1",
                '&:hover': { backgroundColor: "#4f46e5" },
              }}
            >
              {btn}
            </Button>
          ))}
        </Box>

        {/* Edit Profile Dialog */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogTitle>Edit Profile</DialogTitle>
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={() => setIsOpen(false)}
          >
            <Close />
          </IconButton>
          <DialogContent>
            {[
              { label: "Full Name", name: "name", rows: 1 },
              { label: "Username", name: "username", rows: 1 },
              { label: "Bio", name: "bio", rows: 3 },
              { label: "Description", name: "description", rows: 4 },
            ].map((field, idx) => (
              <TextField
                key={idx}
                fullWidth
                margin="normal"
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                multiline={field.rows > 1}
                rows={field.rows}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Profile;
