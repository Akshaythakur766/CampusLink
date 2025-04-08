import { Outlet } from "react-router-dom";
import { Darkmode, Footer, Navbar } from "@CampusLink/appComponents";
export const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Darkmode />
    </>
  );
};

export default Home;
