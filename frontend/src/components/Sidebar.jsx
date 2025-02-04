import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import { FaHome, FaUsers, FaCogs, FaUser, FaBlog, FaSignOutAlt } from 'react-icons/fa';
import { MdEventNote, MdLibraryBooks } from 'react-icons/md';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear session
    navigate('/'); // Redirect to home
  };

  const menuItems = [
    { text: 'Home', icon: <FaHome />, path: '/' },
    { text: 'Dashboard', icon: <MdLibraryBooks />, path: '/dashboard' },
    { text: 'Events', icon: <MdEventNote />, path: '/event' },
    { text: 'Forum', icon: <FaUsers />, path: '/forum' },
    { text: 'Collaboration', icon: <FaCogs />, path: '/collab' },
    { text: 'Profile', icon: <FaUser />, path: '/profile' },
    { text: 'Blog', icon: <FaBlog />, path: '/blog' },
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          backgroundColor: '#0A3D91', // Professional Blue
          color: 'white',
          padding: '20px',
          boxSizing: 'border-box',
          borderRight: '3px solid #0056b3', // Slight contrast
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Sidebar Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Social Network
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#1976D2', mb: 2 }} />

      {/* Menu Items with Framer Motion for Animation */}
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <motion.div
            key={text}
            initial={{ opacity: 0 }} // Start with 0 opacity
            animate={{ opacity: 1 }} // Animate to full opacity
            transition={{ duration: 0.3 }} // Duration of the fade-in
          >
            <ListItem
              button
              onClick={() => navigate(path)}
              sx={{
                borderRadius: '8px',
                marginBottom: '10px',
                '&:hover': { backgroundColor: '#0056b3', transition: '0.3s' },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Divider sx={{ backgroundColor: '#1976D2', mt: 2, mb: 2 }} />

      {/* Logout with Framer Motion */}
      <motion.div
        initial={{ opacity: 0 }} // Start with 0 opacity
        animate={{ opacity: 1 }} // Animate to full opacity
        transition={{ duration: 0.5 }} // Duration of the fade-in
      >
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#D32F2F', transition: '0.3s' },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
            <FaSignOutAlt />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;
