import User from "../Models/userModel.js";
import asyncHandler from "../MiddleWare/asyncHanler.js";
import generateToken from "../utils/generateToken.js";
import path from "path";
import sendmails from "../sendMail.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or pasword");
  }
});

const RegisterUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;
  sendmails(email);
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User Already exist" });
  }
  const regUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    image,
  });
  generateToken(res, regUser._id);
  res.status(201).json({
    _id: regUser._id,
    firstName: regUser.firstName,
    lastName: regUser.lastName,
    email: regUser.email,
    image: regUser.image,
    isAdmin: regUser.isAdmin,
  });
});

const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out succesfully" });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.image = req.body.image || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateuser = await user.save();
    res.status(200).json({
      _id: updateuser._id,
      firstName: updateuser.firstName,
      lastName: updateuser.lastName,
      email: updateuser.email,
      image: updateuser.image,
      isAdmin: updateuser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const uploadFile = asyncHandler(async (req, res) => {
  const profile = req.files.image;
  const fileName = `${req.user._id}${path.extname(profile.name)}`;
  const fileSize = profile.size / 1000;
  const fileExt = profile.name.split(".")[1];
  if (fileSize > 500) {
    res.status(500);
    throw new Error("file size must not be more than 500kb");
  }
  if (!["jpg", "png", "jpeg"].includes(fileExt)) {
    res.status(500);
    throw new Error("file extension must png, jpg or jpeg");
  }
  profile.mv(`uploads/${fileName}`, (err) => {
    if (err) {
      res.status(500);
      throw new Error("Interner server error");
    }
  });
  res.status(200).json({
    data: { file: `${req.protocol}://${req.get("host")}/${fileName}` },
  });
});
export {
  authUser,
  LogoutUser,
  RegisterUser,
  updateUserProfile,
  getUserProfile,
  uploadFile,
};
