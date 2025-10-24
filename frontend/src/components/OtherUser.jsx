import React from "react";
import Dp from "../assets/Dp.webp";
import { useNavigate } from "react-router-dom";

const OtherUser = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-3 border shadow-sm hover:shadow-md transition-all">
      <div
        onClick={() => navigate(`/profile/${user.userName}`)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={user.profileImage || Dp}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{user.userName}</span>
          <span className="text-xs text-gray-500">{user.name}</span>
        </div>
      </div>
      <button className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-full hover:bg-black transition">
        Follow
      </button>
    </div>
  );
};

export default OtherUser;
