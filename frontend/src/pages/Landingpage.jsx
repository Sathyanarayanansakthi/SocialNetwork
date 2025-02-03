import { FaUsers, FaShareAlt, FaUniversity, FaPaperPlane, FaNodeJs, FaGithub, FaGoogle, FaJs, FaServer } from "react-icons/fa";
import { SiVite, SiPassport, SiMongodb, SiMui } from "react-icons/si"; // Added SiQuill for Quill logo
import { RiTailwindCssFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-20 text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          Welcome to Our Social Network
        </h1>
        <p className="mb-6 text-base sm:text-lg">
          A platform for students, researchers, and professionals to collaborate, share knowledge, and connect.
        </p>
        <div className="flex items-center justify-center bg-gray-700 rounded-lg">
          <Link to="/signin">
            <button className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Sign In
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Tech Stack Used Section */}
      <div className="py-20 bg-gray-800">
        <h2 className="mb-10 text-2xl font-bold text-center text-white">
          Developed using Modern and powerful Library and Framework
        </h2>
        <div className="flex flex-wrap justify-center gap-8 px-6 text-center text-white">
          {[
            { icon: <SiVite />, name: "React JS", color: "text-blue-500" },
            { icon: <FaNodeJs />, name: "Node JS", color: "text-green-500" },
            { icon: <FaGithub />, name: "GitHub", color: "text-black" },
            { icon: <SiMongodb />, name: "MongoDB", color: "text-orange-500" },
            { icon: <FaGoogle />, name: "Google OAuth", color: "text-yellow-500" },
            { icon: <SiMui />, name: "Material-UI", color: "text-teal-500" },
            { icon: <RiTailwindCssFill />, name: "Tailwind CSS", color: "text-teal-500" },
            { icon: <FaJs />, name: "JavaScript", color: "text-yellow-300" },
            { icon: <FaServer />, name: "Express", color: "text-gray-500" },
            { icon: <SiPassport />, name: "Passport JS", color: "text-blue-600" },
            { icon: <FaServer />, name: "JWT", color: "text-purple-500" },
            // { icon: <SiQuill />, name: "Quill Editor", color: "text-red-500" }, // Added Quill
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
            >
              <div className={`text-5xl mb-2 ${tech.color}`}>{tech.icon}</div>
              <span className="font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-12 px-6 py-20 text-center text-white md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <FaUsers />,
            title: "Connect with Peers",
            description:
              "Join a community of like-minded individuals for academic and professional growth.",
            color: "text-blue-500",
          },
          {
            icon: <FaShareAlt />,
            title: "Share Knowledge",
            description:
              "Upload and share your research papers, projects, and ideas with others.",
            color: "text-green-500",
          },
          {
            icon: <FaUniversity />,
            title: "Academic Collaboration",
            description:
              "Collaborate on academic projects and research with peers and mentors.",
            color: "text-yellow-500",
          },
          {
            icon: <FaPaperPlane />,
            title: "Explore Opportunities",
            description:
              "Discover sponsorships, job opportunities, and projects for your academic work.",
            color: "text-purple-500",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <div className={`mb-4 text-4xl ${feature.color}`}>{feature.icon}</div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Image Section */}
      <motion.div
        className="relative py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black rounded-lg bg-opacity-40">
          Innovation Starts Here
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        className="py-6 text-center text-white bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
      >
        <p className="mb-2 text-sm sm:text-base">© 2025 Social Network. All rights reserved.</p>
        <p className="text-sm sm:text-base">
          Connect with us on:
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
            Facebook
          </a>{" "}
          |{" "}
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
            Twitter
          </a>{" "}
          |{" "}
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
            Instagram
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
