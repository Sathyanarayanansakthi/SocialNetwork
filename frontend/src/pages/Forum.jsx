import { useState } from "react";
import FormCreate from "../components/ForumCreate";

const Forum = () => {
  const [showForm, setShowForm] = useState(false);

  // Function to show the form when the button is clicked
  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {/* Button to trigger form display */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClick} // Show the form when button is clicked
          className="px-4 py-2 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Ask Questions
        </button>
      </div>

      {/* Conditionally render FormCreate component */}
      {showForm && <FormCreate setShowForm={setShowForm} />}
    </div>
  );
};

export default Forum;
