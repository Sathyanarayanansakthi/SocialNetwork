import React from "react";
import { Link } from "react-router-dom";

const PatternRules = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h2 className="mb-4 text-xl font-bold">Rules And Regulation</h2>
      <Link to="/patternform">
        {/* Fixed Link Path */}
        <button className="px-4 py-2 text-sm font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          + Add Pattern
        </button>
      </Link>
    </div>
  );
};

export default PatternRules;
