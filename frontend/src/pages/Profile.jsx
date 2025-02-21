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
    <div className="flex items-center justify-center min-h-screen p-6 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative w-full max-w-3xl p-6 overflow-hidden bg-white shadow-2xl bg-opacity-10 backdrop-blur-md rounded-2xl">
        {/* Cover Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-700 to-purple-800 rounded-xl">
          <div className="absolute left-6 bottom-[-50px] w-28 h-28 rounded-full border-4 border-gray-800 overflow-hidden group">
            <img src={profile.profilePic} alt="Profile" className="object-cover w-full h-full" />
            <label className="absolute inset-0 flex items-center justify-center transition bg-black bg-opacity-50 opacity-0 cursor-pointer group-hover:opacity-100">
              <Camera className="w-6 h-6 text-white" />
              <input type="file" className="hidden" onChange={handleProfilePicChange} />
            </label>
          </div>
          <button className="absolute p-2 transition bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-75" onClick={() => setIsOpen(true)}>
            <Pencil className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 pt-12 text-center">
          <h2 className="text-3xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-400">{profile.username}</p>
          <p className="mt-2 text-gray-300">{profile.bio}</p>
          <p className="mt-2 text-gray-400">Signed in with: {profile.authMethod}</p>
          <p className="mt-4 text-sm italic text-gray-400">{profile.description}</p>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 mb-3 text-white bg-gray-800 border border-gray-700 rounded-lg" />
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 mb-3 text-white bg-gray-800 border border-gray-700 rounded-lg" />
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 mb-3 text-white bg-gray-800 border border-gray-700 rounded-lg" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 mb-3 text-white bg-gray-800 border border-gray-700 rounded-lg" />
              <button onClick={handleSubmit} className="w-full px-5 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
  