import { useState } from "react";

const FormCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Question Submitted: ", { title, body, tags });
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-semibold">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-lg font-medium">
            Body
          </label>
          <textarea
            id="body"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-lg font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreate;
