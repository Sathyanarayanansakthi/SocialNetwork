import { useEffect, useState } from "react";
import CollabNav from "../components/Collab/CollabNav";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Collab = () => {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/collab");
        setCollabs(response.data);
      } catch (error) {
        setError("Error fetching collaborations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCollabs();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleShare = (id) => {
    const shareableLink = `${window.location.origin}/collab/${id}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  if (loading) {
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
  }

  if (error) {
    return <div className="mt-6 text-center text-red-500">{error}</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-black text-white min-h-screen">
      <CollabNav />
      <div className="max-w-4xl pb-10 mx-auto mt-8">
        <h1 className="mb-6 text-3xl font-bold text-center text-indigo-400">Explore Collaborations</h1>
        <div className="space-y-6">
          {collabs.map((collab) => (
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              key={collab._id} 
              className="bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 border border-gray-700 shadow-md rounded-xl hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-indigo-400">{collab.title}</h2>
              <p className="text-sm text-gray-500">Published on: {new Date(collab.publishedAt).toLocaleString()}</p>
              <p><strong>Name:</strong> {collab.name}</p>
              <p><strong>Location:</strong> {collab.location}</p>
              <p className="mt-2 text-gray-300">
                {expanded[collab._id] ? collab.description : `${collab.description.slice(0, 100)}...`}
              </p>
              <button onClick={() => toggleExpand(collab._id)} className="mt-2 text-indigo-400 hover:text-indigo-300 transition">
                {expanded[collab._id] ? "Read Less" : "Read More"}
              </button>
              <h3 className="mt-4 font-semibold text-gray-400">Skills Required:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {collab.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => handleShare(collab._id)} 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                >
                  Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Collab;
