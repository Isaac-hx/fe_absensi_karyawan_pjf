import React, { createContext, useState } from "react";

interface UtilityContextType {
  activeSidebar: boolean;
  setActiveSidebar: (state: boolean) => void; // Fungsi menerima argumen boolean
}
export const UtilityContext = createContext<UtilityContextType>({
  activeSidebar: false,
  setActiveSidebar: () => {
    // Default fungsi kosong  
  },
});


export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [activeSidebar, setActiveSidebar] = useState<boolean>(true);

  return (
    <UtilityContext.Provider value={{activeSidebar,setActiveSidebar }}>
      {children}
    </UtilityContext.Provider>
  );``
};
