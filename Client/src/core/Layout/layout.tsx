import { Outlet } from "react-router/dist";
import { ThemeProvider } from "../context/ThemeContext";
import * as React from 'react'
import { Toaster } from "react-hot-toast";


export const MainLayout = () => {
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