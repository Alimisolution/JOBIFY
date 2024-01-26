import BigSideBar from "../../components/BigSideBar/BigSideBar";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import AddJob from "../../components/AddJob/AddJob";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useJob } from "../../components/Context/Context";

function Dashboard() {
  const { toggle } = useJob();

  return (
    <section className="flex ">
      {toggle && <BigSideBar />}
      <SmallSideBar />
      <div className=" w-[100%]">
        <TopMenu />
        <AddJob />
      </div>
    </section>
  );
}

export default Dashboard;
