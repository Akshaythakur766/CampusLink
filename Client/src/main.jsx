import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { ThemeContext } from "./context/ThemeContext";
import Homepage from "./components/Homepage";
import About from "./components/About";
import TeacherDash from "./pages/TeacherDash";
import Overview from "./components/Overview";
import Feature from "./components/Feature";
import Contact from "./components/Contact";
import { UserContextProvider } from "./context/Refresh";
import ClassList from "./components/TeacherView/TeacherClassList";
import { Toaster } from "react-hot-toast";
import ViewAttdRecord from "./components/TeacherView/ViewAttendenceRecord";
import StudentList from "./components/TeacherView/StudentList";
import ViewAttendance from "./components/StudentView/Attendence/ViewAttendence";
import StCLassList from "./components/StudentView/classList/StCLassList";
import OtpAttendance from "./components/OtpAttendance";
import OverviewTeacher from "./components/OverviewTeacher";
import TakeAttendance from "./components/TeacherView/TakeAttendance";
import ViewTechAttendance from "./components/TeacherView/ViewTeahAttendance";
import Library from "./components/Library";
import Permission from "./components/StaffView/Permission";
import OverviewStaff from "./components/OverviewStaff";
import OverviewLibrarian from "./components/OverviewLibrarian";
import AvailableBook from "./components/AvailableBook";
import AskedBook from "./components/AskedBook";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

const MainLayout = () => {
  const [Theme, setTheme] = useState("light");

  return (
    <>
      <ThemeProvider>
        <div className={` ${Theme}`}>
          <Outlet />
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        </div>
      </ThemeProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/feature",
            element: <Feature />,
          },

          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/side",
            element: <Sidebar />,
          },
        ],
      },
      {
        path: "/dashboard/",
        element: <TeacherDash />,
        children: [
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "overviewTeacher",
            element: <OverviewTeacher />,
          },
          {
            path: "overviewSt",
            element: <OverviewStaff />,
          },
          {
            path: "overviewLib",
            element: <OverviewLibrarian />,
          },
          {
            path: "classlist/",
            element: <ClassList />,
          },
          {
            path: "takeAttendance/",
            element: <TakeAttendance />,
          },
          {
            path: "viewTechAttendance/",
            element: <ViewTechAttendance />,
          },
          {
            path: "studentList",
            element: <StudentList />,
          },
          {
            path: "ViewAttendenceRecord",
            element: <ViewAttdRecord />,
          },
          {
            path: "ViewAttendence",
            element: <ViewAttendance />,
          },
          {
            path: "stClassList",
            element: <StCLassList />,
          },
          {
            path: "otpAttendance",
            element: <OtpAttendance />,
          },
          {
            path: "library",
            element: <Library />,
          },
          {
            path: "reqbooks",
            element: <AvailableBook />,
          },
          {
            path: "askedbooks",
            element: <AskedBook />,
          },
          {
            path: "permission",
            element: <Permission />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
