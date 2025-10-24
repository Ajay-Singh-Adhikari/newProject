import React from "react";
import { FaEllipsisH, FaSearch } from "react-icons/fa";

const RightFeed = () => {
  return (
    <div className="w-[25%] hidden lg:flex flex-col min-h-[100vh] border-r border-primary/60 bg-white/80 backdrop-blur-md shadow-md p-6">
      {/* ---------- Header ---------- */}
        <h2 className="text-2xl font-bold text-primary mb-8">Messages</h2>
      

      <div
        className="bg-gray-200 flex items-center gap-3 px-4 py-2 mb-8 rounded-md 
    ring-1 ring-primary/60 focus-within:ring-2 focus-within:ring-primary 
    transition-all duration-200"
      >
        <FaSearch className="text-primary text-lg" />
        <input
          type="text"
          placeholder="Search User..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* ---------- Online Users Scroll ---------- */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        <div className="relative flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/50?img=1"
            alt="Aditi"
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
          />
          <span className="absolute bottom-1 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          <p className="text-xs text-gray-600 mt-1">Aditi</p>
        </div>

        <div className="relative flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/50?img=2"
            alt="Rohan"
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
          />
          <span className="absolute bottom-1 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          <p className="text-xs text-gray-600 mt-1">Rohan</p>
        </div>

        <div className="relative flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/50?img=3"
            alt="Simran"
            className="w-12 h-12 rounded-full border-2 border-primary object-cover"
          />
          <span className="absolute bottom-1 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          <p className="text-xs text-gray-600 mt-1">Simran</p>
        </div>
      </div>

      {/* ---------- Divider ---------- */}
      <div className="border-t border-gray-300 mb-4"></div>

      {/* ---------- Chat List ---------- */}
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200">
          <img
            src="https://i.pravatar.cc/50?img=1"
            alt="Aditi"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Aditi</h3>
              <span className="text-xs text-gray-400">2m</span>
            </div>
            <p className="text-sm text-gray-600 truncate">Hey! What’s up?</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200">
          <img
            src="https://i.pravatar.cc/50?img=2"
            alt="Rohan"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Rohan</h3>
              <span className="text-xs text-gray-400">10m</span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              Let’s catch up tomorrow.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200">
          <img
            src="https://i.pravatar.cc/50?img=3"
            alt="Simran"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Simran</h3>
              <span className="text-xs text-gray-400">1h</span>
            </div>
            <p className="text-sm text-gray-600 truncate">Typing...</p>
          </div>
        </div>
      </div>

      {/* ---------- Logout Button ---------- */}
      <div className="mt-auto pt-8">
        <button className="w-full bg-primary text-white font-medium py-2 rounded-full hover:bg-black transition-all duration-200">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default RightFeed;
