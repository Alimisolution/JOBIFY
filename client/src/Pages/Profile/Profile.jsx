import BigSideBar from "../../components/BigSideBar/BigSideBar";
import { useJob } from "../../components/Context/Context";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import TopMenu from "../../components/TopMenu/TopMenu";

function Profile() {
  const { toggle } = useJob();

  return (
    <section className="flex ">
      {toggle && <BigSideBar />}
      <SmallSideBar />
      <div className=" w-[100%]">
        <TopMenu />
        <ProfileComponent />
      </div>
    </section>
  );
}

export default Profile;
