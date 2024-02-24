import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerUser] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  async function handleSubmitRegister(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Password do not match");
    } else if (password.length < 8) {
      toast.error("User password must be at least 8 characters");
    } else if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
    } else {
      try {
        const res = await registerUser({
          firstName,
          lastName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/dashboard");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  }

  return (
    <div className="md:w-[500px] w-[90%] mx-auto borTop  flex flex-col justify-center bg-white shadow-lg h-2/3 mt-16 py-2 px-6 mb-8">
      <h1 className="text-3xl text-yellow-900 font-semibold mb-7 text-center pt-10">
        Register
      </h1>
      <form className="space-y-10 mb-3 ">
        <input
          placeholder="Enter First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className=" font-semibold focus:outline-none borColor rounded-sm block px-5 py-2 w-[100%]"
        />
        <input
          placeholder="Enter Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className=" font-semibold focus:outline-none borColor rounded-sm block px-5 py-2 w-[100%]"
        />
        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" font-semibold focus:outline-none borColor rounded-sm block px-5 py-2 w-[100%]"
        />
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" font-semibold focus:outline-none borColor rounded-sm block px-5 py-2 w-[100%]"
        />
        <input
          placeholder="Enter ConfrimPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className=" font-semibold focus:outline-none borColor rounded-sm block px-5 py-2 w-[100%]"
        />

        <button
          onClick={handleSubmitRegister}
          className="bgColor block w-[100%] py-2  font-semibold text-xl text-center text-white"
        >
          Register
        </button>
      </form>
      <p className="font-semibold pb-10">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
