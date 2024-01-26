import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateuserProfileMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

function ProfileComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setImage(userInfo.image);
  }, [userInfo]);

  const [updateProfile, isLoading] = useUpdateuserProfileMutation();
  const dispatch = useDispatch();
  const [uploadProfile] = useUpdateuserProfileMutation();

  async function handleSubmitJob(e) {
    e.preventDefault();
    try {
      const res = await updateProfile({
        firstName,
        lastName,
        email,
        image,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User profile updated");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  const uploadImage = async (e) => {
    const fileStr = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(fileStr);
    try {
      if (image) {
        await uploadProfile(image).unwrap();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="shadow-sm bg-white p-8 md:mx-14 mx-6 my-12 ">
      <h1 className="text-xl sm:text-3xl">Profile</h1>
      <form
        className="lg:grid grid-cols-3 gap-5 mt-10 items-center justify-center"
        onSubmit={handleSubmitJob}
      >
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" first">
            firstName
          </label>
          <input
            type="text"
            id="first"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" last">
            lastName
          </label>
          <input
            type="text"
            id="last"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" pass">
            Password
          </label>
          <input
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm mt-7 lg:mt-0 block" htmlFor=" image">
            Image
          </label>
          <input
            type="file"
            onChange={uploadImage}
            id="image"
            className="w-[100%] py-1 px-3 outline-none border borColor rounded-md"
          />
        </div>

        <div className="pt-8">
          <button
            // disabled={isLoading}
            className="bgColor text-white w-[100%] py-1 rounded-md"
          >
            Update
          </button>
          {!isLoading && (
            <p className="font-semibold text-2xl text-center mt-20 md:text-4xl">
              Updating.....
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfileComponent;
