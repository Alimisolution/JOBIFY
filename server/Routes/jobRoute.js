import express from "express";
const router = express.Router();
import {
  getAllJobs,
  getJobByID,
  createJbb,
  deleteJbb,
  updateJbb,
} from "../Controllers/jobController.js";
import { protect } from "../MiddleWare/protectMiddleWare.js";
router.route("/").get(protect, getAllJobs).post(protect, createJbb);
router
  .route("/:id")
  .get(protect, getJobByID)
  .delete(protect, deleteJbb)
  .patch(protect, updateJbb);
export default router;
