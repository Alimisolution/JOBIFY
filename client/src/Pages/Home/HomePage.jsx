import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="px-6 md:px-24 h-screen gap-4 grid md:grid-cols-2 justify-center items-center">
      <div>
        <div className="flex gap-4 items-center mb-10 sm:mb-14 ">
          <img src="/img/favicon.png" alt="logo-img" className="w-12" />
          <span className="font-bold text-2xl tracking-wider txt">JOBIFY</span>
        </div>
        <div className="space-y-7">
          <h1 className="font-bold text-3xl sm:text-6xl">
            Job <span className="text-[#00B0FF]">Tracking </span>App
          </h1>

          <p className="md:text-lg">
            Welcome to Jobify, the leading platform that connects job seekers
            with their dream careers. Whether you are a recent graduate, a
            seasoned professional, or someone looking for a career change,
            Jobify is here to help you find the perfect job opportunity that
            matches your skills, experience, and aspirations.
          </p>
          <div className="space-x-4 mt-3">
            <Link
              className="text-sm sm:text-lg bgColor rounded-md py-2 px-8 font-semibold text-white"
              to="/register"
            >
              Register
            </Link>
            <Link
              className="text-sm sm:text-lg bgColor rounded-md py-2 px-8 font-semibold text-white"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <img src="/img/banner.png" className="hidden md:block" alt="banner-img" />
    </section>
  );
}

export default HomePage;
