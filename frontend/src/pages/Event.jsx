import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EventNav from "../components/Event/EventNav";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <EventNav />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="mb-8 text-3xl font-bold text-center text-indigo-400">
          Upcoming Events
        </h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-900 bg-opacity-50 backdrop-blur-lg p-5 border border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="flex gap-4">
                  {event.poster && (
                    <a
                      href={`http://localhost:5000/uploads/${event.poster}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`http://localhost:5000/uploads/${event.poster}`}
                        alt={event.eventName}
                        className="w-24 h-24 object-cover rounded-xl cursor-pointer hover:opacity-80 transition duration-300"
                      />
                    </a>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-indigo-400">
                      {event.eventName}
                    </h2>
                    <div className="mt-1 flex flex-col text-gray-500 text-sm">
                      <span>📅 {event.eventType}</span>
                      <span>📍 {event.location}</span>
                      <span className="italic text-xs">{event.collegeName}</span>
                    </div>
                    <p className="mt-3 text-gray-300">
                      {event.eventDescription}
                    </p>

                    {/* Display Contact Details */}
                    {event.contactDetails && event.contactDetails.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-indigo-400">
                          Contact Details
                        </h3>
                        <div className="mt-2 space-y-2">
                          {event.contactDetails.map((contact, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-gray-400">
                                {contact.type}:
                              </span>
                              <span className="text-gray-300">
                                {contact.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Event;