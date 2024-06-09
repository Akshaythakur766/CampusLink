import { DashContext } from "../context/DashContext";

const DashNav = () => {
  const { activeMenu, setActiveMenu, } =
    DashContext();


  return (
    <>
      <div className="flex flex-nowrap justify-between items-center h-14 bg-black">
        <p>shdkj</p>
      </div>
    </>
  );
};

export default DashNav;
