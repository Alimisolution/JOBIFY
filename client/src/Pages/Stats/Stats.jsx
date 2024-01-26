import BigSideBar from "../../components/BigSideBar/BigSideBar";
import { useJob } from "../../components/Context/Context";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import StatsComponent from "../../components/StatsComponent/StatsComponent";
import TopMenu from "../../components/TopMenu/TopMenu";

function Stats() {
  const { toggle } = useJob();

  return (
    <section className="flex ">
      {toggle && <BigSideBar />}
      <SmallSideBar />
      <div className=" w-[100%]">
        <TopMenu />
        <StatsComponent />
      </div>
    </section>
  );
}

export default Stats;
