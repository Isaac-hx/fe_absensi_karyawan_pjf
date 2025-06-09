import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Search, Eye ,ArrowDownWideNarrow,Download,ChevronDown,ChevronUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import { data_karyawan } from "@/data/karyawan";
import type { IAbsensi } from "@/types/type";
import { exportToExcel } from "@/helper/export";
import { getAllKaryawan } from "@/services/karyawan";
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
import { absensiData } from "@/data/absensi";
interface ExpandableTextProps {
  text: string
  maxWords?: number
}
function ExpandableText({ text, maxWords = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
    const [dataAbsensi,setDataAbsensi] = useState<IAbsensi[]>([])
    const [searchAbsensi, setSearchAbsensi] = useState("");
    const {setLoading} = useContext(UtilityContext)

   

    useEffect(()=>{
        setLoading(true)
        const fetchKaryawan = async ()=>{
            try{
                const data = await getAllKaryawan()
                setDataAbsensi(absensiData.slice((counterPage-1)*10,10*counterPage))
            }catch(e){
                alert(e)
            }finally{
                setLoading(false)
            }

        }
        fetchKaryawan()
    },[counterPage])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchState();
        }
    };

    const handleSearchState = () => {
        console.log(searchAbsensi)
    };

    const handleSortKaryawan = () => {
        setDataAbsensi([...dataAbsensi].sort((a, b) => a.name.localeCompare(b.name)));
    };
  

    const handlePreviousPage=(e:any)=>{
        e.preventDefault()
        if(counterPage === 1){
            return
        }
        setCounterPage(counterPage-1)
    }
    const handleNextPage=(e:any)=>{
        e.preventDefault()
        if(counterPage === data_karyawan.length/10){
            return
        }
        setCounterPage(counterPage+1)
    }

    const handleExportExcel = ()=>{
        const res = exportToExcel(dataAbsensi)
        alert(res)
    }

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
                    <TableRow key={item.employee_id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium p-4">{item.employee_id}</TableCell>
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
                        <span className="whitespace-nowrap">{item.check_in}</span>
                    </TableCell>
                    <TableCell className="text-slate-600 p-4">
                        <span className="whitespace-nowrap">{item.check_out}</span>
                    </TableCell>
                    <TableCell className="p-4">
                        <div className="flex items-center justify-center">
                        <Sheet>
                            <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-2">
                                <Eye size={18} className="text-emerald-700" />
                            </Button>
                            </SheetTrigger>
                            <SheetContent className="sm:max-w-md">
                            <SheetHeader>
                                <SheetTitle>Detail Karyawan</SheetTitle>
                                <SheetDescription>Lihat detail informasi karyawan dan hasil kerja.</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-6 py-4">
                                <div className="grid gap-3">
                                <Label htmlFor="employee-id">ID Karyawan</Label>
                                <Input id="employee-id" defaultValue={item.employee_id} readOnly />
                                </div>
                                <div className="grid gap-3">
                                <Label htmlFor="employee-name">Nama</Label>
                                <Input id="employee-name" defaultValue={item.name} readOnly />
                                </div>
                                <div className="grid gap-3">
                                <Label htmlFor="target-work">Target Kerja</Label>
                                <div className="p-3 bg-gray-50 rounded-md text-sm">{item.target_work}</div>
                                </div>
                                <div className="grid gap-3">
                                <Label htmlFor="result-work">Hasil Kerja</Label>
                                <div className="p-3 bg-gray-50 rounded-md text-sm max-h-32 overflow-y-auto">
                                    {item.result_work}
                                </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="check-in">Check In</Label>
                                    <Input id="check-in" defaultValue={item.check_in} readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="check-out">Check Out</Label>
                                    <Input id="check-out" defaultValue={item.check_out} readOnly />
                                </div>
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                <Button variant="outline">Tutup</Button>
                                </SheetClose>
                            </SheetFooter>
                            </SheetContent>
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
                
                    <PaginationOverlay total_data={data_karyawan.length} counter_data={counterPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />

            </section>
        </div>
    );
};

export default Absensi;
