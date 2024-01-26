import {
  MdOutlinePendingActions,
  MdOutlineInterpreterMode,
} from "react-icons/md";
import { GrEject } from "react-icons/gr";
import { useAllJobsQuery } from "../../slices/jobApiSlice";

function StatsComponent() {
  const { data: Jobs, isLoading, error } = useAllJobsQuery();

  const pending = Jobs?.reduce(
    (init, cur) => (cur.status === "pending" ? init + 1 : init),
    0
  );
  const interview = Jobs?.reduce(
    (init, cur) => (cur.status === "interview" ? init + 1 : init),
    0
  );
  const declined = Jobs?.reduce(
    (init, cur) => (cur.status === "declined" ? init + 1 : init),
    0
  );

  return (
    <div>
      {isLoading ? (
        <p className="text-4xl font-semibold text-center mt-16">Loading...</p>
      ) : error ? (
        <p className="text-4xl font-semibold text-center mt-16">Error...</p>
      ) : (
        <>
          <div className="shadow-sm md:mx-14 mx-4 my-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="px-8 py-10 bg-white borPen">
              <div className="flex justify-between items-center">
                <span className="text-5xl font-bold pen">{pending}</span>
                <MdOutlinePendingActions className="bgPen p-2 text-5xl text-white font-bold" />
              </div>
              <p className="text-xl mt-5">Pending Applications</p>
            </div>
            <div className="px-8 py-10 bg-white borInter">
              <div className="flex justify-between items-center ">
                <span className="text-5xl font-bold inter">{interview}</span>
                <MdOutlineInterpreterMode className="bgInter p-2 text-5xl text-white font-bold" />
              </div>
              <p className="text-xl mt-5">Interview Scheduled</p>
            </div>
            <div className="px-8 py-10 bg-white borDec">
              <div className="flex justify-between items-center ">
                <span className="text-5xl font-bold dec">{declined}</span>
                <GrEject className="bgDec p-2 text-5xl text-white font-bold" />
              </div>
              <p className="text-xl mt-5">Jobs Declined</p>
            </div>
          </div>
          <p>{Jobs.createdAt}</p>
        </>
      )}
    </div>
  );
}

export default StatsComponent;
