import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EventNav from "./EventNav";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
    <div className="relative min-h-screen text-white bg-black">
      <EventNav />
      <div className="max-w-4xl p-6 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mb-4 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          ← Back to Events
        </button>
        <h1 className="mb-4 text-3xl font-bold text-indigo-400">
          {event.eventName}
        </h1>
        {event.poster && (
          <>
            <img
              src={`http://localhost:5000/uploads/${event.poster}`}
              alt={event.eventName}
              onClick={() => setIsPreviewOpen(true)}
              className="object-cover w-full mb-6 transition rounded-lg cursor-pointer h-96 hover:opacity-80"
            />
            {isPreviewOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                onClick={() => setIsPreviewOpen(false)}
              >
                <img
                  src={`http://localhost:5000/uploads/${event.poster}`}
                  alt={event.eventName}
                  className="max-w-full max-h-full rounded-lg"
                />
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute text-2xl font-bold text-white top-4 right-4"
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
          <p className="text-sm italic text-gray-400">{event.collegeName}</p>
          <p className="text-gray-300 whitespace-pre-line">
            {event.eventDescription}
          </p>

          {event.contactDetails && event.contactDetails.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 text-xl font-semibold text-indigo-400">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {event.contactDetails.map((contact, index) => (
                  <div key={index} className="p-3 bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-400">{contact.type}:</p>
                    <p className="text-white">{contact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.registrationLink && (
            <div className="mt-6">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
              >
                Register for this event
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;