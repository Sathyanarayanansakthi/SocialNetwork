import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom"; 

const BlogNav = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog site
        </Typography>
        {/* Wrap the button in Link to navigate to the blog creation route */}
        <Button
          component={Link}
          to="/create"  
          sx={{
            backgroundColor: "#42a5f5",
            color: "white",
            '&:hover': { backgroundColor: "#1e88e5" }
          }}
        >
          Create a Blog
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BlogNav;

