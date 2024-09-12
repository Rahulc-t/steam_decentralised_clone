import React from 'react';
import avatar from '../images/avatar.jpg'; // Ensure you have this image in your directory

const Profile = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Profile Section */}
      <div className="flex items-center bg-gray-800 p-4 rounded-md shadow-lg">
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-700"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">rahulct500</h1>
          <p className="text-gray-400">Rahul</p>
          <p className="text-sm mt-2">hushhhhhhhhhhhh....</p>
        </div>
      </div>

      {/* Level and Badges */}
      <div className="mt-8 bg-gray-800 p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold">Level 2</h2>
        <p className="text-gray-400">You can feature one of your badges here. Select one from your edit profile page.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition">
          Edit Profile
        </button>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-gray-800 p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-4">
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-4">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/80" // Replace with game thumbnail
                alt="Game"
                className="w-16 h-16 rounded-md"
              />
              <div className="ml-4">
                <h3 className="font-bold">FIFA 22</h3>
                <p className="text-sm text-gray-400">44 hrs on record</p>
                <p className="text-xs text-gray-500">Last played on 21 Mar, 2023</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Achievement Progress</p>
              <p className="text-gray-400">8 of 37</p>
            </div>
          </div>
          {/* Repeat above block for other games */}
        </div>
      </div>

      {/* Badge and Games Section */}
      <div className="mt-8 bg-gray-800 p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold">Badges</h2>
        <div className="flex mt-4 space-x-4">
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-400">Badges</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-gray-400">Games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
