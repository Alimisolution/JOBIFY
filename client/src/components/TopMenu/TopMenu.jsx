import { FaBars } from "react-icons/fa";
import { useJob } from "../Context/Context";
import { useSelector } from "react-redux";

function TopMenu() {
  const { setTrue, toggleSideBar } = useJob();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center bg-white shadow-md  px-4 md:px-12 py-6">
      <FaBars
        className="txt font-semibold text-3xl hidden lg:block cursor-pointer"
        onClick={toggleSideBar}
      />
      <FaBars
        className="txt font-semibold text-2xl block lg:hidden cursor-pointer"
        onClick={setTrue}
      />
      <h1 className=" text-3xl tracking-wider text-gray-500 hidden lg:block">
        Dashboard
      </h1>
      <div className="flex gap-2 items-center justify-center lg:hidden">
        <img src="/img/favicon.png" alt="logo-img" className="w-6" />
        <span className="font-bold text-lg tracking-wider txt">JOBIFY</span>
      </div>
      <div className="flex gap-3 items-center relative ">
        <img
          src={userInfo.image}
          alt={userInfo.lastName}
          className="w-10 h-10 rounded-full"
        />

        <button className="bgColor  py-1 px-5 rounded-md text-white font-semibold text-sm tracking-widest">
          {userInfo.firstName}
        </button>
      </div>
    </div>
  );
}

export default TopMenu;
