// import React from "react";

const paperNav = () => {
  return (
    <div className="p-5 bg-blue-800 rounded-2xl m-6 shadow-lg flex flex-col gap-3">
      <h5 className="text-lg text-white font-semibold">Paper</h5>
      <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        + Add Pattern
      </button>
    </div>
  );
};

export default paperNav;
