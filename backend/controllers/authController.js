import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/Mail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist !" });
    }
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res
        .status(400)
        .json({ success: false, message: "UserName already exist !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignUp error : ${error}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found !" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long !",
      });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect credentials !" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignIn error : ${error}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "SignOut Successfull !" });
  } catch (error) {
    return res.status(500).json({ message: `SignOut error : ${error}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    (user.resetOtp = otp),
      (user.otpExpires = Date.now() + 5 * 60 * 1000),
      (user.isOtpVerified = false);
    await user.save();
    sendMail(email, otp);
    return res.status(200).json({ message: "Email sent successfully !" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Eror while sending Otp : ${error}` });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    if (
      user.resetOtp.toString() !== otp.toString() ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid Or Expired Otp !" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Otp verified" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while verifying the Otp : ${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "Otp verification required !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `SignOut error : ${error}` });
  }
};
