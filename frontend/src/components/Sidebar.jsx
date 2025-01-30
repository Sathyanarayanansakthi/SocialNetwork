//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaCogs, FaUser, FaBlog, FaSignOutAlt } from 'react-icons/fa';
import { MdLocalLibrary } from 'react-icons/md';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, useTheme } from '@mui/material';

function Sidebar() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const theme = useTheme(); // Access the theme for primary color

  const handleLogout = () => {
    // Clear authentication token or any session data if needed
    localStorage.removeItem('authToken'); // Remove auth token (example)
    navigate('/'); // Redirect to the landing page
  };

  return (
    <div className="relative flex">
      {/* Sidebar Drawer (always visible) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: theme.palette.primary.main, // Primary color from the theme
            color: 'white', // White text color
            padding: '20px 10px',
            boxSizing: 'border-box',
            borderRight: `2px solid ${theme.palette.primary.dark}`, // Slightly darker shade for border
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Sidebar Header/Brand */}
        <div className="mb-4">
          <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '1px' }}>Social Network</Typography>
        </div>

        <Divider sx={{ marginBottom: 2 }} />

        <List>
          {/* Home */}
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <FaHome className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
             {/* Dashboard */}
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <MdLocalLibrary className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Papers" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          {/* Paper */}
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <FaTachometerAlt className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Event" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
           {/* Settings */}
          <ListItem button onClick={() => navigate('/forum')}>
            <ListItemIcon>
              <FaCogs className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Forum" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <FaUser className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          {/* Blog */}
          <ListItem button onClick={() => navigate('/blog')}>
            <ListItemIcon>
              <FaBlog className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Blog" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <Divider sx={{ marginY: 2 }} />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <FaSignOutAlt className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;

