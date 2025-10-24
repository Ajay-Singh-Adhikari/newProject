import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Dp from "../assets/Dp.webp";
import { IoSendSharp } from "react-icons/io5";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
      console.log("Fetched profile data:", result.data);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading profile...
      </div>
    );
  }
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
    <div className="min-h-screen bg-white text-black flex flex-col items-center relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full px-10 py-8">
        <IoArrowBackOutline
          size={30}
          onClick={() => navigate("/")}
          className="text-secondary cursor-pointer"
        />

        <p className="text-secondary pl-20">@{profileData?.userName}</p>

        {userData?.userName === profileData?.userName ? (
          <button
            className="px-6 py-2 text-red-900 rounded-md hover:bg-red-900 hover:text-white font-medium flex items-center gap-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button className="px-6 py-2 text-secondary rounded-md hover:bg-secondary hover:text-white font-medium flex text-[18px] items-center gap-2">
            Message
          </button>
        )}
      </div>

      {/* Profile Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col max-w-2xl mx-auto items-center w-full mt-4"
      >
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary shadow-lg">
          <img
            src={profileData?.profileImage || Dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="mt-3 text-xl font-semibold text-primary">
          {profileData?.name}
        </h2>
        <p className="text-sm mt-1">{profileData?.profession}</p>
        <p className="text-sm mt-1 text-center">{profileData?.bio}</p>

        {/* Stats Row */}
        <div className="flex justify-center items-end gap-10 mt-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-lg font-semibold text-black">
              {profileData?.postCount || 0}
            </p>
            <p className="text-gray-900 text-[14px] md:text-[18px]">Posts</p>
          </div>

          <div className="flex flex-col justify-end items-center gap-2">
            <Follow count={profileData?.followersCount || 0} />
            <p className="text-gray-900 text-[14px] md:text-[18px]">
              Followers
            </p>
          </div>

          <div className="flex flex-col justify-end items-center gap-2">
            <Follow count={profileData?.followingCount || 0} />
            <p className="text-gray-900 text-[14px] md:text-[18px]">
              Following
            </p>
          </div>
        </div>

        {/* Edit Profile / Follow Button */}
        {userData?.userName === profileData?.userName ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-primary text-white font-medium px-8 py-2 rounded-md shadow-md transition"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </motion.button>
        ) : (
          <div className="flex justify-between px-6 gap-6 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-primary text-white font-medium px-8 py-2 rounded-md shadow-md transition"
            >
              Follow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-primary text-white font-medium px-8 py-2 rounded-md shadow-md transition"
            >
              Message
            </motion.button>{" "}
          </div>
        )}
      </motion.section>

      {/* Content Container */}
      <div className="bg-white border border-gray-400 w-full max-w-[900px] mx-auto my-10 rounded-2xl min-h-[100vh] shadow-inner"></div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-10 z-50 w-max">
        <Navbar />
      </div>
    </div>
  );
}

// Dummy Follow Component
const Follow = ({ count }) => {
  return (
    <div className="flex justify-center gap-[20px] items-center relative h-[40px]">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-400">
        <img src={Dp} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="w-[40px] h-[40px] absolute left-[9px] rounded-full overflow-hidden border-2 border-gray-400">
        <img src={Dp} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="w-[40px] h-[40px] absolute left-[18px] rounded-full overflow-hidden border-2 border-gray-400">
        <img src={Dp} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <p className="text-lg font-semibold text-black">{count}</p>
    </div>
  );
};
