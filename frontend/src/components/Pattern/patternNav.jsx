import { Link } from 'react-router-dom';

const PatternNav = () => {
  return (
    <div className="relative flex flex-col gap-3 p-5 shadow-lg bg-slate-800 rounded-2xl">
      {/* Add Pattern Button at Top Right */}
      <Link to="/patternrules">
        <button className="absolute px-4 py-2 text-sm font-medium text-white transition-all bg-blue-600 rounded-lg top-4 right-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          + Add Pattern
        </button>
      </Link>

      {/* Heading */}
      <h5 className="text-lg font-semibold text-white">Pattern</h5>
    </div>
  );
};

export default PatternNav;