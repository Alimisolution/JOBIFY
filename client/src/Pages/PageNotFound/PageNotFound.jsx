import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <h1 className="sm:text-9xl font-bold text-7xl  text-blue-500">404</h1>
      <p className="text-2xl mb-6">Page not found</p>
      <Link
        to="/"
        className="bg-blue-500 font-semibold py-1 px-4 rounded-md hover:bg-blue-400 text-white transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFound;
