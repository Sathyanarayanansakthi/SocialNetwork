import React from "react";
import { Link } from "react-router-dom";

const PatternRules = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Hi Soldiers</h2>
      <Link to="/patternform">
        {/* Fixed Link Path */}
        <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          + Add Pattern
        </button>
      </Link>
    </div>
  );
};

export default PatternRules;
