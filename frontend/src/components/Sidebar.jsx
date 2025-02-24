import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  FaHome,
  FaUsers,
  FaCogs,
  FaUser,
  FaBlog,
  FaSignOutAlt,
  FaNewspaper,
} from "react-icons/fa";
import { MdEventNote, MdLibraryBooks } from "react-icons/md";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const menuItems = [
    { text: "Home", icon: <FaHome />, path: "/" },
    { text: "Pattern", icon: <MdLibraryBooks />, path: "/pattern" },
    { text: "Events", icon: <MdEventNote />, path: "/event" },
    { text: "Forum", icon: <FaUsers />, path: "/forum" },
    { text: "Collaboration", icon: <FaCogs />, path: "/collab" },
    { text: "Profile", icon: <FaUser />, path: "/profile" },
    { text: "Blog", icon: <FaBlog />, path: "/blog" },
    // { text: "Paper", icon: <FaNewspaper />, path: "/paper" },
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          background: "linear-gradient(180deg, #0A3D91, #000000)",
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
          borderRight: "3px solid #0056b3",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* App Name */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            fontWeight: "bold",
            letterSpacing: "1px",
            textTransform: "uppercase",
            background: "linear-gradient(45deg, #FFD700, #FFA500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Social Network
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#1976D2", mb: 2 }} />

      {/* Menu Items */}
      <List
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {menuItems.map(({ text, icon, path }) => (
          <motion.div
            key={text}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ListItem
              button
              onClick={() => navigate(path)}
              component={motion.div}
              whileHover={{ scale: 1.05, backgroundColor: "#003366" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                borderRadius: "8px",
                marginBottom: "10px",
                background: "linear-gradient(90deg, #001F3F, #003366)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(90deg, #004080, #0066CC)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "#1976D2", mt: 2, mb: 2 }} />

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#D32F2F" }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            background: "linear-gradient(90deg, #660000, #990000)",
            "&:hover": { background: "linear-gradient(90deg, #990000, #CC0000)" },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
            <FaSignOutAlt />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;