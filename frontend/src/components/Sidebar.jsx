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
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          backgroundColor: "#0D47A1", // Deep Blue Sidebar
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
          borderRight: "2px solid #1565C0",
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
            background: "linear-gradient(45deg, #FFD700, #FF8C00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CONNECTIFY
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#1565C0", mb: 2 }} />

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
              component="div"
              onClick={() => navigate(path)}
              sx={{
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#0D47A1",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#1976D2",
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

      <Divider sx={{ backgroundColor: "#1565C0", mt: 2, mb: 2 }} />

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ListItem
          component="div"
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#D32F2F",
            color: "white",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#B71C1C" },
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
