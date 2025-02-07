import { FaUsers, FaShareAlt, FaUniversity, FaPaperPlane, FaLock, FaChartLine, FaComments, FaHandshake, FaNodeJs, FaGithub, FaGoogle, FaJs, FaServer, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiReact, SiExpress, SiPostgresql, SiMongodb, SiFirebase, SiDocker, SiKubernetes, SiRedis, SiElastic, SiVite, SiPassport, SiMui, SiGraphql } from "react-icons/si";
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
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiReact className="text-blue-500" />
            <p className="mt-2 text-sm text-gray-400">React</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiExpress className="text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">Express</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiPostgresql className="text-blue-400" />
            <p className="mt-2 text-sm text-gray-400">PostgreSQL</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiMongodb className="text-green-500" />
            <p className="mt-2 text-sm text-gray-400">MongoDB</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiFirebase className="text-yellow-500" />
            <p className="mt-2 text-sm text-gray-400">Firebase</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiDocker className="text-blue-600" />
            <p className="mt-2 text-sm text-gray-400">Docker</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiKubernetes className="text-blue-300" />
            <p className="mt-2 text-sm text-gray-400">Kubernetes</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiRedis className="text-red-500" />
            <p className="mt-2 text-sm text-gray-400">Redis</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiElastic className="text-orange-500" />
            <p className="mt-2 text-sm text-gray-400">ElasticSearch</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiVite className="text-purple-500" />
            <p className="mt-2 text-sm text-gray-400">Vite</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiPassport className="text-blue-700" />
            <p className="mt-2 text-sm text-gray-400">Passport.js</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiMui className="text-indigo-500" />
            <p className="mt-2 text-sm text-gray-400">Material UI</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <SiGraphql className="text-pink-500" />
            <p className="mt-2 text-sm text-gray-400">GraphQL</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <RiTailwindCssFill className="text-cyan-500" />
            <p className="mt-2 text-sm text-gray-400">Tailwind CSS</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <FaNodeJs className="text-green-400" />
            <p className="mt-2 text-sm text-gray-400">Node.js</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <FaGithub className="text-gray-300" />
            <p className="mt-2 text-sm text-gray-400">GitHub</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <FaGoogle className="text-red-400" />
            <p className="mt-2 text-sm text-gray-400">Google Auth</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <FaJs className="text-yellow-300" />
            <p className="mt-2 text-sm text-gray-400">JavaScript</p>
          </div>
          <div className="text-center transform hover:scale-110 transition duration-300 ease-in-out">
            <FaServer className="text-gray-600" />
            <p className="mt-2 text-sm text-gray-400">Server</p>
          </div>
        </div>
      </div>

      {/* About the Project */}
      <div className="py-20 bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">About Our Social Network</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Our platform is designed to empower users by providing a dynamic environment where collaboration, networking, and knowledge-sharing thrive.
        </p>
        <p className="max-w-3xl mx-auto text-lg mt-4">
          Whether you are a student looking for mentorship, a researcher seeking project collaboration, or a professional expanding your network, our platform offers unique features tailored to your needs.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="grid grid-cols-1 gap-12 px-6 py-20 text-center md:grid-cols-2 lg:grid-cols-4">
        {[{
          icon: <FaUsers />, title: "Connect with Peers", description: "Join a community of like-minded individuals for academic and professional growth.", color: "text-blue-500"
        }, {
          icon: <FaShareAlt />, title: "Share Knowledge", description: "Upload and share your research papers, projects, and ideas with others.", color: "text-green-500"
        }, {
          icon: <FaUniversity />, title: "Academic Collaboration", description: "Collaborate on academic projects and research with peers and mentors.", color: "text-yellow-500"
        }, {
          icon: <FaPaperPlane />, title: "Explore Opportunities", description: "Discover sponsorships, job opportunities, and projects for your academic work.", color: "text-purple-500"
        }, {
          icon: <FaLock />, title: "Secure Authentication", description: "End-to-end encrypted authentication with OAuth, JWT, and more.", color: "text-red-500"
        }, {
          icon: <FaChartLine />, title: "Real-Time Analytics", description: "Track engagement, activity, and growth with our analytics dashboard.", color: "text-orange-500"
        }, {
          icon: <FaComments />, title: "AI-Powered Recommendations", description: "Get personalized recommendations based on your interests.", color: "text-indigo-500"
        }, {
          icon: <FaHandshake />, title: "Collaboration Tools", description: "Integrated tools for teamwork and project management.", color: "text-teal-500"
        }].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            <div className={`mb-4 text-4xl ${feature.color}`}>{feature.icon}</div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-400 py-12 text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">Connect with Us</h2>
          <p className="mt-2 text-lg">Stay updated and follow us on our social media platforms!</p>
        </div>
        <div className="flex justify-center gap-8 mb-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaFacebookF className="text-3xl" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaTwitter className="text-3xl" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaLinkedinIn className="text-3xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaInstagram className="text-3xl" />
          </a>
        </div>
        <p className="text-sm mb-2">&copy; {new Date().getFullYear()} Our Social Network. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy" className="hover:text-white mx-2">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white mx-2">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
