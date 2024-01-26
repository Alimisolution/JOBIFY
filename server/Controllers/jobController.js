import Job from "../Models/jobModel.js";
import asyncHandler from "../MiddleWare/asyncHanler.js";

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json(jobs);
});

const getJobByID = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createJbb = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    _id: job._id,
    position: job.position,
    company: job.company,
    status: job.status,
    location: job.location,
    type: job.type,
  });
});

const deleteJbb = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (job) {
    res.status(401).json("Job succefully deleted");
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const updateJbb = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (job) {
    res.status(201).json({
      _id: job._id,
      position: job.position,
      company: job.company,
      status: job.status,
      location: job.location,
      type: job.type,
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getAllJobs, getJobByID, createJbb, deleteJbb, updateJbb };
