import { FaUsers, FaShareAlt, FaUniversity, FaPaperPlane, FaLock, FaChartLine, FaComments, FaHandshake, FaNodeJs, FaGithub, FaGoogle, FaJs, FaServer, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiReact, SiExpress, SiMongodb, SiDocker, SiVite, SiPassport, SiMui } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          Welcome to Our Social Network
        </h1>
        <p className="mb-6 text-lg sm:text-xl max-w-3xl">
          A platform for students, researchers, and professionals to collaborate, share knowledge, and connect.
        </p>
        <Link to="/signin">
          <button className="px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Sign In
          </button>
        </Link>
      </motion.div>

      {/* Technology Stack Section */}
      <div className="py-20 text-center bg-gray-900 px-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 text-5xl">
          {[{ icon: <SiReact className="text-blue-500" />, name: "React" },
          { icon: <SiExpress className="text-gray-500" />, name: "Express" },
          { icon: <SiMongodb className="text-green-500" />, name: "MongoDB" },
          { icon: <SiDocker className="text-blue-600" />, name: "Docker" },
          { icon: <SiVite className="text-purple-500" />, name: "Vite" },
          { icon: <SiPassport className="text-blue-700" />, name: "Passport.js" },
          { icon: <SiMui className="text-indigo-500" />, name: "Material UI" },
          { icon: <RiTailwindCssFill className="text-cyan-500" />, name: "Tailwind CSS" },
          { icon: <FaNodeJs className="text-green-400" />, name: "Node.js" },
          { icon: <FaGithub className="text-gray-300" />, name: "GitHub" },
          { icon: <FaGoogle className="text-red-400" />, name: "Google Auth" },
          { icon: <FaJs className="text-yellow-300" />, name: "JavaScript" },
          { icon: <FaServer className="text-gray-600" />, name: "Server" }].map((tech, index) => (
            <div key={index} className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
              {tech.icon}
              <p className="mt-2 text-sm text-gray-400">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About the Project */}
      <div className="py-20 bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">About Our Social Network</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Our platform is designed to empower users by providing a dynamic environment where collaboration, networking and knowledge-sharing thrive.
        </p>
        <p className="max-w-3xl mx-auto text-lg mt-4">
          Whether you are a student looking for mentorship, a researcher seeking project collaboration or a professional expanding your network our platform offers unique features tailored to your needs.
        </p>
        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
          <div className="p-6 rounded-lg bg-gray-700">
            <FaUsers className="text-4xl mb-4 text-blue-400 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
            <p className="text-gray-300">Build your professional network and connect with like-minded individuals.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-700">
            <FaShareAlt className="text-4xl mb-4 text-green-400 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Share Knowledge</h3>
            <p className="text-gray-300">Share your insights, research, and experiences with the community.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-700">
            <FaHandshake className="text-4xl mb-4 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Collaborate on Projects</h3>
            <p className="text-gray-300">Find collaborators and work together on exciting projects.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center">
        <div className="flex justify-center mb-4">
          <a href="#" className="mx-3 text-gray-300 hover:text-white"><FaFacebookF /></a>
          <a href="#" className="mx-3 text-gray-300 hover:text-white"><FaTwitter /></a>
          <a href="#" className="mx-3 text-gray-300 hover:text-white"><FaLinkedinIn /></a>
          <a href="#" className="mx-3 text-gray-300 hover:text-white"><FaInstagram /></a>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Our Social Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;