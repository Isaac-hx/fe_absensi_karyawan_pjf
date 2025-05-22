import type React from "react";
import { Clock, Clock4 } from "lucide-react";

const CardHeader:React.FC =()=>{
    return(
        <>
                        <div>
                            <h1 className="font-medium text-xl">Absensi Karyawan</h1>
                        </div>
                        <div className="space-y-2 md:space-y-0 md:space-x-1 md:flex xl:gap-2">
                            <div className="flex p-1 items-center gap-1 bg-gray-100 rounded-full">
                                <Clock size={20} />
                                <p className="text-xs font-semibold">Absen masuk : 05.00 AM - 10.00 AM</p>
                            </div>
                            <div className="flex p-1 items-center gap-1 bg-gray-100 rounded-full">
                                <Clock4 size={22} />
                                <p className="text-xs font-semibold">Absen pulang : 05.00 AM - 03.00 PM</p>
                            </div>
                        </div>
        </>
    )
}

export default CardHeader