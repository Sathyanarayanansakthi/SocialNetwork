import React from "react";
import { Link } from "react-router-dom";

const PatternRules = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-gradient-to-r from-blue-500 to-purple-600">
      <h2 className="mb-6 text-3xl font-bold text-center">Rules & Regulations for Pattern Submission</h2>
      <div className="w-full max-w-2xl p-8 text-gray-800 bg-white shadow-lg rounded-2xl backdrop-blur-md bg-opacity-80">
        <ul className="space-y-3 text-lg">
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> Only single-page PDFs are allowed for submission.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> Ensure all required fields are filled before uploading.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> The file must be in PDF format and should not exceed the size limit.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> Provide accurate details including name, about, submission date, guide, and pattern details.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> Uploaded files will be stored securely and used for reference.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✔</span> In case of incorrect submissions, the file will be deleted automatically.</li>
        </ul>
        <div className="flex justify-center mt-8">
          <Link to="/patternform">
            <button className="px-6 py-3 text-lg font-semibold text-white transition-all shadow-md bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
              + Add Pattern
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatternRules;
