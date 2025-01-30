/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import the default style for Quill

const ForumCreation = () => {
  const [value, setValue] = useState("Start writing your forum post here...");

  const handleSubmit = () => {
    console.log("Forum Post Content:", value);
    alert("Forum post submitted! Check the console for data.");
    // Send this data to your backend (Express + MongoDB)
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="mb-4 text-2xl font-bold">Create a New Forum Post</h2>

      <div className="w-full max-w-2xl p-4 bg-white border rounded-lg shadow-md">
        <ReactQuill
          value={value}
          onChange={setValue}
          placeholder="Type your forum post here..."
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Submit Post
      </button>
    </div>
  );
};

export default ForumCreation;
