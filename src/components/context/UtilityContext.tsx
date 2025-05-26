import React, { createContext, useState } from "react";

interface UtilityContextType {
  activeSidebar: boolean;
  setActiveSidebar: (state: boolean) => void; // Fungsi menerima argumen boolean
  menuState:string
  setMenuState:(state:string)=>void
  loading:boolean
  setLoading:(state:boolean)=>void
}
export const UtilityContext = createContext<UtilityContextType>({
  activeSidebar: false,
  setActiveSidebar: () => {
    // Default fungsi kosong  
  },
  menuState:"",
  setMenuState:()=>{},

  loading:false,
  setLoading:()=>{}
});


export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [activeSidebar, setActiveSidebar] = useState<boolean>(true);
  const [menuState, setMenuState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UtilityContext.Provider value={{activeSidebar,setActiveSidebar,menuState,setMenuState,loading,setLoading }}>
      {children}
    </UtilityContext.Provider>
  );
};
