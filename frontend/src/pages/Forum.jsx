import { useState, useEffect } from "react";
import axios from "axios";
import ForumNavbar from "../components/Forum/ForumNavbar";
import { Card, CardContent, CardActions, Typography, Button, Grid, Box, Divider } from "@mui/material";

const Forum = () => {
  const [posts, setPosts] = useState([]);  // State to store the posts
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State to manage error if any

  // Fetch the posts data from the backend when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");  // Change this to your actual backend API endpoint
        setPosts(response.data);  // Set the data into the state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (_) {
        setError("Error fetching posts.");  // Set an error message if something goes wrong
        setLoading(false);  // Set loading to false even in case of error
      }
    };

    fetchPosts();
  }, []);  // Empty dependency array means it runs once when the component mounts

  // Show loading message or error if there's an issue
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ForumNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Forum Posts
        </Typography>
        {posts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No posts available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {post.content}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                      <strong>Tags:</strong> {post.tags.join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </CardActions>
                  <Divider />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Comments
                    </Typography>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <Box
                          key={comment._id}
                          sx={{
                            padding: 2,
                            backgroundColor: "#f9f9f9",
                            marginBottom: 1,
                            borderRadius: 1,
                            boxShadow: 1,
                          }}
                        >
                          <Typography variant="body2">
                            <strong>{comment.author}</strong>: {comment.text}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No comments yet.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Forum;
