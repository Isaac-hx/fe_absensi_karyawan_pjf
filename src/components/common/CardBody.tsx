import React, { useEffect, useContext, useState } from "react";
import { MapPin, Webcam } from "lucide-react";
import { AppContext } from "../context/AppContext";
import SignaturePad from "./SignaturePad";
import Swal from "sweetalert2";
import PhotoInput from "./UploadPhoto";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import Signature from '@uiw/react-signature';

import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { AbsenFormValues } from "@/data/absen";

//Interface component
interface ICardBody {
  sigCanvas: React.RefObject<any>;
  register: UseFormRegister<AbsenFormValues>;
  error:any;
  setValue:UseFormSetValue<AbsenFormValues>
  photo:string | null;
  setPhoto:React.Dispatch<React.SetStateAction<string | null>>
}

const CardBody: React.FC<ICardBody> = ({ sigCanvas,register,error,setValue,photo,setPhoto}) => {
    const { data, setData } = useContext(AppContext);
    const [showTargetWork,SetShowTargetWork] = useState(false)
    const [location,setLocation] = useState("")
  // Get user's current location
  useEffect(() => {
    /**
     * Checks the current hour and updates the state to show the target work section
     * if the current time is between 5 AM (inclusive) and 10 AM (exclusive).
     *
     * @remarks
     * This function retrieves the current hour using `Date.getHours()` and calls
     * `SetShowTargetWork` with `true` if the hour is between 5 and 9, otherwise `false`.
     */
    const checkTime = ()=>{
        const currentHour = new Date().getHours()
        SetShowTargetWork(currentHour >= 5 && currentHour <10)

    }
    checkTime()
    const interval = setInterval(checkTime,6000);
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationValue = `Lat: ${latitude}, Lng: ${longitude}`;
          setLocation(locationValue); // Perbarui state lokal
          setValue("location", locationValue); // Perbarui nilai register
        },
        () => {
          const errorLocation = "Gagal mendapatkan lokasi!";
          setLocation(errorLocation);
          setValue("location", errorLocation); // Perbarui nilai register
        }
      );
    } else {
      const notSupported = "Geolocation not supported in your browser!";
      setLocation(notSupported);
      setValue("location", notSupported); // Perbarui nilai register
    }

    return () => clearInterval(interval);

  }, [location]);

  // Clear signature canvas and reset signature image
  const handleClearSignature = () => {
    alert("dihapus")
    sigCanvas.current.clear();

  };





  return (
    <>
      <div className="space-y-4 md:grid md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="employee_id">
            ID Karyawan
          </Label>
          <Input
            className="border border-emerald-200 pl-3 pr-10 py-2 rounded-lg focus:ring-0 focus:border-0 w-full text-xs md:text-sm"
              placeholder="Masukan ID Karyawan"
            id="employee_id"
            {...register("employee_id", {
            required: "ID Karyawan can't be empty",
            })}
            
          />
          {error.employee_id &&(
            <p className="text-red-500 text-xs">{error.employee_id.message}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="signature">
            Tanda tangan karyawan
          </Label>
          <SignaturePad
            handleClearSignature={handleClearSignature}
            sigCanvas={sigCanvas}
          />
        </div>
        <div>
         <PhotoInput  photo={photo} setPhoto={setPhoto}/>
        </div>
        
        <div className="relative space-y-2">
          <Label htmlFor="location">
            Lokasi saat ini
          </Label>

          <Input
          id="location"
          className="border border-emerald-200 pl-3 pr-10 py-2 rounded-lg w-full text-xs md:text-sm"
          placeholder="Lokasi saat ini"
          value={location || "Memuat lokasi..."} // Tambahkan fallback jika lokasi belum di-set
          readOnly={true} 
           {...register("location",{required:"Location can't be empty!,please refresh!!"})} 
          />
          <MapPin className="absolute  right-3 bottom-[8%]  md:top-0 md:top-[14%] transform -tranemerald-y-1/2 text-gray-500" />
        </div>
        {showTargetWork &&
                <div className="md:col-span-2 space-y-2">
                <Label htmlFor="target_work">
                    Target Pekerjaan
                </Label>
                <Textarea
                  id="target_work"
                  placeholder="Masukan target Pekerjaan..."
                  rows={8}
                  {...register("target_work", {
                    required: "Target Pekerjaan can't be empty",
                  })}
                />
                {error.target_work &&(
                  <p className="text-red-500 text-xs">{error.target_work.message}</p>)}
              </div>}


        {!showTargetWork && 
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="result_work">
                    Hasil Pekerjaan
                  </Label>
                <Textarea
                className="text-xs sm:text-sm"
                  id="result_work"
                  placeholder="Masukan hasil Pekerjaan..."
                  rows={6}
                  cols={10}
                  {...register("result_work", {
                    required: "Hasil Pekerjaan can't be empty",
                  })}
                  
                />
                {error.result_work &&(
                  <p className="text-red-500 text-xs">{error.result_work.message}</p>)}
              </div>}

      </div>
    </>
  );
};

export default CardBody;
