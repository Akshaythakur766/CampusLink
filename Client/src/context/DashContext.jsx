import { useState, createContext, useContext } from "react";

const StateContext = createContext();

export const DashProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, screenSize, setScreenSize }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const DashContext = () => useContext(StateContext);
