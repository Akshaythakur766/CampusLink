export interface RefreshContextType {
    role:string;
    refresh:boolean;
    setrefresh:Dispatch<SetStateAction<boolean>>
    refresh1:boolean;
    setrefresh1:Dispatch<SetStateAction<boolean>>
    refresh2:boolean;
    setrefresh2:Dispatch<SetStateAction<boolean>>
    name:string;
    refresh3:boolean;
    setrefresh3:Dispatch<SetStateAction<boolean>>
}


export interface ThemeContextType {
    Theme:string
    setTheme:Dispatch<SetStateAction<string>>
}

export interface DashContextType{
    activeMenu:boolean;
    setActiveMenu:Dispatch<SetStateAction<boolean>>
    screenSize:number| null
    setScreenSize:Dispatch<SetStateAction<number>>
}