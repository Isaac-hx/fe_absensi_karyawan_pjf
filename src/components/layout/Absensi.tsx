import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Search, Eye ,ArrowDownWideNarrow,Download,ChevronDown,ChevronUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import {type IPagination, type IAbsensi } from "@/types/type";
import { exportToExcel } from "@/helper/export";

import { UtilityContext } from "../context/UtilityContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "../ui/textarea";
import { getCookie } from "@/helper/getCookie";
import { useNavigate } from "react-router";
import { getAbsensiById, getAllAbsensi } from "@/services/absensi";
import { formatTime } from "@/helper/convertTime";
interface ExpandableTextProps {
  text: string
  maxWords?: number
}
function ExpandableText({ text, maxWords = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  if(text === null || text === undefined){
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


const Absensi: React.FC = () => {
    const [counterPage, setCounterPage] = useState(1);
    const [dataAbsensi,setDataAbsensi] = useState<IAbsensi[] >([])
    const [detailAbsensi,setDetailAbsensi] = useState<IAbsensi | undefined>()
    const [searchAbsensi, setSearchAbsensi] = useState("");
    const {setLoading,loading} = useContext(UtilityContext)
    const [pagination,setPagination] = useState<IPagination |undefined>()
    
    const navigate = useNavigate()
   

    useEffect(()=>{
        const token = getCookie("token")
        if(!token){
        alert("Credential invalid")            
        navigate("/login-admin")
            return        }
        setLoading(true)
        const fetchAllAbsensi = async ()=>{
            try{
                const res = await getAllAbsensi(token,counterPage)
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
                setDataAbsensi(res.data)
                setPagination(res.pagination)
            }catch(e:any){
                if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
                alert(`${e.response.data.status }:${e.response.data.message}`)
            }finally{
                setLoading(false)
            }

        }
        fetchAllAbsensi()
    },[counterPage])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchState();
        }
    };

    /**
     * Handles the search functionality for the absensi data.
     * 
     * - If the search input (`searchAbsensi`) is empty or contains only whitespace,
     *   it resets the displayed data (`dataAbsensi`) to the current page's slice of the full data (`absensiData`).
     * - If there is a search query, it filters `absensiData` by matching the `name` property (case-insensitive)
     *   and updates `dataAbsensi` with the filtered results for the current page.
     *
     * Pagination is handled by slicing the data based on the current page (`counterPage`), 
     * displaying 10 items per page.
     */
   const handleSearchState = async () => {
    if(searchAbsensi === ""){
        navigate("/dashboard-admin/absensi")
    }
            const token = getCookie("token")
            if(!token){
    alert("Credential invalid")            
    navigate("/login-admin")
            return            }
            try{
                const res = await getAllAbsensi(token,0,20,"ASC",searchAbsensi)
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
                setDataAbsensi(res.data)
                setPagination(res.pagination) 

            }catch(e:any){
                if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
                alert(`${e.response.data.status }:${e.response.data.message}`)
            }

        };

    const fetchDetailAbsensi = async (id:number | undefined)=>{
        if(id === undefined){
            alert("ID not found/invalid")
            return
        }
        setLoading(true)
        const token = getCookie("token")

        if(!token){
            alert("Credential invalid")            
            navigate("/login-admin")
            return        }
        try{
            const res = await getAbsensiById(token,id)

            setDetailAbsensi(Array.isArray(res.data) ? res.data[0] : res.data)
        }catch(e:any){
            if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
        }finally{
            setLoading(false)
        }
        
    }
    const handleSortKaryawan = () => {
        setDataAbsensi([...dataAbsensi].sort((a, b) => a.name.localeCompare(b.name)));
    };
  


    const handleExportExcel = async() => {
        setLoading(true)
        const token = getCookie("token")
        if(!token){
            alert("Credential invalid")            
            navigate("/login-admin")
            return        
        }
        try{
            const res = await getAllAbsensi(token,0,10000,"ASC")
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
            const dataExport = exportToExcel("Absensi",res.data);
            alert(`Download file ${dataExport} sucess!`)
        }catch(e:any){
            if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
            alert(e.response.data.message)

        }finally{
            setLoading(false)
        }
       
    };

    return (
        
        <div>
            {/* Header layout */}
            <section className="my-2 p-2 flex justify-between">
                <h2 className="font-medium text-lg">Absensi List</h2>

            </section>

            {/* Table list karyawan */}
            <section className="bg-white rounded-md border space-y-2 py-2">
                <div className="space-y-4 md:flex md:justify-between items-center p-4">
                    
                    <div className="relative md:w-2/6">
                        <Search className="text-gray-400 text-xs absolute top-2 left-2 md:top-3 md:left-2" />
                        <Input
                            id="search-karyawan"
                            type="text"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => { setSearchAbsensi(e.target.value); }}
                            className="w-full pl-10  text-xs bg-white py-4 md:py-6"
                            placeholder="Masukan nama karyawan..."
                        />
                    </div>
                    <div className="flex gap-1">
                        <div>
                        <TooltipOverlay text="Sort">                    
                        <Button
                        className="bg-slate-50 border border-emerald-500 shadow-sm text-emerald-500 text-xl hover:bg-emerald-100 cursor-pointer"
                        onClick={handleSortKaryawan}>
                    
                        <ArrowDownWideNarrow />
                    </Button>
                    </TooltipOverlay>
                        </div> 
                        <div>
                            <Button onClick={handleExportExcel} className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">Export to Excel <Download/></Button>
                       </div> 
                    </div>
   

                </div>
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
                                <TableHead className="font-semibold text-gray-900 min-w-[80px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                <TableBody>
                {dataAbsensi.map((item) => (
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
                        <span className="whitespace-nowrap">{formatTime( item.check_in)}</span>
                    </TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <span className="whitespace-nowrap">{formatTime(item.check_out)}</span>
                    </TableCell>
                    <TableCell className="p-4">
                        <div className="flex items-center justify-center">
                        <Sheet>
                            <SheetTrigger asChild>
                            <Button onClick={()=>{fetchDetailAbsensi(item.absensi_id)}} variant="ghost" size="sm" className="p-2">
                                <Eye size={18} className="text-emerald-700" />
                            </Button>
                            </SheetTrigger>
                    {!loading &&                     <SheetContent className="sm:max-w-md p-4 overflow-y-scroll">
                        <SheetHeader>
                            <SheetTitle>Detail Absensi</SheetTitle>
                            <SheetDescription>
                                Lihat detail informasi absensi dan hasil kerja.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid gap-3 justify-center">
                                <div className="w-40 h-40  rounded-full ring-2 ring-emerald-500">
                                    <img
                                        className="rounded-full w-full h-full object-cover"
                                        id="profile_detail"
                                    
                                        src={
                                            detailAbsensi?.url_profile ||
                                            "https://i.pinimg.com/474x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg"
                                        }
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="employee-id">ID Karyawan</Label>
                                <Input
                                    className="focus:border-none"
                                    id="employee-id"
                                    defaultValue={detailAbsensi?.karyawan_id}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    className="focus:border-none"
                                    id="location"
                                    defaultValue={detailAbsensi?.location}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="employee-name">Nama</Label>
                                <Input
                                    className="focus:border-none"
                                    id="employee-name"
                                    defaultValue={detailAbsensi?.name}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="target-work">Target Kerja</Label>
                                <Textarea
                                    readOnly
                                    className="p-3 bg-gray-50 rounded-md text-sm"
                                    defaultValue={detailAbsensi?.target_work}
                                ></Textarea>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="result-work">Hasil Kerja</Label>
                                <Textarea
                                    className="p-3 bg-gray-50 rounded-md text-sm max-h-32 overflow-y-auto"
                                    defaultValue={detailAbsensi?.result_work}
                                    readOnly
                                ></Textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="check-in">Check In</Label>
                                    <Input
                                        className="focus:border-none"
                                        id="check-in"
                                        defaultValue={formatTime(detailAbsensi?.check_in)}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="check-out">Check Out</Label>
                                    <Input
                                        className="focus:border-none"
                                        id="check-out"
                                        defaultValue={formatTime(detailAbsensi?.check_out)}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="signature">Tanda tangan</Label>
                                <img
                                    src={detailAbsensi?.url_signature}
                                    id="signature"
                                    alt="Signature"
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant="outline">Tutup</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>}


                        </Sheet>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                    </Table>

                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-2">
                
                    <PaginationOverlay current_page={pagination?.current_page} total_items={pagination?.total_items}  total_pages={pagination?.total_pages} setCounterPage={setCounterPage} />

            </section>
        </div>
    );
};

export default Absensi;
