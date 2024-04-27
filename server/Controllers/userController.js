import User from "../Models/userModel.js";
import asyncHandler from "../MiddleWare/asyncHanler.js";
import generateToken from "../utils/generateToken.js";
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
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
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
    user.image = req.body.image || user.image;
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
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const uploadFile = asyncHandler(async (req, res) => {
  const profile = req.files.image;
  const fileName = profile.name;

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
