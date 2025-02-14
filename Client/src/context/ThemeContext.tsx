import * as React from "react";
import { createContext } from "react";
import { ThemeContextType } from "./types";

export const ThemeContext = createContext<ThemeContextType>({
    Theme:"light",
    setTheme:()=>{}
});

export const ThemeProvider=({children}:{children:React.ReactNode})=>{
      const [Theme, setTheme] = React.useState("light");
    
    return(
        <ThemeContext.Provider value={{ Theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}