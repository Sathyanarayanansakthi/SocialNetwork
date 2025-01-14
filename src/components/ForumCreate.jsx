import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const FormCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({}); // State to store error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    let formErrors = {};
    if (!title) formErrors.title = "Title is required";
    if (!body) formErrors.body = "Body is required";
    if (!tags) formErrors.tags = "Tags are required";

    // If there are validation errors, set them and prevent form submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, submit the form
    console.log("Question Submitted: ", { title, body, tags });

    // Reset errors after submission
    setErrors({});
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-semibold">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
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
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
          {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
        </div>

        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-lg font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-4 py-2 mt-2 border border- rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
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
