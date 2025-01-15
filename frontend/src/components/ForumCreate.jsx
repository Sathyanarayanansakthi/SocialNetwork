import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const FormCreate = ({ setShowForm }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validation for Title
    if (!title.trim()) {
      formErrors.title = "Title is required and cannot be empty";
    }

    // Validation for Body
    if (!body.trim()) {
      formErrors.body = "Body is required and cannot be empty";
    }

    // Validation for Tags (check if tags are separated by commas)
    if (!tags.trim()) {
      formErrors.tags = "Tags are required and cannot be empty";
    } else if (!/^([a-zA-Z0-9]+)(, *[a-zA-Z0-9]+)*$/.test(tags.trim())) {
      formErrors.tags = "Tags must be alphanumeric and separated by commas";
    }

    // If there are any errors, set them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If all fields are valid
    console.log("Question Submitted: ", { title, body, tags });
    setErrors({});
  };

  // Function to close the form
  const handleClose = () => {
    setShowForm(false); // This will hide the form in the parent component (Forum)
  };

  return (
    <div className="relative max-w-4xl p-4 mx-auto bg-white rounded-md shadow-md">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute px-3 py-1 text-red-500 bg-transparent rounded-full top-2 right-2 hover:text-white hover:bg-red-500 focus:outline-none"
      >
        ✕
      </button>

      <h1 className="mb-6 text-3xl font-semibold">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            placeholder="Give a simple question"
            type="text"
            id="title"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* TinyMCE Editor for Body */}
        <div>
          <label htmlFor="body" className="block text-lg font-medium">
            Body
          </label>
          <Editor
            apiKey="bzcl19eovznnhhi75md1qjmzg3few1fcthfrt8yuc3ba1hpx"
            value={body}
            onEditorChange={(newValue) => setBody(newValue)}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "anchor", "autolink", "charmap", "codesample", "emoticons",
                "image", "link", "lists", "media", "searchreplace", "table",
                "visualblocks", "wordcount", "advtable", "a11ychecker"
              ],
              toolbar:
                "undo redo | bold italic underline | link image media | bullist numlist | removeformat",
            }}
          />
          {errors.body && <p className="text-sm text-red-500">{errors.body}</p>}
        </div>

        {/* Tags Input */}
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
          {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
        </div>

        {/* Submit Button */}
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
