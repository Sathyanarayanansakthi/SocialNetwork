import { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    description: "",
    profilePic: "https://via.placeholder.com/150",
    loginMethod: "",
  });

  const [formData, setFormData] = useState({ ...profile });
  const [newProfilePic, setNewProfilePic] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        // Set profile data
        setProfile({
          name: userData.username,
          email: userData.email,
          bio: userData.bio || "",
          description: userData.description || "",
          profilePic: userData.profilePic || "https://via.placeholder.com/150",
          loginMethod: userData.authMethod,
        });

        setFormData({
          name: userData.username,
          bio: userData.bio || "",
          description: userData.description || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
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

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedProfile = {
        ...formData,
        profilePic: newProfilePic || profile.profilePic,
      };

      await axios.put("/api/auth", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile((prevProfile) => ({
        ...prevProfile,
        ...formData,
        profilePic: newProfilePic || prevProfile.profilePic,
      }));
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg text-gray-200">
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={profile.profilePic}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-500 p-1 rounded-full cursor-pointer hover:bg-indigo-600">
              <input type="file" hidden onChange={handleProfilePicChange} />
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 3h6a1 1 0 01.8.4l1.2 1.6H16a1 1 0 011 1v6H3V8a1 1..."></path>
              </svg>
            </label>
          </div>

          {/* User Details */}
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-400">{profile.email}</p>
            <p className="text-indigo-400 capitalize">{profile.loginMethod} Login</p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Section */}
        {isOpen && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-200"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-200"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-200"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
