import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  CssBaseline,
  Divider,
} from "@mui/material";
import { FaHome, FaBars, FaComment } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoMdPlanet } from "react-icons/io";
import { GiPapers } from "react-icons/gi";
import { FcCollaboration } from "react-icons/fc";
import { UserButton } from "@clerk/clerk-react";
import Forum from "../pages/Forum";
import CollabPage from "../pages/CollabPage";
import Event from "../pages/Event";

const drawerWidth = 240;

function LeftSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: "Home", icon: <FaHome />, path: "/" },
    { text: "Forum", icon: <FaComment />, path: "/forum" },
    { text: "Event", icon: <MdEvent />, path: "/event" },
    { text: "Collaboration", icon: <FcCollaboration />, path: "/collabration" },
    { text: "Papers", icon: <GiPapers />, path: "/paper" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar className="flex items-center justify-center">
        <Typography variant="h6" className="flex items-center">
          <IoMdPlanet className="mr-2" />
          Social Network
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center hover:bg-blue-600 p-2 rounded"
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Profile Button at Bottom Left */}
      <Box sx={{ marginTop: "auto", padding: 2 }}>
        <UserButton />
      </Box>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* AppBar for Header */}
        <AppBar
          position="fixed"
          className="bg-gradient-to-r from-gray-800 to-gray-900 md:ml-64"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              className="md:hidden"
            >
              <FaBars />
            </IconButton>
            <Typography variant="h6" noWrap>
              Social Network
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar for desktop */}
        <Drawer
          variant="permanent"
          className="hidden md:block"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "sticky",
              top: 0,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Responsive Drawer for mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="md:hidden"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Main Content with adjusted space between sidebar */}
        <Box
          component="main"
          className="flex-1 p-4"
          sx={{
            ml: { md: `${drawerWidth + 20}px` }, // Increased space (20px) between sidebar and content
            maxWidth: "100%",
            marginTop: "64px", // Adjust the content margin for AppBar height
          }}
        >
          <Routes>
            <Route path="/" element={<div className="text-2xl font-bold">Home Page</div>} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/event" element={<Event />} />
            <Route path="/collabration" element={<CollabPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default LeftSidebar;
