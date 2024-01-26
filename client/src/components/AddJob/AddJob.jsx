import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateJobMutation } from "../../slices/jobApiSlice";
import { toast } from "react-toastify";

function AddJb() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("pending");
  const [type, setType] = useState("full-time");

  const navigate = useNavigate();
  const [createJob] = useCreateJobMutation();

  async function handleSubmitJob(e) {
    e.preventDefault();
    if (!position || !company || !location) {
      toast.error("All job credentials are required");
    } else {
      try {
        await createJob({ position, company, status, type, location }).unwrap();
        toast.success("Job successfully Added");
        navigate("/dashboard/alljob");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  }

  return (
    <div className="shadow-sm bg-white p-8 md:mx-20 mx-6 my-12 ">
      <h1 className="text-xl sm:text-3xl">Add Job</h1>
      <form
        className="lg:grid grid-cols-3 gap-5 mt-10 items-center justify-center"
        onSubmit={handleSubmitJob}
      >
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" posi">
            Position
          </label>
          <input
            type="text"
            id="posi"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" com">
            Company
          </label>
          <input
            type="text"
            id="com"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" loca">
            Job Location
          </label>
          <input
            type="text"
            id="loca"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" status">
            Job Status
          </label>
          <select
            id="status"
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" type">
            Job Type
          </label>
          <select
            id="type"
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="intership">intership</option>
          </select>
        </div>
        <div className="pt-8">
          <button className="bgColor text-white w-[100%] py-1 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJb;
