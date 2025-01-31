import { DashContext } from "../context/DashContext";

const DashNav = () => {
  const { activeMenu, setActiveMenu, } =
    DashContext();


  return (
    <>
      <div className="flex flex-nowrap justify-between items-center h-14 bg-black">
        <p>Learning</p>
      </div>
    </>
  );
};

export default DashNav;
