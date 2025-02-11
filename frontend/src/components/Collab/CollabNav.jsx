import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CollabNav = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0  rounded-xl w-full bg-blue-700 p-4 flex justify-between items-center shadow-lg backdrop-blur-lg bg-opacity-90 z-50 px-12"
    >
      <motion.h3
        whileHover={{ scale: 1.1 }}
        className="text-white text-2xl font-bold tracking-wide"
      >
        Collaboration Hub
      </motion.h3>
      <Link to="/collabform">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold shadow-md transition-all duration-300 transform hover:bg-blue-600 hover:text-white"
        >
          + Create Collaboration
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default CollabNav;
