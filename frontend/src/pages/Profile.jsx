import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, X, Camera } from "lucide-react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Passionate Developer | Tech Enthusiast | Speaker",
    description: "Building software solutions that matter. Open source enthusiast and community contributor.",
    authMethod: "Google",
    profilePic: "https://via.placeholder.com/150"
  });
  const [formData, setFormData] = useState({ ...profile });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setProfile({ ...formData, profilePic: newProfilePic || profile.profilePic });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-6 relative">
        {/* Cover Section */}
        <div className="h-48 bg-gradient-to-r from-indigo-700 to-purple-800 rounded-xl relative overflow-hidden">
          <div className="absolute left-6 bottom-[-50px] w-28 h-28 rounded-full border-4 border-gray-800 overflow-hidden group">
            <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
            <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
              <Camera className="h-6 w-6 text-white" />
              <input type="file" className="hidden" onChange={handleProfilePicChange} />
            </label>
          </div>
          <button className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition" onClick={() => setIsOpen(true)}>
            <Pencil className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 pt-12 text-center">
          <h2 className="text-3xl font-semibold">{profile.name}</h2>
          <p className="text-gray-400 text-sm">{profile.username}</p>
          <p className="text-gray-300 mt-2">{profile.bio}</p>
          <p className="text-gray-400 mt-2">Signed in with: {profile.authMethod}</p>
          <p className="text-gray-400 mt-4 text-sm italic">{profile.description}</p>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded-lg mb-3" />
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded-lg mb-3" />
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded-lg mb-3" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded-lg mb-3" />
              <button onClick={handleSubmit} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 w-full transition">Save Changes</button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
