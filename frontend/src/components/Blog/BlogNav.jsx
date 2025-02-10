import { useState } from "react";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";  // Make sure to import the BlogForm modal component

const BlogNav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="sticky top-0 bg-blue-600 shadow-md rounded-md m-9">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-white text-lg font-semibold">Blog Site</h1>
        <button
          onClick={handleOpen}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Create a Blog
        </button>
      </div>

      {/* BlogForm Modal */}
      <BlogForm open={open} handleClose={handleClose} />
    </nav>
  );
};

export default BlogNav;
