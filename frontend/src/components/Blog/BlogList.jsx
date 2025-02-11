import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Blog Posts
      </Typography>
      {blogs.map((blog) => (
        <Card key={blog._id} sx={{ mb: 4 }}>
          {blog.image && (
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5000/${blog.image}`} // Serve the image from the backend
              alt={blog.title}
            />
          )}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body1">{blog.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default BlogList;