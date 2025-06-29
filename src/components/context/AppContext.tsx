import React, { createContext, useEffect, useState } from "react";

interface AppData {
  employee_id?: string;
  target_work?: string;
  result_work?: string;
  location?: string;
  file_profile?: File | null;
  preview_photo?: string;
}

interface UserDataLogin {
  id?: number | null;
  username?: string;
}



interface AppContextType {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  globalUser: UserDataLogin;
  setGlobalUser: React.Dispatch<React.SetStateAction<UserDataLogin>>;
}

export const AppContext = createContext<AppContextType>({
  data: {},
  setData: () => {},
  globalUser: { id: null, username: "" },
  setGlobalUser: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>({
    employee_id: "",
    target_work: "",
    result_work: "",
    location: "",
    file_profile: null,
    preview_photo: "",
  });


   const [globalUser, setGlobalUser] = useState<UserDataLogin>(() => {
    // Load initial state from localStorage
    const storedUser = localStorage.getItem("globalUser");
    return storedUser ? JSON.parse(storedUser) : { id: null, username: "" };
  });

  useEffect(() => {
    // Save globalUser to localStorage whenever it changes
    localStorage.setItem("globalUser", JSON.stringify(globalUser));
  }, [globalUser]);

  return (
    <AppContext.Provider value={{ data, setData, globalUser, setGlobalUser }}>
      {children}
    </AppContext.Provider>
  );
};
