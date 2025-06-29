import type React from "react";
import { Clock, Clock4 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CardHeader:React.FC =()=>{
    return(
        <>
                        <div>
                            <h1 className="font-medium text-xl">Absensi Karyawan</h1>
                        </div>
                        <div className="space-y-2 md:space-y-0 md:space-x-1 md:flex xl:gap-2">
                          <Badge className="bg-emerald-200">
                            < p className="text-emerald-900">Absen masuk 05.00 - 12.00</p>
                          </Badge>
                        <Badge className="bg-emerald-200">
                            < p className="text-emerald-900">Absen pulang 16.30 - 05.00</p>
                          </Badge>
                        </div>
        </>
    )
}

export default CardHeader