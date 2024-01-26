import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [LoginUser] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await LoginUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  return (
    <div className="md:w-[500px] w-[90%] mx-auto borTop  flex flex-col justify-center bg-white shadow-lg h-2/3 mt-16 py-8 px-6">
      <h1 className="text-3xl text-yellow-900 font-semibold mb-7 text-center pt-10">
        Login
      </h1>
      <form className="space-y-10 mb-3 " onSubmit={handleLogin}>
        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="font-semibold focus:outline-none borColor focus:ring focus:ring-yellow-900 rounded-sm block px-5 py-2 w-[100%]"
        />

        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-semibold focus:outline-none borColor focus:ring focus:ring-yellow-900 rounded-sm block px-5 py-2 w-[100%]"
        />
        <button className="bgColor block w-[100%] py-2  font-semibold text-xl text-center text-white">
          Login
        </button>
      </form>
      <p className="font-semibold pb-10">
        Do not have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
