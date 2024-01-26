// import { FaCalculator, FaIntercom, FaLocationArrow } from "react-icons/fa";
// import { Link } from "react-router-dom";
// function JobsComponent({ job }) {
//   return (
//     <div className="bg-white shadow-md px-6 py-6">
//       <div className="flex items-center gap-10">
//         <h1 className="text-xl  bgColor px-5 py-3 rounded-md text-white font-semibold sm:text-3xl">
//           G
//         </h1>
//         <div>
//           <span className="text-2xl ">{job.position}</span>
//           <p className="text-gray-500 mt-1">{job.company}</p>
//         </div>
//       </div>
//       <div className="flex gap-20 md:gap-32 mt-8">
//         <div className="flex items-center gap-4">
//           <FaLocationArrow className="text-gray-500" />
//           <p>{job.location}</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <FaCalculator className="text-gray-500 mt-1" />
//           <p>{job.createdAt}</p>
//         </div>
//       </div>
//       <div className="flex gap-20 md:gap-32 mt-8">
//         <div className="flex items-center gap-4">
//           <FaIntercom className="text-gray-500" />
//           <p>{job.type}</p>
//         </div>
//         <p className="bgPen px-8 text-white py-1">{job.status}</p>
//       </div>
//       <div className="mt-10 flex gap-3">
//         <Link
//           to={`/dashboard/editjob/${job._id}`}
//           className="bgColor py-1 px-4 rounded-md text-white font-semibold"
//         >
//           Edit
//         </Link>
//         <button className="bgColor py-1 px-4 rounded-md text-white font-semibold">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default JobsComponent;
