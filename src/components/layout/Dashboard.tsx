import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Users,Clock ,Contact, ChevronDown, ChevronUp} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "@/helper/getCookie";
import { getAllKaryawan } from "@/services/karyawan";
import { UtilityContext } from "../context/UtilityContext";
import { useNavigate } from "react-router";
import { getAllUsers } from "@/services/user";
import { getAllAbsensi } from "@/services/absensi";
import type{ IAbsensi, IPagination } from "@/types/type";
import { Table,TableHeader,TableBody,TableCell,TableHead,TableRow } from "@/components/ui/table";
import { formatTime } from "@/helper/convertTime";
import { get } from "node:http";

interface ExpandableTextProps {
  text: string
  maxWords?: number
}
function ExpandableText({ text, maxWords = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  if(text === null){
    return "-"
  }
  const words = text.split(" ")
  const shouldTruncate = words.length > maxWords
  const displayText = shouldTruncate && !isExpanded ? words.slice(0, maxWords).join(" ") + "..." : text

  if (!shouldTruncate) {
    return <span className="break-words text-wrap">{text}</span>
  }

  return (
    <div className="space-y-2">
      <p className="break-words leading-relaxed text-wrap">{displayText}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp size={12} />
            Sembunyikan
          </>
        ) : (
          <>
            <ChevronDown size={12} />
            Selanjutnya
          </>
        )}
      </button>
    </div>
  )
}





const Dashboard: React.FC = () => {
    const {setLoading} = useContext(UtilityContext)
    const [time, setTime] = useState(new Date());
    const [totalKaryawan, setTotalKaryawan] = useState<number>()
    const [totalUser, setTotalUser] = useState<number>()
    const [recentAbsensi,setRecentAbsensi] = useState<IAbsensi[]>()

    const navigate = useNavigate()
    

    useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    const fetchTotalKaryawanUserAbsensi = async () => {
      setLoading(true)
      const token = getCookie("token");
      if (!token) {
        alert("Credential invalid")
        navigate("/login-admin")
        return
      }
      try {
        const getTotalKaryawan = await getAllKaryawan(token);
        const getTotalUsers = await getAllUsers(token)
        const getRecentAbsensi = await getAllAbsensi(token,0,5,"DESC")
        if(getTotalKaryawan.pagination?.total_items !== undefined) {
          setTotalKaryawan(getTotalKaryawan.pagination.total_items)
        }
        if(getTotalUsers.pagination?.total_items !== undefined) {
          setTotalUser(getTotalUsers.pagination.total_items)
        }
        if(Array.isArray(getRecentAbsensi.data)) {
          setRecentAbsensi(getRecentAbsensi.data)
        } else if (getRecentAbsensi.data) {
          setRecentAbsensi([getRecentAbsensi.data])
        }
      } catch (e:any) {
        if(e.response.status === 403 ){
          alert(e.response.data.message)
            navigate("/login-admin")
            return
        }
        alert(e.response.data.message)
      }finally{
        setLoading(false)
      }
    };


    fetchTotalKaryawanUserAbsensi();

    return () => clearInterval(interval); // Cleanup interval on unmount

  }, []);

  const formattedTime = time.toLocaleTimeString(); // Format to HH:MM:SS
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long", // Day name (e.g., Monday)
    year: "numeric",
    month: "long", // Full month name (e.g., January)
    day: "numeric",
  });
  return (
    <div className="">
      {/* Header */}
      <section>
      </section>
      {/* End header */}

      {/* Body */}
      <section className="grid grid-cols-3 md:grid-cols-2 justify-items-center container">
    <Card className="md:w-[280px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2">
            <Clock />
          </div>
          <div>
            <CardTitle className="text-xl md:text-lg">Waktu </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
                        <p className="text-md font-medium">{formattedDate}</p>

        <p className="text-2xl font-medium">{formattedTime}</p>

      </CardContent>
    </Card>
                <Card className="md:w-[280px]">
          <CardHeader>
            <div className="flex items-center gap-2">
               <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2"> 
                <Contact  />
              </div>
              <div>
                <CardTitle className="text-xl md:text-lg">Jumlah User</CardTitle>
              </div>              
            </div>

          </CardHeader>
          <CardContent>
            <p className="text-4xl">{totalKaryawan}</p>
          </CardContent>
        </Card>
                <Card className="md:w-[280px]">
          <CardHeader>
            <div className="flex items-center gap-2">
               <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2"> 
                <Users  />
              </div>
              <div>
                <CardTitle className="text-xl md:text-lg">Jumlah Karyawan</CardTitle>
              </div>              
            </div>

          </CardHeader>
          <CardContent>
            <p className="text-4xl">{totalUser}</p>
          </CardContent>
        </Card>
      

      </section>
      {/* End body */}

    
      <section className="my-4">
        <h2 className="my-2  font-semibold text-lg">Recent Absensi</h2>
                <div className="w-full">
                    <div className="rounded-md border overflow-hidden">
                        <div className="overflow-x-auto">
                    <Table className="bg-white overflow-scroll">

                        <TableHeader className="bg-slate-100">
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-900 min-w-[100px]">ID Karyawan</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[120px]">Nama</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[80px]">Foto</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[200px]">Target Kerja</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[200px]">Hasil Kerja</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[100px]">Check In</TableHead>
                                <TableHead className="font-semibold text-gray-900 min-w-[100px]">Check Out</TableHead>
                            </TableRow>
                        </TableHeader>
                <TableBody>
                {recentAbsensi?.map((item) => (
                    <TableRow key={item.absensi_id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium p-4">{item.karyawan_id}</TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <div className="break-words">{item.name}</div>
                    </TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={item.url_profile || "/placeholder.svg"}
                            alt={item.name}
                        />
                        </div>
                    </TableCell>
                    <TableCell className="text-slate-600 p-4 max-w-[250px]">
                        <ExpandableText text={item.target_work} maxWords={3} />
                    </TableCell>
                    <TableCell className="text-slate-600 p-4 max-w-[250px] text-wrap">
                        <ExpandableText text={item.result_work} maxWords={3} />
                    </TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <span className="whitespace-nowrap">{formatTime( item?.check_in)}</span>
                    </TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <span className="whitespace-nowrap">{formatTime(item?.check_out)}</span>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                    </Table>

                        </div>
                    </div>
                </div>
      </section>
    </div>
  );
};

export default Dashboard;