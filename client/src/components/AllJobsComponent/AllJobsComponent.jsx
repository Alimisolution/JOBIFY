import { useState } from "react";
import { FaCalculator, FaIntercom, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useAllJobsQuery,
  useDeleteJobMutation,
} from "../../slices/jobApiSlice";
import { toast } from "react-toastify";

function AllJobsComponent() {
  const [seacrh, setSearch] = useState("");
  const { data: Jobs, isLoading, error, refetch } = useAllJobsQuery();

  const [deleteJob] = useDeleteJobMutation();

  async function deleteJobHandle(jobId) {
    if (window.confirm("Are you sure you want to delete this job")) {
      try {
        await deleteJob(jobId);
        refetch, toast.success("Deleting job");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  }

  const seachQuery =
    seacrh.length > 0
      ? Jobs.filter((job) =>
          `${job.position}`.toLowerCase().includes(`${seacrh}`.toLowerCase())
        )
      : Jobs;

  return (
    <>
      {isLoading ? (
        <p className="text-4xl font-semibold text-center my-20">Loading...</p>
      ) : error ? (
        <p className="text-4xl font-semibold text-center my-20">Error 🌋🍰🍰</p>
      ) : (
        <div>
          <div className="shadow-sm bg-white p-8 md:mx-14 mx-6 my-12 ">
            <h1 className="text-xl sm:text-3xl mb-5">Search Job</h1>
            <input
              type="text"
              value={seacrh}
              onChange={(e) => setSearch(e.target.value)}
              className="font-semibold focus:outline-none borColor focus:ring focus:ring-yellow-900 rounded-sm block px-5 py-2 md:w-[40%] w-[100%]"
            />
          </div>
          <div className="md:mx-14 mx-6">
            <h1 className="text-xl font-bold sm:text-2xl">
              {seachQuery.length} Jobs found
            </h1>
            <div className=" grid md:grid-cols-2 gap-6 mt-5">
              {seachQuery.map((job) => (
                <div className="bg-white shadow-md px-6 py-6" key={job._id}>
                  <div className="flex items-center gap-10">
                    <h1 className="text-lg  bgColor px-3 py-1 rounded-md text-white font-bold sm:text-3xl">
                      {job.position[0].toUpperCase()}
                    </h1>
                    <div>
                      <span className="md:text-2xl text-xl ">
                        {job.position}
                      </span>
                      <p className="text-gray-500 mt-1">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-20 md:gap-32 mt-8">
                    <div className="flex items-center gap-4">
                      <FaLocationArrow className="text-gray-500" />
                      <p>{job.location}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaCalculator className="text-gray-500 mt-1" />
                      <p>{job.createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                  <div className="flex gap-20 md:gap-32 mt-8">
                    <div className="flex items-center gap-4">
                      <FaIntercom className="text-gray-500" />
                      <p>{job.type}</p>
                    </div>

                    <p
                      className={
                        job.status === "pending"
                          ? "bgPen px-5 md:py-2 py-1 text-white "
                          : job.status === "interview"
                          ? "bgInter px-5 md:py-2 py-1 text-white "
                          : job.status === "declined"
                          ? "bgDec px-5 md:py-2 py-1 text-white "
                          : null
                      }
                    >
                      {job.status}
                    </p>
                  </div>
                  <div className="mt-10 flex gap-3">
                    <Link
                      to={`/dashboard/editjob/${job._id}`}
                      className="bgColor py-1 px-4 rounded-md text-white font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteJobHandle(job._id)}
                      className="bgColor py-1 px-4 rounded-md text-white font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllJobsComponent;
