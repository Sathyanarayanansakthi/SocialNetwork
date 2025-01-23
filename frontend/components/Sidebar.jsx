//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaCogs, FaUser, FaBlog, FaSignOutAlt } from 'react-icons/fa'; 
import {MdLocalLibrary} from 'react-icons/md'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';

function Sidebar() {
  const navigate = useNavigate(); // Hook to navigate programmatically

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
            backgroundColor: '#2c2f38', // Dark background for professional look
            color: 'white',
            padding: '20px 10px',
            boxSizing: 'border-box',
            borderRight: '2px solid #444',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Sidebar Header/Brand */}
        <div className="mb-4">
          <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '1px' }}>Social Network</Typography>
        </div>

        <Divider sx={{ marginBottom: 2, backgroundColor: '#444' }} />

        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <FaHome className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <MdLocalLibrary className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Papers" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <FaTachometerAlt className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <FaCogs className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <FaUser className="text-xl text-white" />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/blog')}>
            <ListItemIcon>
              <FaBlog className="text-xl text-white" />
            </ListItemIcon> 
            <ListItemText primary="Blog" sx={{ fontSize: '16px', fontWeight: 500 }} />
          </ListItem>
          <Divider sx={{ marginY: 2, backgroundColor: '#444' }} />
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
