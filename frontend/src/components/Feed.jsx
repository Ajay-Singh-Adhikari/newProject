import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import StoryCard from "./StoryCard";
import Logo from "../assets/vibe3.png";

const Feed = () => {
  return (
    <>
      {/* ---------- Feed Section ---------- */}
      <div className="lg:w-[50%] w-full min-h-[100vh] lg:h-[100vh] no-scrollbar relative lg:overflow-y-auto p-6 pb-40 mx-auto">
        {/* ---------- Top Section (Logo + Icon) ---------- */}
        <div className="flex lg:hidden justify-between items-center mb-12">
          <img src={Logo} alt="Logo" className="w-24" />
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <FaRegHeart size={22} className="text-gray-700" />
          </button>
        </div>

        {/* ---------- Stories Section ---------- */}
        <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto mb-6 px-1 no-scrollbar">
          <StoryCard userName={"Ajay"}/>
          <StoryCard userName={"Ajay"}/>
          <StoryCard userName={"Ajafgtrgtegrgtgtgrtgtgtgtgtgy"}/>
          <StoryCard userName={"Ajay"}/>
          <StoryCard userName={"Ajay"}/>
        </div>

        {/* ---------- Example Post 1 ---------- */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border shadow-md p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-secondary">Ajay</h3>
              <p className="text-sm text-gray-500">2h ago</p>
            </div>
          </div>
          <p className="text-gray-700 mb-3">
            Just built a new React project with Tailwind 🎉 #coding
          </p>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
            alt="Post"
            className="w-full rounded-lg"
          />
        </div>

        {/* ---------- Example Post 2 ---------- */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border shadow-md p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/150?img=4"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-secondary">Simran</h3>
              <p className="text-sm text-gray-500">5h ago</p>
            </div>
          </div>
          <p className="text-gray-700 mb-3">
            Coffee + Code ☕ = Perfect Morning!
          </p>
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Post"
            className="w-full rounded-lg"
          />
        </div>

        {/* ---------- Example Post 3 ---------- */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border shadow-md p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/150?img=2"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-secondary">Priya</h3>
              <p className="text-sm text-gray-500">1d ago</p>
            </div>
          </div>
          <p className="text-gray-700 mb-3">
            Weekend vibes 🌸 — chilling and sketching!
          </p>
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
            alt="Post"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* ---------- Floating Navbar (Global Centered) ---------- */}
      <div className="fixed bottom-2 lg:bottom-10 z-50 w-max">
        <Navbar />
      </div>
    </>
  );
};

export default Feed;
