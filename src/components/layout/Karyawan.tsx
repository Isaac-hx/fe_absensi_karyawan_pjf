import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Search, Pencil, Trash2 ,ArrowDownWideNarrow,Download } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogTrigger,DialogContent, DialogHeader,DialogDescription,DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { isValidEmail, validateAndFormatPhoneNumber } from "@/helper/validator";
import DialogAlert from "@/components/common/DialogAlertOverlay";
import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import {type IPagination, type IKaryawan } from "@/types/type";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { exportToExcel } from "@/helper/export";
import { getAllKaryawan,createKaryawan,editKaryawanById,deleteKaryawanById} from "@/services/karyawan";
import { UtilityContext } from "../context/UtilityContext";
import type{  KaryawanFormValues } from "@/types/form";
import { getCookie } from "@/helper/getCookie";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



const Karyawan: React.FC = () => {
    const [counterPage, setCounterPage] = useState(0);
    const [selectedEditId,setSelectedEditId] = useState<number>()
    const [pagination,setPagination] = useState<IPagination |undefined>()
    const [dataKaryawan,setDataKaryawan] = useState<IKaryawan[]>([])
    const [searchNameKaryawan, setSearchNameKaryawan] = useState("");
    const {setLoading} = useContext(UtilityContext)
    const navigate = useNavigate()
    const {
        register: registerAdd,
        handleSubmit:handleAddSubmit ,
        formState: { errors: addErrors },
        setValue:setGender,
        reset: resetAddForm,
    } = useForm<KaryawanFormValues>();
    
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    setValue:setEditValue,
    getValues:getEditValues,
    reset: resetEditForm,
  } = useForm<KaryawanFormValues>();

    useEffect(()=>{
        setLoading(true)

        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        const fetchAllKaryawan = async ()=>{
            try{
                const res = await getAllKaryawan(token,counterPage)
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
                setDataKaryawan(res.data)
                setPagination(res.pagination)
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

        }
        fetchAllKaryawan()
    },[counterPage])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            ("enter data")
            e.preventDefault();
            handleSearchState();
        }
    };

    const handleSearchState = async () => {
            const token = getCookie("token")
            if(!token){
    alert("Credential invalid")            
    navigate("/login-admin")
            return            }
            try{
                const res = await getAllKaryawan(token,0,20,"ASC",searchNameKaryawan)
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
                setDataKaryawan(res.data)
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

    const handleSortKaryawan = () => {
        setDataKaryawan([...dataKaryawan].sort((a, b) => a.name.localeCompare(b.name)));
    };
    const handleAddKaryawan = async (data: KaryawanFormValues) => {
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        setLoading(true)
        try{
            const res = await createKaryawan(data,token)
            alert(res.message)
            window.location.reload()


        }catch(e:any){
                if(e.response.status === 403 ){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
            alert(`Gagal menambahkan data ${e}`)
        }finally{
            resetAddForm();
            setLoading(false)
        }

    };
    const handleEditKaryawan = async () => {
        setLoading(true)
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        try{
            if (!selectedEditId){
                throw new Error("Id not found")
            }
            const res = await editKaryawanById(getEditValues(),token,selectedEditId)
            alert(res.message)
        }catch(e:any){
                if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
            alert(`Gagal mengedit data ${e}`)
        }finally{
            setLoading(false)
            resetEditForm();
            window.location.reload()


        }
    };

    const handleDeleteKaryawan = async (id:number)=>{
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        try{
            setLoading(true)
            const res = await deleteKaryawanById(id,token)
            alert(res.message)
            window.location.reload()

        }catch(e:any){
                if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
            alert(`Gagal menghapus data ${e.response.message}`)

        }finally{
            setLoading(false)
        }

    }


  
    const handleExportExcel = async() => {
        setLoading(true)
        const token = getCookie("token")
        if(!token){
            alert("Credential invalid")            
            navigate("/login-admin")
            return        
        }
        try{
            const res = await getAllKaryawan(token,0,10000,"ASC")
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
                <h2 className="font-medium text-lg">Karyawan List</h2>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-slate-100 border border-emerald-500 shadow-sm text-emerald-500 hover:bg-emerald-100 cursor-pointer flex items-center gap-2">
                                <span className="text-lg">+</span>
                                <span>Add karyawan</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-left">Tambah karyawan</DialogTitle>
                                <DialogDescription className="text-left">
                                    Masukan data karyawan
                                </DialogDescription>
                            </DialogHeader>
                             <div className="grid gap-x-4 gap-y-2 py-4">
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="nama" className="text-right">
                                        Nama
                                    </Label>
                                    <Input
                                        {...registerAdd("name", {
                                            required: "name can't be empty",
                                            minLength: { value: 5, message: "name must be at least 5 characters" },
                                        })}
                                        placeholder="Masukkan nama"
                                        className="col-span-3 md:text-sm text-xs"
                                    />

                                </div>
                                                                    {addErrors.name &&(
                                        <p className="text-red-500 text-xs">{addErrors.name.message}</p>
                                    )}
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
  
                                </div>
                                                                  {addErrors.email &&(
                                        <p className="text-red-500 text-xs">{addErrors.email.message}</p>
                                    )}
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="telp" className="text-right">
                                        No.Telp
                                    </Label>
                                    <Input
                                    {...registerAdd("no_telp", {
                                            required: "telp can't be empty",
                                            validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                                        })}   
                                        placeholder="Masukkan nomer telephone"
                                        className="col-span-3 md:text-sm text-xs"
                                    />

                                </div>
                                    {addErrors.no_telp &&(
                                        <p className="text-red-500 text-xs">{addErrors.no_telp.message}</p>
                                    )}
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                      <Label htmlFor="Gender" className="text-right">
                                                            Gender
                                                        </Label>
                                                        <RadioGroup 
                                                                                                                                                                        onValueChange={(value)=>{setGender("gender",value)}}
                                                        >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male" />
                                                            <Label htmlFor="male">male</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female" />
                                                            <Label htmlFor="female">female</Label>
                                                        </div>
                                                        </RadioGroup>


                                </div>
                                                                    {addErrors.gender &&(
                                        <p className="text-red-500 text-xs">{addErrors.gender.message}</p>
                                    )}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                     <Button onClick={handleAddSubmit(handleAddKaryawan)}  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">Save</Button>
                                </DialogClose>
                                
                            </DialogFooter>
                        </DialogContent>
   
                        
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
                                <TableCell className="text-slate-600">{item.name}</TableCell>
                                <TableCell className="text-slate-600">{item.email}</TableCell>
                                <TableCell className="text-slate-600">{item.no_telp}</TableCell>
                                <TableCell className="text-slate-600">{item.gender}</TableCell>
                                <TableCell >
                                    <div className="flex items-center gap-3">
                                        <Dialog>
                                            <TooltipOverlay text="Edit">
                                            <DialogTrigger asChild onClick={
                                                ()=>{setSelectedEditId(item.id)}
                                                
                                                }>
                                                
                                                <Pencil className="text-slate-500 cursor-pointer" size={15} />
                                            </DialogTrigger>
                                            </TooltipOverlay>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-left">Edit karyawan</DialogTitle>
                                                    <DialogDescription className="text-left">
                                                        Edit data karyawan
                                                    </DialogDescription>
                                                </DialogHeader>
                                                                                                                                <div className="grid gap-x-4 gap-y-2 py-4">
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="nama" className="text-right">
                                                            Nama
                                                        </Label>
                                                        <Input
                                                        defaultValue={item.name}
                                                            {...registerEdit("name", {
                                                            required: "Nama can't be empty",
                                                            minLength: { value: 5, message: "nama must be at least 5 characters" },
                                                            })}
                                                            placeholder="Masukkan nama"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                              
                                                    </div>
                                                                                                        {editErrors.name &&(
                                                        <p className="text-red-500 text-xs">{editErrors.name.message}</p>
                                                    )} 
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input
                                                                                                                                            defaultValue={item.email}

                                                            {...registerEdit("email", {
                                                            required: "Email can't be empty",
                                                            validate: (value) => isValidEmail(value) || "Invalid email address",
                                                            })}
                                                            placeholder="Masukkan email"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
    
                                                    </div>
                                                                                                         {editErrors.email &&(
                                                        <p className="text-red-500 text-xs">{editErrors.email.message}</p>
                                                    )}   
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="telp" className="text-right">
                                                            No.Telp
                                                        </Label>
                                                        <Input
                                                            defaultValue={item.no_telp}
                                                            {...registerEdit("no_telp", {
                                                            required: "No.Telp can't be empty",
                                                            validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                                                            })}
                                                            placeholder="Masukkan nomer telephone"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
       
                                                    </div>
                                                                                                     {editErrors.no_telp &&(
                                                        <p className="text-red-500 text-xs">{editErrors.no_telp.message}</p>
                                                    )}
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="Gender" className="text-right">
                                                            Gender
                                                        </Label>
                                                        <RadioGroup 
                                                                                                                                                                                                                                                                                        onValueChange={(value)=>{setEditValue("gender",value)}}
                                                        defaultValue={item.gender}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male" />
                                                            <Label htmlFor="male">Male</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female" />
                                                            <Label htmlFor="female">Female</Label>
                                                        </div>
                                                        </RadioGroup>

                                                    </div>
                                                                                                            {editErrors.gender &&(
                                                        <p className="text-red-500 text-xs">{editErrors.gender.message}</p>
                                                    )}
                                                </div>  
                                                                                                                                <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={handleEditSubmit(handleEditKaryawan)}  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">Save</Button>          
                                                </DialogClose>
                                            </DialogFooter>
                                            </DialogContent>


                                        </Dialog>
                                        <DialogAlert onDelete={()=>{handleDeleteKaryawan(item.id)}}>
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
                
                    <PaginationOverlay current_page={pagination?.current_page} total_items={pagination?.total_items}  total_pages={pagination?.total_pages} setCounterPage={setCounterPage} />

            </section>
        </div>
    );
};

export default Karyawan;
