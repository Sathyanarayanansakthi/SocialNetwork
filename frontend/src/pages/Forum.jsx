import { useState, useEffect } from "react";
import axios from "axios";
import ForumNavbar from "../components/Forum/ForumNavbar";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [commentData, setCommentData] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleExpand = (postId) => {
    setExpanded(expanded === postId ? null : postId);
  };

  const handleCommentChange = (postId, value) => {
    setCommentData((prev) => ({ ...prev, [postId]: value }));
  };

  const submitComment = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
        author: "Anonymous",
        text: commentData[postId] || "",
      });
      setCommentData((prev) => ({ ...prev, [postId]: "" }));

      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      alert("Error adding comment.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ForumNavbar />
      <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Forum Posts
        </Typography>
        {posts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No posts available.
          </Typography>
        ) : (
          <List>
            {posts.map((post) => (
              <div key={post._id}>
                <ListItem
                  button
                  onClick={() => handleExpand(post._id)}
                  sx={{
                    backgroundColor: "#222",
                    borderRadius: 1,
                    marginBottom: 1,
                    boxShadow: 2,
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="h6">{post.title}</Typography>}
                  />
                  {expanded === post._id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={expanded === post._id} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#333",
                      borderRadius: 1,
                      marginBottom: 1,
                    }}
                  >
                    <Typography variant="body1" paragraph>
                      {post.content}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      <strong>Tags:</strong> {post.tags.join(", ")}
                    </Typography>

                    {/* Comments Section */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      Comments
                    </Typography>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <Box
                          key={comment._id}
                          sx={{
                            padding: 1,
                            backgroundColor: "#444",
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
                      <Typography variant="body2" color="gray">
                        No comments yet.
                      </Typography>
                    )}
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={commentData[post._id] || ""}
                      onChange={(e) => handleCommentChange(post._id, e.target.value)}
                      sx={{ marginTop: 2, backgroundColor: "#555", borderRadius: 1 }}
                      InputProps={{ sx: { color: "white" } }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ marginTop: 1, backgroundColor: "#1976d2" }}
                      onClick={() => submitComment(post._id)}
                    >
                      Submit
                    </Button>
                  </Box>
                </Collapse>
              </div>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
};

export default Forum;
