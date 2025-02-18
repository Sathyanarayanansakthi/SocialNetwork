import { useState, useEffect } from "react";
import axios from "axios";
import ForumNavbar from "../components/Forum/ForumNavbar";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (_) {
        setError("Error fetching posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  
  return (
    <div className="min-h-screen bg-[#121212] text-gray-300"> {/* Darker background */}
      <ForumNavbar />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom color="white">
          Forum Posts
        </Typography>
        {posts.length === 0 ? (
          <Typography variant="body1" color="gray">
            No posts available.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {posts.map((post) => (
              <Card key={post._id} sx={{ bgcolor: "#1e1e1e", color: "white", transition: "0.3s", "&:hover": { transform: "scale(1.02)" } }}> {/* Darker card background */}
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom color="white">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="#9aa0a6" gutterBottom> {/* Lighter gray for meta */}
                    Posted by {post.author || "Anonymous"} - {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="#c5c8ce"> {/* Slightly lighter gray for content */}
                    {post.content}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="#9aa0a6" display="inline"> {/* Lighter gray for tags label */}
                      Tags:&nbsp;
                    </Typography>
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: "#333", // Darker tag background
                          color: "#c5c8ce", // Lighter gray for tag text
                          mr: 1,
                          "&:hover": { bgcolor: "#444" }, // Slightly darker on hover
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#2196f3", // Standard blue
                      "&:hover": { bgcolor: "#1976d2" }, // Slightly darker blue on hover
                      color: "white",
                    }}
                  >
                    Read More
                  </Button>
                </CardActions>
                <Divider sx={{ bgcolor: "#333" }} /> {/* Darker divider */}
                <CardContent>
                  <Typography variant="h6" component="h4" gutterBottom color="white">
                    Comments
                  </Typography>
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <Box
                        key={comment._id}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          p: 2,
                          mb: 2,
                          bgcolor: "#282828", // Darker comment background
                          borderRadius: 1,
                        }}
                      >
                        <Avatar sx={{ width: 36, height: 36, mr: 2, mt: 0.5, bgcolor: "#3f3f3f" }} /> {/* Slightly lighter avatar background */}
                        <Box>
                          <Typography variant="body2" fontWeight="bold" color="gray.300">
                            {comment.author}
                          </Typography>
                          <Typography variant="body2" color="#c5c8ce"> {/* Lighter gray for comment text */}
                            {comment.text}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="gray">
                      No comments yet.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Forum;