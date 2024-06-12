import { DashContext } from "../context/DashContext";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState, } from "react";
import axios from "axios";
import logo from '../../public/logo.png';
import './sidebar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  UilCreateDashboard,
  UilClipboardNotes,
  UilPackage,
  UilFileCheckAlt,
  UilCheckCircle
} from '@iconscout/react-unicons';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = DashContext();
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/profile');
        setRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const teacherDashboardLinks = [
    { text: "Dashboard", links: "overview", roles: ['student'], Icon: UilCreateDashboard },
    { text: "Dashboard", links: "overviewTeacher", roles: ['teacher'], Icon: UilCreateDashboard },
    { text: "ClassList", links: "classlist", roles: ['teacher'], Icon: UilClipboardNotes },
    { text: "Take Attendance", links: "takeAttendance", roles: ['teacher'], Icon: UilCheckCircle },
    { text: "Attendance", links: "stClassList", roles: ['student'], Icon: UilPackage },
    { text: "Books", links: "library", roles: ['teacher', 'student'], Icon: UilFileCheckAlt },
    { text: "CODE", links: "permission", roles: ['teacher'], Icon: UilFileCheckAlt }
  ];

  const activeLink = "flex items-center gap-2 pl-4 pt-2.5 pb-2.5 border-l-4 border-slate-700 bg-slate-100 text-md m-0";
  const normalLink = "flex items-center gap-2 pl-4 pt-2.5 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-1 md:overflow-hidden overflow-auto md:hover:overflow-auto flex flex-col justify-between sidebar-custom">
      <nav className="flex flex-col bg-white">
        <div className="flex items-center ml-4 Link-custom">
          <img src={logo} alt="" className="w-10 h-10" />
          <span>CampusLink</span>
        </div>
        {/* nav */}
        <ul className="flex-1">
          { teacherDashboardLinks.map((link) => (
            link.roles.includes(role) && (
              <li key={link.links} className="sidebar-links fw-bold">
                <NavLink
                  to={link.links}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <link.Icon style={{ gap: 1 }} /> {link.text}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>

      {/* bottom */}
      <div className="border-t p-3">
        <div className="flex justify-between items-center ml-3">
          <div>
            <button onClick={handleLogout}><LogoutIcon /> Logout</button>
          </div>
          {/* <BsThreeDotsVertical /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
