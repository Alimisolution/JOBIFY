import AllJobsComponent from "../../components/AllJobsComponent/AllJobsComponent";
import BigSideBar from "../../components/BigSideBar/BigSideBar";
import { useJob } from "../../components/Context/Context";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import TopMenu from "../../components/TopMenu/TopMenu";

function AllJobs() {
  const { toggle } = useJob();
  return (
    <section className="flex ">
      {toggle && <BigSideBar />}
      <SmallSideBar />
      <div className=" w-[100%]">
        <TopMenu />
        <AllJobsComponent />
      </div>
    </section>
  );
}

export default AllJobs;
