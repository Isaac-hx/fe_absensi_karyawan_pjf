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
import type { IKaryawan } from "@/types/type";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { exportToExcel } from "@/helper/export";
import { getAllKaryawan } from "@/services/karyawan";
import { UtilityContext } from "../context/UtilityContext";


type KaryawanFormValues = {
  nama:string,
  email:string,
  telp:string,
  jenis_kelamin:string,
};


const Karyawan: React.FC = () => {
    const [counterPage, setCounterPage] = useState(1);
    const [dataKaryawan,setDataKaryawan] = useState<IKaryawan[]>([])
    const [searchNameKaryawan, setSearchNameKaryawan] = useState("");
    const {setLoading} = useContext(UtilityContext)

    const {
        register: registerAdd,
        handleSubmit:handleAddSubmit ,
        formState: { errors: addErrors },
        setValue:setJenisKelamin,
        reset: resetAddForm,
    } = useForm<KaryawanFormValues>();
    
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },

    reset: resetEditForm,
  } = useForm<KaryawanFormValues>();

    useEffect(()=>{
        setLoading(true)
        const fetchKaryawan = async ()=>{
            try{
                const data = await getAllKaryawan()
                setDataKaryawan(data.slice((counterPage-1)*10,10*counterPage))
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
        console.log(searchNameKaryawan)
    };

    const handleSortKaryawan = () => {
        setDataKaryawan([...dataKaryawan].sort((a, b) => a.nama.localeCompare(b.nama)));
    };
    const handleAddKaryawan = (data: KaryawanFormValues) => {
        alert("Muncul")
        console.log("Berjalan")
        console.log("Add User Submitted:", data);
        resetAddForm();
    };
    const handleEditKaryawan = (data: KaryawanFormValues) => {

        console.log("Edit User Submitted:", data);
        resetEditForm();
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
        const res = exportToExcel(dataKaryawan)
        alert(res)
    }

    return (
        
        <div>
            {/* Header layout */}
            <section className="my-2 p-2 flex justify-between">
                <h2 className="font-medium text-lg">Karyawan List</h2>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-slate-100 border border-emerald-500 shadow-sm text-emerald-500 hover:bg-emerald-100 cursor-pointer flex items-center gap-2">
                                <span className="text-lg">+</span>
                                <span>Add karyawan</span>
                            </Button>
                        </DialogTrigger>
                        <DialogOverlay
                            data={{
                                title: "Tambah karyawan",
                                description: "Masukan data karyawan",
                                button: "Save",
                                submit:handleAddKaryawan,
                                handleSubmit: handleAddSubmit
                            }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="nama" className="text-right">
                                        Nama
                                    </Label>
                                    <Input
                                        {...registerAdd("nama", {
                                            required: "nama can't be empty",
                                            minLength: { value: 5, message: "nama must be at least 5 characters" },
                                        })}
                                        placeholder="Masukkan nama"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                    {addErrors.nama &&(
                                        <p className="text-red-500 text-xs">{addErrors.nama.message}</p>
                                    )}
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        {...registerAdd("email", {
                                            required: "email can't be empty",
                                            validate: (value) => isValidEmail(value) || "Invalid email address",
                                        })}        
                                        placeholder="Masukkan email"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                    {addErrors.email &&(
                                        <p className="text-red-500 text-xs">{addErrors.email.message}</p>
                                    )}
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="telp" className="text-right">
                                        No.Telp
                                    </Label>
                                    <Input
                                    {...registerAdd("telp", {
                                            required: "telp can't be empty",
                                            validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                                        })}   
                                        placeholder="Masukkan nomer telephone"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                    {addErrors.telp &&(
                                        <p className="text-red-500 text-xs">{addErrors.telp.message}</p>
                                    )}
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="Gender" className="text-right">
                                        Gender
                                    </Label>
                                    <Select
                                        
                                        onValueChange={(value)=>{setJenisKelamin("jenis_kelamin",value)}}
                                    >
                                        <SelectTrigger className="w-[180px] ">
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Jenis kelamin</SelectLabel>
                                                <SelectItem value="pria">Pria</SelectItem>
                                                <SelectItem value="perempuan">Perempuan</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                                                                    {addErrors.jenis_kelamin &&(
                                        <p className="text-red-500 text-xs">{addErrors.jenis_kelamin.message}</p>
                                    )}
                            </div>
                            
                        </DialogOverlay>
                        
                    </Dialog>
                    
                </div>
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
                            onChange={(e) => { setSearchNameKaryawan(e.target.value); }}
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
                            <TableHead className="text-emerald-600">ID</TableHead>
                            <TableHead className="text-emerald-600">Nama</TableHead>
                            <TableHead className="text-emerald-600">Email</TableHead>
                            <TableHead className="text-emerald-600">No.Telp</TableHead>
                            <TableHead className="text-emerald-600">Gender</TableHead>
                            <TableHead className="text-emerald-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataKaryawan.map((item) => (
                            <TableRow className="" key={item.id}>
                                <TableCell className="font-medium p-4 ">{item.id}</TableCell>
                                <TableCell className="text-slate-600">{item.nama}</TableCell>
                                <TableCell className="text-slate-600">{item.email}</TableCell>
                                <TableCell className="text-slate-600">{item.no_telepon}</TableCell>
                                <TableCell className="text-slate-600">{item.jenis_kelamin}</TableCell>
                                <TableCell >
                                    <div className="flex items-center gap-3">
                                        <Dialog>
                                            <TooltipOverlay text="Edit">
                                            <DialogTrigger asChild>
                                                
                                                <Pencil className="text-slate-500 cursor-pointer" size={15} />
                                            </DialogTrigger>
                                            </TooltipOverlay>
 
                                            <DialogOverlay
                                                data={{
                                                    title: "Edit karyawan",
                                                    description: "Edit data karyawan",
                                                    button: "Save",
                                                    submit:handleEditKaryawan,
                                                    handleSubmit: handleEditSubmit
                                                }}
                                            >
                                                <div className="grid gap-4 py-4">
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="nama" className="text-right">
                                                            Nama
                                                        </Label>
                                                        <Input
                                                            {...registerEdit("nama", {
                                                            required: "Nama can't be empty",
                                                            minLength: { value: 5, message: "nama must be at least 5 characters" },
                                                            })}
                                                            placeholder="Masukkan nama"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                                    {editErrors.nama &&(
                                                        <p className="text-red-500 text-xs">{editErrors.nama.message}</p>
                                                    )}                                               
                                                    </div>
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            {...registerEdit("email", {
                                                            required: "Email can't be empty",
                                                            validate: (value) => isValidEmail(value) || "Invalid email address",
                                                            })}
                                                            placeholder="Masukkan email"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                                     {editErrors.email &&(
                                                        <p className="text-red-500 text-xs">{editErrors.email.message}</p>
                                                    )}       
                                                    </div>
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="telp" className="text-right">
                                                            No.Telp
                                                        </Label>
                                                        <Input
                                                            {...registerEdit("telp", {
                                                            required: "No.Telp can't be empty",
                                                            validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                                                            })}
                                                            placeholder="Masukkan nomer telephone"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                                        {editErrors.telp &&(
                                                        <p className="text-red-500 text-xs">{editErrors.telp.message}</p>
                                                    )}
                                                    </div>
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="Gender" className="text-right">
                                                            Gender
                                                        </Label>
                                                        <Select
                                                            required
                                                            defaultValue="pria"
                                                        {...registerEdit("jenis_kelamin", { required: "Jenis Kelamin is required" })}
                                                        >
                                                            <SelectTrigger className="w-[180px] ">
                                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup defaultValue={"pria"}>
                                                                    <SelectLabel>Jenis kelamin</SelectLabel>
                                                                    <SelectItem value="pria">Pria</SelectItem>
                                                                    <SelectItem value="perempuan">Perempuan</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        {editErrors.jenis_kelamin &&(
                                                        <p className="text-red-500 text-xs">{editErrors.jenis_kelamin.message}</p>
                                                    )}
                                                    </div>
                                                </div>
                                            </DialogOverlay>
                                        </Dialog>
                                        <DialogAlert>
                                            <TooltipOverlay text="Delete">
                                                <AlertDialogTrigger asChild>
                                                            <Trash2 size={15} className="text-red-500 cursor-pointer" />
                                                </AlertDialogTrigger>  
                                            </TooltipOverlay>
  
                                        </DialogAlert>

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

export default Karyawan;
