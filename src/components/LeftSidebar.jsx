import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { FaHome, FaServicestack, FaPhone, FaBars, FaTimes, FaComment } from "react-icons/fa";
import { UserButton } from "@clerk/clerk-react";
import Forum from "../pages/Forum";

function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg rounded-r-lg flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center justify-between p-4 text-lg font-bold border-b border-gray-600 rounded-t-lg">
              <span>My Sidebar</span>
              <button className="text-gray-200 md:hidden" onClick={() => setIsOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>
            <nav className="mt-4 space-y-4">
              <Link to="/" className="flex items-center px-6 py-3 text-lg font-bold rounded-lg hover:bg-blue-600">
                <FaHome className="mr-4 text-xl" /> Home
              </Link>
              <Link to="/forum" className="flex items-center px-6 py-3 text-lg font-bold rounded-lg hover:bg-blue-600">
                <FaComment className="mr-4 text-xl" /> Forum
              </Link>
              <Link to="/services" className="flex items-center px-6 py-3 text-lg font-bold rounded-lg hover:bg-blue-600">
                <FaServicestack className="mr-4 text-xl" /> Services
              </Link>
              <Link to="/contact" className="flex items-center px-6 py-3 text-lg font-bold rounded-lg hover:bg-blue-600">
                <FaPhone className="mr-4 text-xl" /> Contact
              </Link>

            </nav>
          </div>

          <div className="p-6">
            <UserButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 text-slate-400">
          <button className="p-2 mb-4 text-white bg-blue-600 rounded md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <FaBars size={20} />
          </button>

          <Routes>
            <Route path="/" element={<div className="text-2xl font-bold">Home Page</div>} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/contact" element={<div className="text-2xl font-bold">Contact Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default LeftSidebar;
