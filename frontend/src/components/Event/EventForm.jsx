import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { UploadFile, Description, Close } from "@mui/icons-material";

const EventForm = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [poster, setPoster] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setPoster(acceptedFiles[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("eventType", eventType);
    formData.append("location", location);
    formData.append("collegeName", collegeName);
    formData.append("eventDescription", eventDescription);
    if (poster) {
      formData.append("poster", poster);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      setEventName("");
      setEventType("");
      setLocation("");
      setCollegeName("");
      setEventDescription("");
      setPoster(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating event");
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
            <TextField fullWidth label="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            <TextField fullWidth label="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)} required />
            <TextField fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <TextField fullWidth label="College Name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required />
            <TextField fullWidth label="Event Description" multiline rows={3} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
            
            {/* File Upload */}
            <div {...getRootProps()} className="p-6 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="flex flex-col items-center">
                  <UploadFile className="text-blue-500" fontSize="large" />
                  <Typography variant="body2">Drop the image here...</Typography>
                </div>
              ) : poster ? (
                <div className="flex items-center space-x-2">
                  <Description className="text-green-500" />
                  <Typography variant="body2">{poster.name}</Typography>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadFile className="text-gray-500" fontSize="large" />
                  <Typography variant="body2">Drag & Drop or Click to Upload Poster</Typography>
                </div>
              )}
            </div>
            
            <Button type="submit" variant="contained" fullWidth>
              Create Event
            </Button>
          </form>
        </CardContent>
        <ToastContainer position="top-right" autoClose={3000} />
      </Card>
    </div>
  );
};

export default EventForm;