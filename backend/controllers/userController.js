import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error : ${error}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get suggested user error : ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    const sameUserWithUsername = await User.findOne({ userName }).select(
      "-password"
    );
    if (sameUserWithUsername && sameUserWithUsername._id != req.userId) {
      return res.status(400).json({ message: "Username already exists !" });
    }
    let profileImage;
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
      user.profileImage = profileImage;
    }
    user.name = name;
    user.userName = userName;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Edit profile error : ${error}` });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get profile error : ${error}` });
  }
};
