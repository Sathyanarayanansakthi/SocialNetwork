//import React from "react";
import PropTypes from "prop-types";

function QuestionCard({ question }) {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-blue-700">{question.title}</h2>
      <p className="text-gray-600">Asked by {question.author}</p>
      <p className="text-gray-500">{question.answers} Answers</p>
    </div>
  );
}

// PropTypes for validation (optional)
QuestionCard.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    answers: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuestionCard;
