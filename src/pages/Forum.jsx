import { useState } from "react";
import FormCreate from "../components/ForumCreate";

const Forum = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true); // Set the state to show the form when button is clicked
  };

  return (
    <div>
      {/* Button aligned to the right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClick} // Trigger the handleClick function on button click
          className="px-6 py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Ask Questions
        </button>
      </div>

      {/* Conditional rendering of FormCreate component */}
      {showForm && <FormCreate />}
    </div>
  );
};

export default Forum;
