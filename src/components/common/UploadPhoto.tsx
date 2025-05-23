import React, { useState } from "react";
import { Camera  } from "lucide-react";
import CameraDialog from "./CameraDialog";

const PhotoInput:React.FC = ()=> {
  const [photo, setPhoto] = useState<string | null>(null);

  // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
  //   const file = e?.target?.files?.[0];
  //   if (file) {
  //     setPhoto(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center">
        {photo ? (
          <img
            src={photo}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        ) : (
          <div className="flex flex-col items-center mb-4">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
            <Camera size={24}/>
            </div>
            <p className="text-sm text-gray-500 mt-2">Ambil Photo absen</p>
          </div>
        )}

        {/* sdsds */}

        <CameraDialog/>
      </div>
    </div>
  );
}

export default PhotoInput