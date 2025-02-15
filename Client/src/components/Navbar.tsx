import { Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState,   useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Navbar = ({ Mode }:{Mode?:boolean}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [role,setRole]=useState(null)
  // const { role,  } = useContext(UserContext);


  useEffect(() => {
    fetchData();
}, []);
// Function to fetch user data
async function fetchData() {
    try {
        const response = await axios.get('/profile');
        setRole(response.data.role);
    } catch (error) {
      console.log(error)
    }
}

  const moveLogin = async () => {
    if (role === 'teacher')   {
      navigate('/dashboard/overviewTeacher');}
      else if( role === 'student') {
        navigate('/dashboard/overview');
    } else {
      navigate('/login');
    }
  };

  const responseMobile = "absolute gap-[5vh] flex flex-col w-1/2 right-0 top-[71px] rounded-b-lg p-2 items-center justify-center border-solid border-x-2 border-b-4 border-sky-500 z-20 bg-background dark:bg-text";

  const ChangeIcon = () => {
    setOpen(!open);
  };

  const navItem = [
    { link: "/", path: "Home" },
    { link: "feature", path: "Feature" },
    { link: "About", path: "About" },
    { link: "Contact", path: "Contact" },
  ];

  return (
    <>
      <div className={`flex justify-between dark:bg-text dark:text-background border-b fixed top-0 left-0 right-0 z-50 bg-white`}>
        <div className="flex items-center">
          <div className="w-[90px] p-2">
            <Link to="/">
              <img src={'/logo.png'} alt="emt" />
            </Link>
          </div>
          <div>
            {Mode ? (
              <Link to="/">
                <img
                  src={'/Darklogo1.png'}
                  alt="emt"
                  className="hidden md:block h-[60px] object-cover"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src={'/logo12.png'}
                  alt="emt"
                  className="hidden md:block h-[60px] object-cover"
                />
              </Link>
            )}
          </div>
        </div>
        <ul className={`${open ? responseMobile : "hidden"} sm:flex sm:w-full sm:justify-center sm:gap-[8vw] sm:items-center`}>
          {navItem.map((value, i) => (
            <li key={i}>
              <Link
                to={value.link}
                className="font-semibold text-xl relative inline cursor-pointer before:bg-violet-600 before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
              >
                {value.path}
              </Link>
            </li>
          ))}
          {location.pathname === "/login" ? null : (
            <div className="justify-end">
              <Button
                label="Login"
                className="rounded-3xl"
                onClick={moveLogin}
              ></Button>
            </div>
          )}
        </ul>
        <div>
          {open ? (
            <CloseIcon
              onClick={ChangeIcon}
              className="absolute text-4xl z-10 right-5 top-5 sm:hidden"
            />
          ) : (
            <MenuIcon
              onClick={ChangeIcon}
              className="absolute text-3xl z-10 right-5 top-5 sm:hidden"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
