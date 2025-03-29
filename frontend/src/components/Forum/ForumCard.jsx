import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess, ChatBubbleOutline, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

const ForumCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [commentData, setCommentData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Box className="flex flex-col items-center min-h-screen p-6 bg-white text-gray-900">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Forum Posts
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 max-w-3xl"
        InputProps={{
          startAdornment: <Search className="mr-2 text-gray-500" />,
        }}
      />
      {filteredPosts.length === 0 ? (
        <Typography variant="h6" className="text-gray-500">
          No posts available.
        </Typography>
      ) : (
        <Box className="w-full max-w-3xl space-y-6">
          {filteredPosts.map((post) => (
            <motion.div key={post._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="overflow-hidden bg-white shadow-lg rounded-xl border border-gray-300">
                <CardContent>
                  <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="font-semibold text-gray-700">
                      {post.title}
                    </Typography>
                    <IconButton onClick={() => handleExpand(post._id)} className="text-gray-500 hover:text-gray-700">
                      {expanded === post._id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <Collapse in={expanded === post._id} timeout="auto" unmountOnExit>
                    <Typography
                      variant="body1"
                      className="mt-3 text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                    />
                    <Typography variant="h6" className="mt-5 text-gray-800">
                      Comments
                    </Typography>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <Box key={comment._id} className="p-3 my-3 bg-gray-100 rounded-lg shadow-sm">
                          <Typography
                            variant="body2"
                            className="text-gray-800"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<strong>${comment.author}</strong>: ${comment.text}`) }}
                          />
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" className="text-gray-500 italic">
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
                      className="mt-3 bg-gray-100 rounded-lg"
                    />
                    <Button
                      size="small"
                      variant="contained"
                      className="mt-3 bg-gray-700 hover:bg-gray-900 text-white font-semibold"
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
