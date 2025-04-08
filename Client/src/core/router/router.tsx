import {
  About,
  AskedBook,
  AvailableBook,
  ClassList,
  Contact,
  Feature,
  Homepage,
  Library,
  Login,
  OtpAttendance,
  Overview,
  OverviewLibrarian,
  OverviewStaff,
  OverviewTeacher,
  Permission,
  Sidebar,
  StCLassList,
  StudentList,
  TakeAttendance,
  ViewAttdRecord,
  ViewAttendance,
  ViewTechAttendance,
} from "@CampusLink/appComponents";
import { createBrowserRouter } from "react-router-dom";
// import { MainLayout } from  '@CampusLink/core';
import { Home, TeacherDash } from "@CampusLink/pages";
import { Outlet } from "react-router/dist";
import { ThemeProvider } from "@CampusLink/core";
import * as React from "react";
import { Toaster } from "react-hot-toast";

 const MainLayout = () => {
  const [Theme, setTheme] = React.useState("light");

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
export const router = createBrowserRouter([
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
