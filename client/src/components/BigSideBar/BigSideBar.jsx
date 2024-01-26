import { NavLink, useNavigate } from "react-router-dom";
import { MdAddChart, MdWorkHistory } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { GiMusicalNotes } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";

function BigSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  async function Logout(e) {
    e.preventDefault();
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("User Logging Out");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }
  return (
    <div className="hidden lg:block lg:w-1/5 bg-white h-screen px-6 md:px-12 py-6 shadow-md ">
      <div className="flex gap-4 items-center mb-10 sm:mb-14 ">
        <img src="/img/favicon.png" alt="logo-img" className="w-12" />
        <span className="font-bold text-2xl tracking-wider txt">JOBIFY</span>
      </div>
      <div className="space-y-12 mt-10">
        <NavLink
          to="/dashboard"
          className="flex transition-all duration-300 hover:pl-4 text-[.95rem] gap-4 items-center font-semibold text-gray-500"
        >
          <MdAddChart className="text-2xl" />
          <span>Add Job</span>
        </NavLink>
        <NavLink
          to="/dashboard/alljob"
          className="flex transition-all duration-300 hover:pl-4 text-[.95rem] gap-4 items-center font-semibold text-gray-500"
        >
          <MdWorkHistory className="text-2xl" />
          <span>All Jobs</span>
        </NavLink>
        <NavLink
          to="/dashboard/stats"
          className="flex transition-all duration-300 hover:pl-4 text-[.95rem] gap-4 items-center font-semibold text-gray-500"
        >
          <GiMusicalNotes className="text-2xl" />
          <span>Stats</span>
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className="flex transition-all duration-300 hover:pl-4 text-[.95rem] gap-4 items-center font-semibold text-gray-500"
        >
          <ImProfile className="text-2xl" />
          <span>Profile</span>
        </NavLink>
        <button
          onClick={Logout}
          className="flex transition-all duration-300 hover:pl-4 text-[.95rem] gap-4 items-center font-semibold text-gray-500"
        >
          <AiOutlineLogout className="text-2xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default BigSideBar;
