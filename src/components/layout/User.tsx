import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DialogOverlay from "@/components/common/DialogOverlay";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import DialogAlert from "@/components/common/DialogAlertOverlay";
import TooltipOverlay from "@/components/common/TooltipOverlay";
import PaginationOverlay from "@/components/common/PaginationOverlay";
import { users } from "@/data/user";
import type { IUser } from "@/types/type";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {Download} from "lucide-react"


const User: React.FC = () => {
    const [dataUser,setDatauser] = useState<IUser[]>([])
    const [addUserState, setAdduserState] = useState({
        username: "",
        password:"",
        confirm_password:""
    });
    const [editUserState, setEdituserState] = useState({
       username:"",
       status:""
    });
    const [searchNameUser, setSearchNameuser] = useState("");
    const [counterPage,setCounterPage] = useState(1)
    
    // Load data first reload
    useEffect(()=>{
        setDatauser(users.slice((counterPage-1)*10,10*counterPage))
        console.log(10*counterPage)
    },[counterPage])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchState();
        }
    };

    const handleSearchState = () => {

    };

    const handleSortuser = () => {
        setDatauser(dataUser.sort((a, b) => a.username.localeCompare(b.username)));
    };

 

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        stateKey: string
    ) => {
        const { name, value } = event.target;

        if (!name) return;

        if (stateKey === "edit") {
            setEdituserState((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            return;
        }

        setAdduserState((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdduser = () => {
        console.log("Tambah user");
        if (!addUserState.username || !addUserState.password || !addUserState.confirm_password) {
            alert("Input can't be empty!!");
            return;
        }

        console.log(addUserState)
    };

    const handleEdituser = () => {
        if (!editUserState.username || !editUserState.status ) {
            alert("Input can't be empty!!");
            return;
        }
        if (editUserState.status !== "Active" && editUserState.status !== "Inactive" ){
            alert("Status invalid")
            return
        }
        console.log(editUserState);
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
        if(counterPage === users.length/10){
            return
        }
        setCounterPage(counterPage+1)
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
                        <DialogOverlay
                            data={{
                                title: "Tambah user",
                                description: "Masukan data user",
                                button: "Save",
                                onSubmit: handleAdduser
                            }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input
                                        required
                                        id="username"
                                        name="username"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan username"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <Input
                                        required
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan password"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="confirm_password" className="text-right">
                                        Password
                                    </Label>
                                    <Input
                                        required
                                        id="confirm_password"
                                        name="confirm_password"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan ulang password"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>

                        
  
                            </div>
                        </DialogOverlay>
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
                            onClick={handleSortuser}>
                            <ArrowUpDown />
                        </Button>
                        </TooltipOverlay>
                        </div>
                       <div>
                            <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">Export to Excel <Download/></Button>
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
                                <TableCell className="text-slate-600"><Badge variant={item.status === "Active" ? "outline":"destructive" }>{item.status}</Badge> </TableCell>
                                
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
                                                    title: "Edit user",
                                                    description: "Edit data user",
                                                    button: "Save",
                                                    onSubmit: handleEdituser
                                                }}
                                            >
                                                <div className="grid gap-4 py-4">
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="username" className="text-right">
                                                            Username
                                                        </Label>
                                                        <Input
                                                            required
                                                            id="username"
                                                            defaultValue={"Dimas ananda riyadi"}
                                                            name="username"
                                                            onChange={(e) => { handleChange(e, "edit"); }}
                                                            placeholder="Masukkan username"
                                                            className="col-span-3 md:text-sm text-xs"
                                                        />
                                                    </div>
                                                    <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                        <Label htmlFor="status" className="text-right">
                                                            Status
                                                        </Label>
                                                    <Select
                                                        required
                                                        onValueChange={(value) =>
                                                        setEdituserState((prev) => ({ ...prev, status: value }))} >
                                                        <SelectTrigger className="w-[180px] ">
                                                           <SelectValue placeholder="Pilih status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                <SelectGroup>
                                                                <SelectLabel>Pilih status user</SelectLabel>
                                                                <SelectItem value="pria">Active</SelectItem>
                                                                <SelectItem value="perempuan">Inactive</SelectItem>
                                                                </SelectGroup>
                                                                </SelectContent>
                                                                </Select>
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
                
                    <PaginationOverlay total_data={users.length} counter_data={counterPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />

            </section>
        </div>
    );
};

export default User;
