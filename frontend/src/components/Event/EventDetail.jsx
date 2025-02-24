import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EventNav from "./EventNav";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // New state for image preview
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Error fetching event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 text-center text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="mt-6 text-center text-gray-400">Event not found.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      <EventNav />
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
        >
          ← Back to Events
        </button>
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">
          {event.eventName}
        </h1>
        {event.poster && (
          <>
            <img
              src={`http://localhost:5000/${event.poster}`}
              alt={event.eventName}
              onClick={() => setIsPreviewOpen(true)} // Open preview on click
              className="w-full h-64 object-cover rounded-lg mb-6 cursor-pointer hover:opacity-80 transition"
            />
            {/* Full-Screen Image Preview */}
            {isPreviewOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                onClick={() => setIsPreviewOpen(false)} // Close preview on click
              >
                <img
                  src={`http://localhost:5000/${event.poster}`}
                  alt={event.eventName}
                  className="max-w-full max-h-full rounded-lg"
                />
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute top-4 right-4 text-white text-2xl font-bold"
                >
                  ✖
                </button>
              </div>
            )}
          </>
        )}
        <div className="space-y-4">
          <p className="flex items-center text-gray-300">
            <span className="mr-2">📅</span>
            {event.eventType}
          </p>
          <p className="flex items-center text-gray-300">
            <span className="mr-2">📍</span>
            {event.location}
          </p>
          <p className="italic text-sm text-gray-400">{event.collegeName}</p>
          <p className="text-gray-300">{event.eventDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
