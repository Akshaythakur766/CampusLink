import { DashContext, DashProvider } from "@CampusLink/core";
import { Outlet, } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "@CampusLink/appComponents";

export const TeacherDash = () => {
  return (
    <DashProvider>
      <DashContent />
    </DashProvider>
  );
};

export const DashContent = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    DashContext(); // Use useContext hook to access context
 


  useEffect(() => {    
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);


    
  }, []);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div>
        {/* <div className="w-full h-14 bg-white flex justify-between border-b-2">
          <div className="flex items-center">
            <RxHamburgerMenu
              className="text-4xl ml-4 items-center  "
              onClick={() => {
                setActiveMenu(!activeMenu);
              }}
            />
            <div className="flex items-center ml-4">
              {" "}
              <img src={logo} alt="" className="w-10 h-10" />
              <span>CampusLink</span>
            </div>
          </div>
          <div className="flex items-center mr-3">
            <p>Hi, </p>
            <p>{nname}</p>
            <button onClick={handleLogout} className="btn bg-primary">Logout</button>
          </div>
        </div> */}

        <div className="w-full flex">
          {activeMenu ? <Sidebar /> : <div className="w-0"></div>}
          <div className="w-full bg-slate-100  "style={{ minHeight: '100vh',}}>
            <Outlet />
            {/* <FooterDash/> */}
          </div>
        </div>
      </div>
    </>
  );   
};

export default TeacherDash;
