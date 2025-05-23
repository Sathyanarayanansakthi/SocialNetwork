import {  FaNodeJs, FaGithub, FaGoogle, FaJs, FaServer, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiReact, SiExpress, SiMongodb, SiDocker, SiVite, SiPassport, SiMui } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-gray-900 bg-white">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <motion.h1
          className="mb-4 text-4xl font-bold text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text animate-pulse"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Our Connectify
        </motion.h1>
        <motion.p
          className="max-w-3xl mb-6 text-lg text-gray-700 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          A platform for students, researchers, and professionals to collaborate, share knowledge, and connect.
        </motion.p>
        <Link to="/signin">
          <motion.button
            className="px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Sign In
          </motion.button>
        </Link>
      </motion.div>

      {/* Technology Stack Section */}
      <div className="px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold">Technology Used </h2>
        <div className="grid grid-cols-2 gap-12 text-5xl sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[{ icon: <SiReact className="text-blue-500" />, name: "React JS" },
          { icon: <SiExpress className="text-gray-500" />, name: "Express JS" },
          { icon: <SiMongodb className="text-green-500" />, name: "MongoDB" },
          { icon: <SiDocker className="text-blue-600" />, name: "Docker" },
          { icon: <SiVite className="text-purple-500" />, name: "Vite" },
          { icon: <SiPassport className="text-blue-700" />, name: "Passport.js" },
          { icon: <SiMui className="text-indigo-500" />, name: "Material UI" },
          { icon: <RiTailwindCssFill className="text-cyan-500" />, name: "Tailwind CSS" },
          { icon: <FaNodeJs className="text-green-400" />, name: "Node.js" },
          { icon: <FaGithub className="text-gray-800" />, name: "GitHub" },
          { icon: <FaGoogle className="text-red-400" />, name: "Google Auth" },
          { icon: <FaJs className="text-yellow-500" />, name: "JavaScript" },
          { icon: <FaServer className="text-gray-600" />, name: "Server" }].map((tech, index) => (
            <motion.div 
              key={index} 
              className="text-center transition duration-300 ease-in-out transform hover:scale-110"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              {tech.icon}
              <p className="mt-2 text-sm text-gray-600">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {["Join the Community", "Collaborate on Projects", "Share Your Knowledge "].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-2 text-xl font-semibold">{step}</h3>
              <p className="text-gray-600">Get started by signing up and exploring projects.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center mb-4">
          {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
            <a key={index} href="https://sathyanarayanan.live" className="mx-3 text-gray-600 hover:text-black">
              <Icon />
            </a>
          ))}
        </div>
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Our Connectify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
