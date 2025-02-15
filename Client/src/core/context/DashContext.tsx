import { useState, createContext, useContext, ReactNode } from "react";
import { DashContextType } from "./types";


export const StateContext = createContext<DashContextType>({
  activeMenu: false,
  setActiveMenu: () => undefined,
  screenSize: null,
  setScreenSize: () => undefined,
});

export const DashProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, screenSize, setScreenSize }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const DashContext = () => useContext(StateContext);
