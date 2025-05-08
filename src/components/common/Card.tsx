import React,{useState,useEffect,useRef} from "react"
import { Clock,ClockAfternoon,Camera, MapPin  } from "@phosphor-icons/react";
import Input from "./Input";
import SignatureCanvas from "react-signature-canvas";


const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [location, setLocation] = useState("Location detected automatically...");
    const [signatureImage,setSignatureImage]= useState(null)
    const sigCanvas = useRef(null)
    const handleClearSignature=(e)=>{
        e.preventDefault()
        sigCanvas.current.clear()
        setSignatureImage(null)
        
    }
    const handleSaveSignature = () => {
        const signatureData = sigCanvas.current.toDataURL("image/png"); // Dapatkan gambar Base64
        setSignatureImage(signatureData); // Simpan gambar di state
      };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
        },
        () => {
          setLocation("Unable to detect location.");
        }
      );
    } else {
      setLocation("Geolocation is not supported by your browser.");
    }
  }, []);
      const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
        const file = e?.target?.files?.[0];
        if (file) {
          setPhoto(URL.createObjectURL(file));
        }
      };
    return (
        <div className="w-3/4 rounded-md shadow-sm mx-auto p-4">
            {/* Start Header section */}
            <section className="space-y-2">
                <div>
                    <h1 className="font-medium text-xl">Absensi Karyawan</h1>
                </div>
                <div className="space-y-2 md:space-y-0 md:space-x-1 md:flex md:gap-2" >
                    <div className="flex p-1 items-center gap-1 bg-gray-100 rounded-full ">
                        <Clock size={20}/>
                        <p className="text-xs  font-semibold" >Absen masuk : 05.00 AM - 10.00 AM</p>
                    </div>
                    <div className="flex p-1 items-center gap-1 bg-gray-100 rounded-full ">
                        <ClockAfternoon size={22}/>
                        <p className="text-xs  font-semibold" >Absen pulang : 05.00 AM - 03.00 PM</p>
                    </div>
                </div>
            </section>
            {/* End Header section */}
            
            <hr className="my-3 text-slate-100 "/>

            {/* Start body section */}
            <section className="">
                <form className="space-y-4 md:grid md:grid-cols-2 gap-2" action="">
                    <div  >
                        <Input className="py-2 pl-1" labelText="ID Karyawan" idInput="employee_id" placeholder="Masukan ID Karyawan" type="text"/>
                    </div>
                    
                    <div>
                        <p className="font-medium text-sm">Foto absen</p>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer">
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
                                    <p className="text-sm text-gray-500 mt-2">Upload or capture your photo</p>
                                </div>
                                )}

                                {/* sdsds */}
                                <Input  labelText="Upload photo" idInput="upload_photo" placeholder="Upload foto absen" type="file" onChangeInput={handlePhotoChange} accept="image/*" className="hidden"/>                            
                                </div>
                    </div>
                    <div className="relative">
                        <Input
                            labelText="Lokasi saat ini"
                            idInput="current_location"
                            type="text"
                            value={location}
                            className="border border-slate-200 pl-3 pr-10 py-2 rounded-lg w-full "
                            readonly={true}
                            placeholder="Lokasi saat ini"
                        />
                        <MapPin className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        <div className="space-y-1 relative">
                            {/* Label */}
                            <p className="font-medium text-sm">Ttd Karyawan</p>

                            {/* Signature Canvas */}
                            <div className="relative">
                                <SignatureCanvas
                                ref={sigCanvas}
                                backgroundColor="rgba(0, 0, 0, 0.05)"
                                penColor="black"
                                canvasProps={{ height: 200, className: "sigCanvas w-full rounded-md" }}
                                />

                                {/* Clear Button */}
                                <button
                                onClick={(e) => handleClearSignature(e)}
                                className="absolute bottom-2 right-2 bg-slate-500 text-white text-sm px-4 py-1 rounded hover:bg-slate-600 focus:outline-none"
                                >
                                Clear
                                </button>
                            </div>
                        </div>
                        <div>
                            <Input
                                labelText="Target Pekerjaan"
                                idInput="target_work"
                                placeholder="Masukan target Pekerjaan..."
                                as="textarea"
                                rows={6}
                                onChangeInput={(e) => console.log(e.target.value)}/>
                        </div>
                        <div>
                            <Input
                                labelText="Hasil Pekerjaan"
                                idInput="result_work"
                                placeholder="Masukan hasil Pekerjaan..."
                                as="textarea"
                                rows={6}
                                onChangeInput={(e) => console.log(e.target.value)}/>
                        </div>
                       

                </form>
                <div className=" flex justify-center">
                            <button className="p-2 w-full cursor-pointer shadow-sm rounded-md bg-slate-500 text-white text-2xl font-medium" type="submit">Absen</button>
                        </div>
            </section>
            {/* End body section */}
        </div>
    );
};

export default Card