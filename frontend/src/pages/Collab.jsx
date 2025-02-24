import { useState, useEffect } from "react";
import axios from "axios";
import ForumNavbar from "../components/Forum/ForumNavbar";
import { motion } from "framer-motion";
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <motion.div
          className="w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    );

  if (error)
    return (
      <div className="mt-10 text-center text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen text-white bg-black">
      <ForumNavbar />
      <div className="max-w-4xl p-6 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-indigo-400">
          Forum Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                className={`p-5 bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ${
                  expanded === post._id ? "ring-2 ring-indigo-400" : ""
                }`}
              >
                <button
                  onClick={() => handleExpand(post._id)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-xl font-semibold text-indigo-400">
                    {post.title}
                  </h2>
                  {expanded === post._id ? (
                    <ExpandLess className="text-indigo-400" />
                  ) : (
                    <ExpandMore className="text-indigo-400" />
                  )}
                </button>

                {expanded === post._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p
                      className="text-gray-300"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    {/* Comments Section */}
                    <h3 className="mt-4 text-lg font-medium text-indigo-400">
                      Comments
                    </h3>
                    <div className="space-y-2">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div
                            key={comment._id}
                            className="p-2 bg-gray-800 rounded-lg shadow-inner"
                          >
                            <p>
                              <strong className="text-indigo-300">
                                {comment.author}:
                              </strong>{" "}
                              {comment.text}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No comments yet.</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentData[post._id] || ""}
                        onChange={(e) =>
                          handleCommentChange(post._id, e.target.value)
                        }
                        className="w-full px-3 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <button
                        onClick={() => submitComment(post._id)}
                        className="self-end px-4 py-2 transition bg-indigo-500 rounded-lg hover:bg-indigo-600"
                      >
                        Submit
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
