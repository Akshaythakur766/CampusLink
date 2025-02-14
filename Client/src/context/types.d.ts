export interface RefreshContextType {
    role:string;
    refresh:boolean;
    setrefresh:(e:boolean)=>void;
    refresh1:boolean;
    setrefresh1:(e:boolean)=>void;
    refresh2:boolean;
    setrefresh2:(e:boolean)=>void;
    name:string;
    refresh3:boolean;
    setrefresh3:(e:boolean)=>void
}


export interface ThemeContextType {
    Theme:string
    setTheme:(e:string)=>void
}

export interface DashContextType{
    activeMenu:boolean;
    setActiveMenu:(e:boolean)=>void
    screenSize:string
    setScreenSize:(e:string)=>void
}