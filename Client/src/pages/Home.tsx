import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Darkmode from "../components/Darkmode";

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
