import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Pencil, Trash2, ArrowDownWideNarrow, Download } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group";
import DialogAlert from "@/components/common/DialogAlertOverlay";
import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import {type IPagination, type IUser } from "@/types/type";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { exportToExcel } from "@/helper/export"
import type { UserFormValues } from "@/types/form";
import {register} from "@/services/auth"
import { UtilityContext } from "../context/UtilityContext";
import { getCookie } from "@/helper/getCookie";
import { getAllUsers,editUserById,deleteUserById } from "@/services/user";
import { useNavigate } from "react-router";

const User: React.FC = () => {
    const {setLoading} = useContext(UtilityContext)
    const [pagination,setPagination] = useState<IPagination>()
    const [selectedEditId,setSelectedEditId] = useState<number>()
    
    const [dataUser, setDataUser] = useState<IUser[]>([]);
    const [counterPage, setCounterPage] = useState(0);
    const [searchNameuser, setSearchNameuser] = useState("");
    const navigate = useNavigate()
    // Add User Form
    const {
        register: registerAdd,
        handleSubmit: handleAddSubmit,
        formState: { errors: addErrors },
        watch: watchAdd,
        reset: resetAddForm,
        setValue,
        getValues
    } = useForm<UserFormValues>();

    // Edit User Form
    const {
        register: registerEdit,
        handleSubmit: handleEditSubmit,
        formState: { errors: editErrors },
        reset: resetEditForm,
        setValue:setEditValue,
        getValues:getEditValues

    } = useForm<UserFormValues>();

    useEffect(() => {
        setLoading(true)
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        const fetchAllUsers = async ()=>{
            try{
                const res = await getAllUsers(token,counterPage)
                    if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
                setDataUser(res.data)
                setPagination(res.pagination)
            }catch(e:any){
                if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
                alert(e.response.message)
            }finally{
                setLoading(false)
            }
        }
        fetchAllUsers()
    }, [counterPage]);

    const handleAddUser = async (data: UserFormValues) => {
        setLoading(true)
        setValue("status","active")
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match!");
            return;
        }
        try{
            const res = await register(getValues())
            alert(`Success register user ${res.data}`)
        
        }catch(e:any){
            alert(e.response.data.message)
        }finally{
            setLoading(false)
            resetAddForm();
            window.location.reload()

        }
    };

    const handleEditUser = async () => {
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
            const res = await editUserById(getEditValues(),token,selectedEditId)
            alert(res.message)
            window.location.reload()

        }catch(e:any){
            if(e.response.status === 403){
                    alert(e.response.data.message)
                    navigate("/login-admin")
                    return
                }
            (e)

        }finally{
            setLoading(false)
            resetEditForm()
            window.location.reload()
        }
    };

    const handleSortUser = () => {
        setDataUser([...dataUser].sort((a, b) => a.username.localeCompare(b.username)));
    };



    const handleSearchState = async() => {
        setLoading(true)
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        try{
            const res = await getAllUsers(token,0,100,"ASC",searchNameuser)
                    if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
            setDataUser(res.data)
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
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchState();
        }
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
            const res = await getAllUsers(token,0,10000,"ASC")
                if (!Array.isArray(res.data)) {
                    throw new Error("Data not found or invalid format");
                }
            const dataExport = exportToExcel("User",res.data);
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



    const handleDeleteUser = async (id:number)=>{
        const token = getCookie("token")
        if(!token){
alert("Credential invalid")            
navigate("/login-admin")
            return        }
        try{
            setLoading(true)
            const res = await deleteUserById(id,token)
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

    return (
        <div>
            {/* Header layout */}
            <section className="my-2 p-2 flex justify-between">
                <h2 className="font-medium text-lg">User List</h2>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-slate-100 border border-emerald-500 shadow-sm text-emerald-500 hover:bg-emerald-100 cursor-pointer flex items-center gap-2">
                                <span className="text-lg">+</span>
                                <span>Add user</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-left">Tambah user</DialogTitle>
                                <DialogDescription className="text-left">
                                    Masukan data user
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-x-4 gap-y-2 py-4">
                                <div className="md:grid md:grid-cols-4 space-y-2  md:space-y-0 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input
                                        {...registerAdd("username", {
                                            required: "Username can't be empty",
                                            minLength: { value: 5, message: "Username must be at least 5 characters" },
                                        })}
                                        placeholder="Masukkan username"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                {addErrors.username && (
                                    <p className="text-red-500 text-xs ">{addErrors.username.message}</p>
                                )}
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <Input
                                        {...registerAdd("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        })}
                                        type="password"
                                        placeholder="Masukkan password"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                {addErrors.password && (
                                    <p className="text-red-500 text-xs">{addErrors.password.message}</p>
                                )}
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="confirm_password" className="text-right">
                                        Password
                                    </Label>
                                    <Input
                                        required
                                        {...registerAdd("confirm_password", {
                                            required: "Confirm password is required",
                                            validate: (value) => value === watchAdd("password") || "Passwords do not match",
                                        })}
                                        type="password"

                                        placeholder="Masukkan ulang password"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                {addErrors.confirm_password && (
                                    <p className="text-red-500 text-xs">{addErrors.confirm_password.message}</p>
                                )}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={handleAddSubmit(handleAddUser)} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">
                                        Save
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>

            {/* Table list user */}
            <section className="bg-white rounded-md border  py-2">
                <div className="space-y-4 md:flex md:justify-between items-center p-4">
                    <div className="relative md:w-2/6">
                        <Search className="text-gray-400 text-xs absolute top-2 left-2 md:top-3 md:left-2" />
                        <Input
                            id="search-user"
                            type="text"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => { setSearchNameuser(e.target.value); }}
                            className="w-full pl-10  text-xs bg-white py-4 md:py-6"
                            placeholder="Masukan nama user..."
                        />
                    </div>
                    <div className="flex gap-1">
                        <div>
                            <TooltipOverlay text="Sort">
                                <Button
                                    className="bg-slate-50 border border-emerald-500 shadow-sm text-emerald-500 text-xl hover:bg-emerald-100 cursor-pointer"
                                    onClick={handleSortUser}
                                >
                                    <ArrowDownWideNarrow />
                                </Button>
                            </TooltipOverlay>
                        </div>
                        <div>
                            <Button onClick={handleExportExcel} className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">
                                Export to Excel <Download />
                            </Button>
                        </div>
                    </div>
                </div>
                <Table className="bg-white overflow-x-scroll">
                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead className="text-emerald-600">ID</TableHead>
                            <TableHead className="text-emerald-600">Username</TableHead>
                            <TableHead className="text-emerald-600">Status</TableHead>
                            <TableHead className="text-emerald-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataUser.map((item) => (
                            <TableRow className="" key={item.id}>
                                <TableCell className="font-medium p-4 ">{item.id}</TableCell>
                                <TableCell className="text-slate-600">{item.username}</TableCell>
                                <TableCell className="text-slate-600">
                                    <Badge variant={item.status === "active" ? "outline" : "destructive"}>{item.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Dialog>
                                            <TooltipOverlay text="Edit">
                                                <DialogTrigger asChild onClick={()=>{setSelectedEditId(item.id)}}>
                                                    <Pencil className="text-slate-500 cursor-pointer" size={15} />
                                                </DialogTrigger>
                                            </TooltipOverlay>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-left">Edit user</DialogTitle>
                                                    <DialogDescription className="text-left">Edit data user</DialogDescription>
                                                  </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="username" className="text-right">
                                                            Username
                                                        </Label>
                                                        <Input
                                                            defaultValue={item.username}
                                                            {...registerEdit("username", {
                                                                required: "Username can't be empty",
                                                                minLength: { value: 5, message: "Username must be at least 5 characters" },
                                                            })}
                                                            placeholder="Edit username"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                                    </div>
                                                    {editErrors.username && (
                                                        <p className="text-red-500 text-xs">{editErrors.username.message}</p>
                                                    )}
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">

                                                 <Label htmlFor="status" className="text-right">
                                                            Status
                                                        </Label>
                                                        <RadioGroup 
                                                        onValueChange={(value)=>{setEditValue("status",value)}}
                                                        defaultValue={item.status}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="active" id="active" />
                                                            <Label htmlFor="active">Active</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="inactive" id="inactive" />
                                                            <Label htmlFor="inactive">Inactive</Label>
                                                        </div>
                                                        </RadioGroup>
                                                    </div>
                                                    {editErrors.status && (
                                                        <p className="text-red-500 text-xs">{editErrors.status.message}</p>
                                                    )}
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={handleEditSubmit(handleEditUser)} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">
                                                            Save
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <DialogAlert onDelete={()=>{handleDeleteUser(item.id)}}>
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
                
                    <PaginationOverlay current_page={pagination?.current_page} total_items={pagination?.total_items} total_pages={pagination?.total_pages} setCounterPage={setCounterPage} />
            </section>
        </div>
    );
};

export default User;
