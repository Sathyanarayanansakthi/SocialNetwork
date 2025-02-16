import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatternForm = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a PDF file");
            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", file);

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/pdf/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(response.data.message || "File uploaded successfully!");
            setFile(null); // Reset file input after successful upload
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">Upload Single Page PDF</h2>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                <button
                    onClick={handleUpload}
                    className={`mt-4 px-4 py-2 text-white rounded transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default PatternForm;
