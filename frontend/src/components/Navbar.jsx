import React, { useState } from "react";
import { motion } from "framer-motion";
import Dp from "../assets/Dp.webp";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiPlusSquare } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: <GoHomeFill size={28} />, navigateTo: "/" },
    { name: "Search", icon: <FiSearch size={28} />, navigateTo: "/" },
    { name: "Upload", icon: <FiPlusSquare size={28} />, navigateTo: "/" },
    { name: "Continue", icon: <RxVideo size={28} />, navigateTo: "/" },
    {
      name: "Profile",
      icon: (
        <img
          src={Dp}
          alt={"Profile"}
          className="w-6 h-6 rounded-full object-cover ring-1 ring-secondary"
        />
      ),
      navigateTo: `/profile/${userData?.userName}`,
    },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="bg-white/60 backdrop-blur-xl border border-gray-300 
      shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl px-8 py-4 
      flex items-center justify-center space-x-10 z-50 w-full"
    >
      {navItems.map((item, index) => (
        <motion.div
          key={index}
          onClick={() => {
            setActive(item.name);
            navigate(item.navigateTo);
          }}
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex flex-col items-center text-sm font-medium cursor-pointer transition-all 
          ${
            active === item.name
              ? "text-primary drop-shadow-[0_2px_6px_rgba(37,99,235,0.4)]"
              : "text-gray-800 hover:text-primary"
          }`}
        >
          <motion.div
            animate={{
              y: active === item.name ? -2 : 0,
              scale: active === item.name ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {item.icon}
          </motion.div>

          {active === item.name && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -bottom-3 w-1.5 h-1.5 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Navbar;
