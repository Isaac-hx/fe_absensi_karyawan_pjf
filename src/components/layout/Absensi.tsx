import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Search, Pencil, Trash2 ,ArrowDownWideNarrow,Download } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import DialogOverlay from "@/components/common/DialogOverlay";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { isValidEmail, validateAndFormatPhoneNumber } from "@/helper/validator";
import DialogAlert from "@/components/common/DialogAlertOverlay";
import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import { data_karyawan } from "@/data/karyawan";
import type { IAbsensi } from "@/types/type";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
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
                <Table className="bg-white overflow-scroll">

                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead className="text-emerald-600">ID Karyawan</TableHead>
                            <TableHead className="text-emerald-600">Nama</TableHead>
                            <TableHead className="text-emerald-600">Profil</TableHead>
                            <TableHead className="text-emerald-600">Target Kerja</TableHead>
                            <TableHead className="text-emerald-600">Hasil Kerja</TableHead>
                            <TableHead className="text-emerald-600">Jam masuk</TableHead>
                            <TableHead className="text-emerald-600">Jam pulang</TableHead>
                            <TableHead className="text-emerald-600">Detail</TableHead>


                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataAbsensi.map((item) => (
                            <TableRow className="" key={item.employee_id}>
                                <TableCell className="font-medium p-4 ">{item.employee_id}</TableCell>
                                <TableCell className="text-slate-600">{item.name }</TableCell>
                                <TableCell className="text-slate-600">
                                    <div className="w-6 h-6 rounded-full">
                                        <img className="rounded-full" src={item.url_profile} alt="Dimas" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{item.target_work}</TableCell>
                                <TableCell className="text-slate-600">{item.result_work}</TableCell>
                                <TableCell className="text-slate-600">{item.check_in}</TableCell>
                                <TableCell className="text-slate-600">{item.check_out}</TableCell>
                                <TableCell >
                                    <div className="flex items-cen not-only-of-type:ter gap-3">
                                        <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline">View</Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                            <SheetTitle>Edit profile</SheetTitle>
                                            <SheetDescription>
                                                Make changes to your profile here. Click save when you&apos;re done.
                                            </SheetDescription>
                                            </SheetHeader>
                                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="sheet-demo-name">Name</Label>
                                                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="sheet-demo-username">Username</Label>
                                                <Input id="sheet-demo-username" defaultValue="@peduarte" />
                                            </div>
                                            </div>
                                            <SheetFooter>
                                            <Button type="submit">Save changes</Button>
                                            <SheetClose asChild>
                                                <Button variant="outline">Close</Button>
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
            </section>
            <section className="mt-2">
                
                    <PaginationOverlay total_data={data_karyawan.length} counter_data={counterPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />

            </section>
        </div>
    );
};

export default Absensi;
