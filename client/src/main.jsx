import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/Home/HomePage.jsx";
import PageNotFound from "./Pages/PageNotFound/PageNotFound.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Stats from "./Pages/Stats/Stats.jsx";
import AllJobs from "./Pages/AllJobs/AllJobs.jsx";
import EditJob from "./Pages/EditJob/EditJob.jsx";
import { JobProvider } from "./components/Context/Context.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/profile" element={<Profile />}></Route>
        <Route path="/dashboard/stats" element={<Stats />}></Route>
        <Route path="/dashboard/alljob" element={<AllJobs />}></Route>
        <Route path="/dashboard/editjob/:id" element={<EditJob />}></Route>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <JobProvider>
        <RouterProvider router={router} />
      </JobProvider>
    </Provider>
  </React.StrictMode>
);
