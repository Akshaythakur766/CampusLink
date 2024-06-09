import { useContext, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";

const Darkmode = () => {
  const [Mode, setMode] = useState(false);
  const { Theme, setTheme } = useContext(ThemeContext);

  const toggleMode = () => {
    setMode(!Mode);
    if (Mode == true) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <div className=" fixed bottom-2 right-2   ">
        <div className="flex items-center mx-2">
          <button
            className="bg-neutral-900 dark:bg-neutral-300 text-white dark:text-black h-10 w-10  rounded-full flex items-center justify-center hover:ring-1 "
            onClick={toggleMode}
          >
            {Theme == "light" ? (
              <FaMoon className="text-xl" />
            ) : (
              <IoSunny className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Darkmode;
