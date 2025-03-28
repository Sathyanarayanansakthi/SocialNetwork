import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const navigate = useNavigate();
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
  const [registrationLink, setRegistrationLink] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
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
    
    if (!eventName || !eventType || !location || !collegeName || !eventDescription) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("eventType", eventType);
    formData.append("location", location);
    formData.append("collegeName", collegeName);
    formData.append("eventDescription", eventDescription);
    if (poster) formData.append("poster", poster);
    if (contactDetails.length > 0) {
      formData.append("contactDetails", JSON.stringify(contactDetails));
    }
    if (registrationLink) {
      formData.append("registrationLink", registrationLink);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message || "Event created successfully!");
      
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An error occurred while creating the event."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="relative w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <IconButton className="absolute top-4 right-4" onClick={() => navigate(-1)}>
          <Close />
        </IconButton>
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
            <TextField
              fullWidth
              label="Registration Link"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
            />

            <div className="space-y-2">
              <Select
                fullWidth
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Contact Type</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
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
              <Button 
                variant="outlined" 
                onClick={handleAddContactDetail}
                disabled={!contactType || !contactValue}
              >
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

            <div
              {...getRootProps()}
              className="p-6 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant="body2">Drop the image here...</Typography>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadFile className="mb-2" />
                  <Typography variant="body2">
                    Drag & Drop or Click to Upload Poster
                  </Typography>
                  <Typography variant="caption" className="mt-1">
                    (JPEG, PNG, GIF - Max 5MB)
                  </Typography>
                </div>
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

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              className="mt-4"
            >
              Create Event
            </Button>
          </form>
        </CardContent>
        <ToastContainer
          position="top-right"
          autoClose={3000}
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