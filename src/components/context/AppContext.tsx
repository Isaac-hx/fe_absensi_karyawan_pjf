import React, { createContext, useState } from "react";

interface AppData {
  employee_id?: string;
  target_work?: string;
  result_work?: string;
  location?: string;
  file_profile?: File | null;
  preview_photo?:string;
}

interface AppContextType {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

export const AppContext = createContext<AppContextType>({
  data: {}, // Default data awal
  setData: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>({
    employee_id:"",
    target_work:"",
    result_work:"",
    location: "",
    file_profile:null, // Inisialisasi nilai awal untuk menghindari undefined
    preview_photo:""
  });

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
