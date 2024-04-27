import express from "express";

import { protect } from "../MiddleWare/protectMiddleWare.js";

import {
  authUser,
  RegisterUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
  uploadFile,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/logout", LogoutUser);
router.post("/register", RegisterUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .post(protect, uploadFile)
  .patch(protect, updateUserProfile);

export default router;
