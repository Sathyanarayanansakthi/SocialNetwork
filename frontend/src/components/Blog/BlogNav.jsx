import { Link } from "react-router-dom";

const BlogNav = () => {
  return (
    <nav className="sticky top-0 bg-blue-600 shadow-md rounded-md m-9">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-white text-lg font-semibold">Blog Site</h1>
        <Link
          to="/create"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Create a Blog
        </Link>
      </div>
    </nav>
  );
};

export default BlogNav;
