import React, { createContext, useState } from "react";

interface AppData {
  employee_id?: string;
  target_work?: string;
  result_work?: string;
  location?: string;
  url_photo?: File | null;
  signature_image?: any;
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
    signature_image:"",
    location: "",
    url_photo:null, // Inisialisasi nilai awal untuk menghindari undefined
    preview_photo:""
  });

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
