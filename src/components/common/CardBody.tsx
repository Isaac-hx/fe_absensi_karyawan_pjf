import React, { useEffect, useRef, useContext } from "react";
import Input from "./Input";
import InputPhoto from "./PhotoInput";
import { MapPin } from "@phosphor-icons/react";
import { AppContext } from "../context/AppContext";
import SignaturePad from "./SignaturePad";

interface ICardBody {
  sigCanvas: React.RefObject<any>;
}

const CardBody: React.FC<ICardBody> = ({ sigCanvas }) => {
  const { data, setData } = useContext(AppContext);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setData((prevData) => ({
            ...prevData,
            location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`,
          }));
        },
        () => {
          setData((prevData) => ({
            ...prevData,
            location: "Unable to detect location",
          }));
        }
      );
    } else {
      setData((prevData) => ({
        ...prevData,
        location: "Geolocation not supported in your browser!",
      }));
    }
  }, [setData]);

  // Clear signature canvas and reset signature image
  const handleClearSignature = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setData((prevData) => ({
        ...prevData,
        signature_image: null,
      }));
    }
  };

  // Handle photo input change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setData((prevData) => ({
        ...prevData,
        url_photo: URL.createObjectURL(file), // Fixed to match the data structure
      }));
    }
  };

  // Handle input or textarea changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="space-y-4 md:grid md:grid-cols-2 gap-2">
        <div>
          <Input
            className="py-2 pl-1"
            labelText="ID Karyawan"
            idInput="employee_id"
            placeholder="Masukan ID Karyawan"
            type="text"
            onChangeInput={handleChange}
          />
        </div>
        <div>
          <SignaturePad
            textLabel="Ttd Karyawan"
            handleClearSignature={handleClearSignature}
            sigCanvas={sigCanvas}
          />
        </div>
        <div>
          <InputPhoto
            handlePhotoChange={handlePhotoChange}
          />
        </div>
        <div>
          <Input
            labelText="Target Pekerjaan"
            idInput="target_work"
            placeholder="Masukan target Pekerjaan..."
            as="textarea"
            rows={6}
            onChangeInput={handleChange}
          />
        </div>
        <div className="relative">
          <Input
    labelText="Lokasi saat ini"
    idInput="current_location"
    className="border border-slate-200 pl-3 pr-10 py-2 rounded-lg w-full"
    placeholder="Lokasi saat ini"
    value={data?.location || "Memuat lokasi..."} // Tambahkan fallback jika lokasi belum di-set
    readonly={true}    
          />
          <MapPin className="absolute top-2/3 right-3 md:top-[32%] transform -translate-y-1/2 text-gray-500" />
        </div>
        <div>
          <Input
            labelText="Hasil Pekerjaan"
            idInput="result_work"
            placeholder="Masukan hasil Pekerjaan..."
            as="textarea"
            rows={6}
            onChangeInput={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default CardBody;
