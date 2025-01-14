import { FaUsers, FaShareAlt, FaUniversity, FaPaperPlane } from "react-icons/fa";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-20 text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold">
          Welcome to Our Social Network
        </h1>
        <p className="mb-6 text-base sm:text-lg">
          A platform for students, researchers, and professionals to collaborate, share knowledge, and connect.
        </p>
        <div className="flex items-center justify-center bg-gray-700 rounded-lg">
          <SignInButton>
            <button className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Sign In
            </button>
          </SignInButton>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-12 px-6 py-20 text-center text-white md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <FaUsers />, title: "Connect with Peers", description: "Join a community of like-minded individuals for academic and professional growth.", color: "text-blue-500" },
          { icon: <FaShareAlt />, title: "Share Knowledge", description: "Upload and share your research papers, projects, and ideas with others.", color: "text-green-500" },
          { icon: <FaUniversity />, title: "Academic Collaboration", description: "Collaborate on academic projects and research with peers and mentors.", color: "text-yellow-500" },
          { icon: <FaPaperPlane />, title: "Explore Opportunities", description: "Discover sponsorships, job opportunities, and projects for your academic work.", color: "text-purple-500" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className={`mb-4 text-4xl ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Image Section (Fixed, No Mouse Movement) */}
      <motion.div
        className="relative py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1573164574403-8b497c9b402d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8c3R1ZGVudHxlbnwwfHx8fDE2NzYyNzY2Nzg&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Students Collaborating"
          className="object-cover w-full rounded-lg shadow-lg min-h-[500px] sm:min-h-[300px]"
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black rounded-lg bg-opacity-40">
          Innovation Starts Here
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        className="py-6 text-center text-white bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 text-sm sm:text-base">© 2025 Social Network. All rights reserved.</p>
        <p className="text-sm sm:text-base">
          Connect with us on:
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">Facebook</a> | 
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">Twitter</a> | 
          <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">Instagram</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Landingpage;
