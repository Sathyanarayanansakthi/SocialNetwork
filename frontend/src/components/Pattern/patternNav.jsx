// import React from "react";
import { Link } from "react-router-dom";

const PatternNav = () => {
  return (
    <div className="p-5  bg-slate-800 rounded-2xl  shadow-lg flex flex-col gap-3">
      <h5 className="text-lg text-white font-semibold">Pattern</h5>
      <Link to='/patternrules'>
      <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        + Add Pattern
      </button>
      </Link>
    </div>
  );
};

export default PatternNav;
