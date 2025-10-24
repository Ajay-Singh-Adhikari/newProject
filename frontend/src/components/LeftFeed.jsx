import React from "react";
import { FaRegHeart } from "react-icons/fa";
import OtherUser from "./OtherUser";
import Logo from "../assets/vibe3.png";
import { useDispatch, useSelector } from "react-redux";
import Dp from "../assets/Dp.webp";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const LeftFeed = () => {
  const dispatch = useDispatch();
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[25%] hidden lg:flex flex-col min-h-[100vh] border-l border-gray-200 bg-white/80 backdrop-blur-md shadow-md p-6">
      {/* -------- Header -------- */}
      <div className="flex justify-between items-center mb-8">
        <img src={Logo} alt="Logo" className="w-24" />
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <FaRegHeart size={22} className="text-gray-700" />
        </button>
      </div>

      {/* -------- Current User Card (Dummy) -------- */}
      <div className="flex items-center justify-between bg-white rounded-xl p-3 border shadow-sm hover:shadow-md transition-all mb-5">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={userData.profileImage || Dp}
            alt={userData.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {userData.userName}
            </span>
            <span className="text-xs text-gray-500">{userData.name}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-900  hover:bg-red-900  hover:text-white px-4 py-1.5 rounded-full transition"
        >
          Log Out
        </button>
      </div>

      <hr />

      {/* -------- Suggested Users -------- */}
      <h2 className="text-xl font-semibold text-primary my-5">
        Suggested Users
      </h2>

      <div className="space-y-4">
        {suggestedUsers && suggestedUsers.slice(0,3).map((user, index) => (
          <OtherUser key={index} user={user} />
        ))}
      </div>

      {/* -------- Footer Section -------- */}
      <div className="mt-12 text-xs text-gray-500 leading-relaxed">
        <p>About · Help · Terms · Privacy</p>
        <p className="mt-2">© 2025 Be_Social</p>
      </div>
    </div>
  );
};

export default LeftFeed;
