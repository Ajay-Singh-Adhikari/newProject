import { motion } from "framer-motion";
import { useState } from "react";
import Login from "../assets/login.avif";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/auth/signin`,
        {
          userName: form.userName,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      setForm({ userName: "", password: "" });
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message);
      console.log("Error while login: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tertiary via-[#E8F0E3] to-primary p-6">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row h-full max-h-[650px]">
        <div className="hidden lg:flex w-1/2">
          <img
            src={Login}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-primary text-center mb-6">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-secondary font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  required
                  onChange={handleChange}
                  placeholder="Enter your Username"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-secondary font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <div className="text-left mt-2">
                  <span
                    className="text-sm text-primary font-medium hover:underline cursor-pointer"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>

              {err && <p className="text-red-500">{err}</p>}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-black transition duration-200"
                disabled={loading}
              >
                {loading ? <ClipLoader size={28} color="primary" /> : "Sign In"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-primary cursor-pointer font-semibold hover:underline"
              >
                Sign Up
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
