import { motion } from "framer-motion";
import PropTypes from "prop-types";

const EventCard = ({ event, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
    >
      {event.poster && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${event.poster}`}
            alt={event.eventName}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{event.eventName}</h3>
        <p className="mt-1 text-sm text-gray-500">{event.eventType} • {event.collegeName}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.eventDescription}</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <span className="mr-2">📍</span>
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    poster: PropTypes.string,
    eventName: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    collegeName: PropTypes.string.isRequired,
    eventDescription: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    // Add any other event properties you use here
  }).isRequired,
  onClick: PropTypes.func,
};

export default EventCard;