import React from "react";

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      
      {/* Cover Image */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute left-6 bottom-[-50px] w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 pt-14 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* User Info */}
          <div className="md:ml-28">
            <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-500 text-sm">@johndoe</p>
            <p className="text-gray-700 mt-2">
              Passionate Developer | Tech Enthusiast | Speaker
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600">
              Follow
            </button>
            <button className="ml-3 border border-gray-400 px-6 py-2 rounded-md font-medium hover:bg-gray-100">
              Message
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center md:justify-start mt-6 space-x-8 text-gray-600">
          <div className="text-center">
            <p className="text-lg font-semibold">250</p>
            <p className="text-sm">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">10.5K</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">540</p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="border-t flex justify-around text-gray-600">
        <button className="py-3 flex-1 hover:bg-gray-100">Posts</button>
        <button className="py-3 flex-1 hover:bg-gray-100">About</button>
        <button className="py-3 flex-1 hover:bg-gray-100">Activity</button>
      </div>
    </div>
  );
};

export default Profile;
