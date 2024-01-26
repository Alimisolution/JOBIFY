import BigSideBar from "../../components/BigSideBar/BigSideBar";
import EditJobs from "../../components/EditJobComponent/EditJobComponent";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useJob } from "../../components/Context/Context";

function EditJob() {
  const { toggle } = useJob();
  return (
    <section className="flex ">
      {toggle && <BigSideBar />}
      <SmallSideBar />
      <div className=" w-[100%]">
        <TopMenu />
        <EditJobs />
      </div>
    </section>
  );
}

export default EditJob;
