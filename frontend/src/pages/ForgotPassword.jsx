import React, { useState } from "react";
import { motion } from "framer-motion";
import forgotPass from "../assets/forgotPass.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return setErr("Password does not match !");
    }
    setErr("");
    setLoading(true);
    if (step == 1) {
      try {
        const result = await axios.post(
          `${serverUrl}/auth/sendOtp`,
          { email: form.email },
          { withCredentials: true }
        );
        console.log(result.data);
        setStep(2);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErr(error.response?.data?.message);
        setLoading(false);
      }
    } else if (step == 2) {
      try {
        const result = await axios.post(
          `${serverUrl}/auth/verifyOtp`,
          { email: form.email, otp: form.otp },
          { withCredentials: true }
        );
        console.log(result.data);
        setStep(3);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErr(error.response?.data?.message);
        setLoading(false);
      }
    } else if (step == 3) {
      try {
        const result = await axios.post(
          `${serverUrl}/auth/resetPassword`,
          { email: form.email, password: form.newPassword },
          { withCredentials: true }
        );
        console.log(result.data);
        navigate("/signin");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErr(error.response?.data?.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tertiary via-[#E8F0E3] to-primary p-6">
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row h-full max-h-[650px]">
        {/* Left Side (Image) */}
        <div className="hidden lg:flex w-1/2">
          <img
            src={forgotPass}
            alt="Forgot Password Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-primary text-center mb-6">
              Forgot Password
            </h2>

            <form onSubmit={handleNext} className="space-y-5">
              {step === 1 && (
                <div>
                  <label className="block text-secondary font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-secondary font-medium">
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP sent to your email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-secondary font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-secondary font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      required
                    />
                  </div>
                </>
              )}
              {err && <p className="text-red-500">{err}</p>}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-primary hover:bg-black text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                {step === 1
                  ? "Send OTP"
                  : step === 2
                  ? "Verify OTP"
                  : "Reset Password"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Remembered your password?{" "}
              <a
                onClick={() => navigate("/signin")}
                className="text-primary cursor-pointer font-semibold hover:underline"
              >
                Log In
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
