import { useState } from "react";
import BlogNav from "../components/Blog/BlogNav";
import BlogForm from "../components/Blog/BlogForm";

const Blog = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <BlogNav onCreateBlog={handleShowForm} />
      {showForm && <BlogForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Blog;
