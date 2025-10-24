import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Dp from "../assets/Dp.webp";
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || Dp
  );
  const [backendImage, setBackendImage] = useState(null);

  const imageInput = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("profession", profession);
      formData.append("bio", bio);
      formData.append("gender", gender);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/user/editProfile`,
        formData,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate(`/profile/${result.data.userName}`);
    } catch (error) {
      setErr(error.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col gap-[20px]">
      {/* Header */}
      <div className="flex justify-between items-center w-full px-4 lg:px-10 pt-8">
        <div className="flex gap-2 items-center justify-center">
          <IoArrowBackOutline
            size={30}
            onClick={() => navigate(`/profile/${userData?.userName}`)}
            className="cursor-pointer text-secondary"
          />
          <h2 className="text-primary font-semibold lg:text-xl">
            Edit Profile
          </h2>
        </div>
      </div>

      {/* Profile Pic */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col max-w-2xl mx-auto items-center w-full"
      >
        <div
          className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary shadow-lg cursor-pointer"
          onClick={() => imageInput.current.click()}
        >
          <img
            src={frontendImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 flex flex-col items-center">
          <label
            htmlFor="dp"
            className="text-sm font-medium text-red-900 cursor-pointer hover:underline"
          >
            Change your profile image
          </label>
          <input
            id="dp"
            type="file"
            accept="image/*"
            ref={imageInput}
            className="hidden"
            onChange={handleImage}
          />
        </div>
      </motion.section>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 w-full max-w-2xl p-6"
      >
        <div className="flex flex-col">
          <label className="text-sm text-primary mb-1">Full Name</label>
          <input
            type="text"
            className="border rounded-lg p-2 focus:outline-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary mb-1">Username</label>
          <input
            type="text"
            className="border rounded-lg p-2 focus:outline-primary"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary mb-1">Profession</label>
          <input
            type="text"
            className="border rounded-lg p-2 focus:outline-primary"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Enter your profession"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary mb-1">Bio</label>
          <textarea
            className="border rounded-lg p-2 focus:outline-primary"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary mb-1">Gender</label>
          <select
            className="border rounded-lg p-2 focus:outline-primary"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {err && <p className="text-red-500">{err}</p>}
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded-lg shadow hover:opacity-90 transition my-6"
        >
          {loading ? <ClipLoader size={30}/> : "Save Profile"}
        </button>
      </motion.form>
    </div>
  );
};

export default EditProfile;
