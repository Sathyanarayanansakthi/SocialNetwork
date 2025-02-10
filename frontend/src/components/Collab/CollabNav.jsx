import { Link } from "react-router-dom";
const CollabNav = () => {
  return (
    <div className="bg-blue-700 p-5 m-9 flex justify-between items-center shadow-lg rounded-xl ml-11 px-12 backdrop-blur-lg bg-opacity-90">
      <h3 className="text-white text-3xl font-semibold tracking-wide">
        Collaboration
      </h3>
      <Link to="/collabform">
        <button className="px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-md transition-all duration-300 transform hover:bg-blue-600 hover:text-white hover:scale-105">
          + Create Collab Form
        </button>
      </Link>
    </div>
  );
};

export default CollabNav;
