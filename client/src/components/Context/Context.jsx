import { createContext, useContext, useState } from "react";

const JobContext = createContext();
function JobProvider({ children }) {
  const [toggle, setToggle] = useState(true);

  const toggleSideBar = () => {
    setToggle((toggle) => !toggle);
  };
  const setTrue = () => {
    setToggle(false);
  };
  const setFalse = () => {
    setToggle(true);
  };

  return (
    <JobContext.Provider
      value={{ setTrue, setFalse, toggle, setToggle, toggleSideBar }}
    >
      {children}
    </JobContext.Provider>
  );
}

export default JobProvider;

function useJob() {
  const context = useContext(JobContext);
  if (context === undefined)
    throw new Error("JobContext was used out of JobProvider");
  return context;
}

export { JobProvider, useJob };
