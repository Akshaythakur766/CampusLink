import { useContext, useState } from "react";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
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
              <BedtimeIcon className="text-xl" />
            ) : (
              <WbSunnyIcon className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Darkmode;
