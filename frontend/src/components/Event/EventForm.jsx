import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For routing
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import { useDropzone } from "react-dropzone";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import { UploadFile, Description, Close, Delete } from "@mui/icons-material";

const EventForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);
  const [contactType, setContactType] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [contactDetails, setContactDetails] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPoster(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  const handleAddContactDetail = () => {
    if (contactType && contactValue) {
      setContactDetails([
        ...contactDetails,
        { type: contactType, value: contactValue },
      ]);
      setContactType("");
      setContactValue("");
    }
  };

  const handleRemoveContactDetail = (index) => {
    setContactDetails(contactDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("eventType", eventType);
    formData.append("location", location);
    formData.append("collegeName", collegeName);
    formData.append("eventDescription", eventDescription);
    if (poster) formData.append("poster", poster);
    formData.append("contactDetails", JSON.stringify(contactDetails));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Show success toast notification
      toast.success(response.data.message || "Event created successfully!");

      // Redirect to the events page after a short delay
      setTimeout(() => {
        navigate("/event"); // Navigate to the events page
      }, 2000); // 2 seconds delay
    } catch (error) {
      // Show error toast notification
      toast.error(
        error.response?.data?.message || "An error occurred while creating the event."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <Button className="absolute top-4 right-4" onClick={() => navigate(-1)}>
          <Close />
        </Button>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Create Event
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Event Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Event Description"
              multiline
              rows={3}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />

            {/* Contact Details */}
            <div className="space-y-2">
              <Select
                fullWidth
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Contact Type</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phoneNumber">Phone Number</MenuItem>
                <MenuItem value="website">Website</MenuItem>
              </Select>
              {contactType && (
                <TextField
                  fullWidth
                  label={`Enter ${contactType}`}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                />
              )}
              <Button variant="outlined" onClick={handleAddContactDetail}>
                Add Contact
              </Button>
              <div className="flex flex-wrap gap-2 mt-2">
                {contactDetails.map((contact, index) => (
                  <Chip
                    key={index}
                    label={`${contact.type}: ${contact.value}`}
                    onDelete={() => handleRemoveContactDetail(index)}
                  />
                ))}
              </div>
            </div>

            {/* Poster Upload */}
            <div
              {...getRootProps()}
              className="p-6 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant="body2">Drop the image here...</Typography>
              ) : (
                <Typography variant="body2">
                  Drag & Drop or Click to Upload Poster
                </Typography>
              )}
            </div>

            {preview && (
              <div className="relative mt-4">
                <img
                  src={preview}
                  alt="Event Poster Preview"
                  className="object-cover w-full h-64 rounded-lg shadow-lg"
                />
                <IconButton
                  onClick={() => {
                    setPoster(null);
                    setPreview(null);
                  }}
                  className="absolute bg-white rounded-full shadow-md top-2 right-2"
                  size="small"
                >
                  <Delete className="text-red-500" />
                </IconButton>
              </div>
            )}

            <Button type="submit" variant="contained" fullWidth>
              Create Event
            </Button>
          </form>
        </CardContent>
        {/* Toast Container for Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000} // Auto-close after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Card>
    </div>
  );
};

export default EventForm;