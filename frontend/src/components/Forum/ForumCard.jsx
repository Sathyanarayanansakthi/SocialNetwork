import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Card, CardContent, Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess, ChatBubbleOutline } from "@mui/icons-material";
import { motion } from "framer-motion";

const ForumCard = () => {
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
    <Box className="flex flex-col items-center min-h-screen p-6 text-white bg-gray-900">
      <Typography variant="h4" gutterBottom className="font-semibold text-center text-indigo-500">
        Forum Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No posts available.
        </Typography>
      ) : (
        <Box className="w-full max-w-3xl space-y-4">
          {posts.map((post) => (
            <motion.div key={post._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card className="overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
                <CardContent>
                  <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="text-blue-400">
                      {post.title}
                    </Typography>
                    <IconButton onClick={() => handleExpand(post._id)} color="inherit">
                      {expanded === post._id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <Collapse in={expanded === post._id} timeout="auto" unmountOnExit>
                    <Typography variant="body1" className="mt-2 text-gray-300">
                      {post.content}
                    </Typography>
                    <Typography variant="h6" className="mt-4 text-blue-300">
                      Comments
                    </Typography>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <Box key={comment._id} className="p-2 my-2 bg-gray-700 rounded-md">
                          <Typography variant="body2" className="text-gray-100">
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
                      className="mt-2 text-white bg-gray-600 rounded-lg"
                      InputProps={{ className: "text-white" }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      className="mt-2 bg-indigo-600 hover:bg-indigo-700"
                      startIcon={<ChatBubbleOutline />}
                      onClick={() => submitComment(post._id)}
                    >
                      Submit
                    </Button>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ForumCard;
