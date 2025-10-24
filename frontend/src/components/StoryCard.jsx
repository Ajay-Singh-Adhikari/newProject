import React, { useState } from "react";
import Dp from "../assets/Dp.webp";

const StoryCard = ({ profileImage, userName }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      onClick={() => {
        setActive(true);
      }}
      className="flex flex-col items-center cursor-pointer flex-shrink-0"
    >
      <div
        className={`w-16 h-16 rounded-full p-[2px] flex border-2 ${
          active ? "border-gray-300" : "border-secondary"
        }  items-center justify-center`}
      >
        <div className="bg-white p-[2px] rounded-full">
          <img
            src={profileImage || Dp}
            alt={userName}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs w-16 text-center mt-1 truncate text-gray-600">{userName}</p>
    </div>
  );
};

export default StoryCard;
