import { useEffect, useState } from "react";
import axios from "axios";    
import { motion } from "framer-motion";
import EventNav from "../components/Event/EventNav";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-black bg-white"
    >
      <EventNav />
      <div className="max-w-4xl p-6 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Upcoming Events
          </h1>
    
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.01 }}
                className="p-5 transition duration-300 bg-gray-100 border border-gray-300 shadow-sm rounded-2xl hover:shadow-lg"
              >
                <Link to={`/events/${event._id}`} className="block">
                  <div className="flex gap-4">
                    {event.poster && (
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:5000/uploads/${event.poster}`}
                          alt={event.eventName}
                          className="object-cover w-24 h-24 transition duration-300 rounded-xl hover:opacity-80"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-blue-600">
                        {event.eventName}
                      </h2>
                      <div className="flex flex-col mt-1 text-sm text-gray-600">
                        <span>Date: {event.eventType}</span>
                        <span>Location: {event.location}</span>
                        <span className="text-xs italic">College: {event.collegeName}</span>
                      </div>
                      <p className="mt-3 text-gray-700 line-clamp-2">
                        {event.eventDescription}
                      </p>

                      {event.registrationLink && (
                        <div className="mt-2">
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Register Here
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Event;
