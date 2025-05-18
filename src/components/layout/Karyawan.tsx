import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DialogOverlay from "@/components/common/DialogOverlay";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { isValidEmail, validateAndFormatPhoneNumber } from "@/helper/validator";
import DialogAlert from "@/components/common/DialogAlertOverlay";

const data = [
    { id: 1475, nama: "Rina", gender: "Perempuan", email: "rina@example.com", no_telepon: "081234567890" },
    { id: 4685, nama: "Agus", gender: "Laki-laki", email: "agus@example.com", no_telepon: "081234567891" },
    { id: 7145, nama: "Wawan", gender: "Perempuan", email: "wawan@example.com", no_telepon: "081234567892" },
    { id: 9983, nama: "Yuni", gender: "Laki-laki", email: "yuni@example.com", no_telepon: "081234567893" },
    { id: 8521, nama: "Indra", gender: "Perempuan", email: "indra@example.com", no_telepon: "081234567894" },
    { id: 4744, nama: "Surya", gender: "Laki-laki", email: "surya@example.com", no_telepon: "081234567895" },
    { id: 6908, nama: "Budi", gender: "Laki-laki", email: "budi@example.com", no_telepon: "081234567896" },
    { id: 1367, nama: "Dewi", gender: "Laki-laki", email: "dewi@example.com", no_telepon: "081234567897" },
    { id: 4011, nama: "Yuni", gender: "Laki-laki", email: "yuni2@example.com", no_telepon: "081234567898" },
    { id: 8548, nama: "Budi", gender: "Perempuan", email: "budi2@example.com", no_telepon: "081234567899" },
];

const Karyawan: React.FC = () => {
    const [addKaryawanState, setAddKaryawanState] = useState({
        nama: "",
        email: "",
        telp: "",
        jenis_kelamin: ""
    });
    const [editKaryawanState, setEditKaryawanState] = useState({
        nama: "",
        email: "",
        telp: "",
        jenis_kelamin: ""
    });
    const [searchNameKaryawan, setSearchNameKaryawan] = useState(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchState();
        }
    };

    const handleSearchState = () => {
        console.log(searchNameKaryawan);
    };

    const handleSortKaryawan = () => {
        data.sort((a, b) => a.nama.localeCompare(b.nama));
    };

 

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        stateKey: string
    ) => {
        const { name, value } = event.target;

        if (!name) return;

        if (stateKey === "edit") {
            setEditKaryawanState((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            return;
        }

        setAddKaryawanState((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddKaryawan = () => {
        console.log("Tambah karyawan");
        if (!addKaryawanState.nama || !addKaryawanState.email || !addKaryawanState.telp) {
            alert("Input can't be empty!!");
            return;
        }
        if (!isValidEmail(addKaryawanState.email)) {
            alert("Invalid email address!!");
            return;
        }
        const validPhone = validateAndFormatPhoneNumber(addKaryawanState.telp);
        if (!validPhone || null) {
            alert("Invalid nomer phone!!");
            return;
        }
        console.log(addKaryawanState)
    };

    const handleEditKaryawan = () => {
        if (!editKaryawanState.nama || !editKaryawanState.email || !editKaryawanState.telp) {
            alert("Input can't be empty!!");
            return;
        }
        if (!isValidEmail(editKaryawanState.email)) {
            alert("Invalid email address!!");
            return;
        }
        const validPhone = validateAndFormatPhoneNumber(editKaryawanState.telp);
        if (!validPhone || null) {
            alert("Invalid nomer phone!!");
            return;
        }
        console.log(editKaryawanState);
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
                        <DialogOverlay
                            data={{
                                title: "Tambah karyawan",
                                description: "Masukan data karyawan",
                                button: "Save",
                                onSubmit: handleAddKaryawan
                            }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="nama" className="text-right">
                                        Nama
                                    </Label>
                                    <Input
                                        required
                                        id="nama"
                                        name="nama"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan nama"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        id="email"
                                        name="email"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan email"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="telp" className="text-right">
                                        No.Telp
                                    </Label>
                                    <Input
                                        id="telp"
                                        required
                                        name="telp"
                                        onChange={(e) => { handleChange(e, "add"); }}
                                        placeholder="Masukkan nomer telephone"
                                        className="col-span-3 md:text-sm text-xs"
                                    />
                                </div>
                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                    <Label htmlFor="Gender" className="text-right">
                                        Gender
                                    </Label>
                                    <Select
                                        required
                                        onValueChange={(value) =>
                                            setAddKaryawanState((prev) => ({ ...prev, jenis_kelamin: value }))
                                        }
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
                            </div>
                        </DialogOverlay>
                    </Dialog>
                </div>
            </section>

            {/* Table list karyawan */}
            <section className="bg-white rounded-lg border space-y-2 py-2">
                <div className="flex justify-between items-center p-4">
                    <div className="relative w-2/6">
                        <Search className="text-gray-400 text-xs absolute top-2 left-2 md:top-3 md:left-2" />
                        <Input
                            id="search-karyawan"
                            type="text"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => { setSearchNameKaryawan(e.target.value); }}
                            className="w-full pl-10 text-xs bg-white py-4 md:py-6"
                            placeholder="Masukan nama karyawan..."
                        />
                    </div>
                    <Button
                        className="bg-slate-50 border border-emerald-500 shadow-sm text-emerald-500 text-xl hover:bg-emerald-100 cursor-pointer"
                        onClick={handleSortKaryawan}
                    >
                        <ArrowUpDown />
                    </Button>
                </div>
                <Table className="bg-white">
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
                        {data.map((item) => (
                            <TableRow className="p-5" key={item.id}>
                                <TableCell className="font-medium p-4">{item.id}</TableCell>
                                <TableCell className="text-slate-600">{item.nama}</TableCell>
                                <TableCell className="text-slate-600">{item.email}</TableCell>
                                <TableCell className="text-slate-600">{item.no_telepon}</TableCell>
                                <TableCell className="text-slate-600">{item.gender}</TableCell>
                                <TableCell className="flex items-center gap-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Pencil className="text-slate-500 cursor-pointer" size={15} />
                                        </DialogTrigger>
                                        <DialogOverlay
                                            data={{
                                                title: "Edit karyawan",
                                                description: "Edit data karyawan",
                                                button: "Save",
                                                onSubmit: handleEditKaryawan
                                            }}
                                        >
                                            <div className="grid gap-4 py-4">
                                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                    <Label htmlFor="nama" className="text-right">
                                                        Nama
                                                    </Label>
                                                    <Input
                                                        required
                                                        id="nama"
                                                        defaultValue={"Dimas ananda riyadi"}
                                                        name="nama"
                                                        onChange={(e) => { handleChange(e, "edit"); }}
                                                        placeholder="Masukkan nama"
                                                        className="col-span-3 md:text-sm text-xs"
                                                    />
                                                </div>
                                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                    <Label htmlFor="email" className="text-right">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        required
                                                        id="email"
                                                        name="email"
                                                        onChange={(e) => { handleChange(e, "edit"); }}
                                                        placeholder="Masukkan email"
                                                        className="col-span-3 md:text-sm text-xs"
                                                    />
                                                </div>
                                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                    <Label htmlFor="telp" className="text-right">
                                                        No.Telp
                                                    </Label>
                                                    <Input
                                                        id="telp"
                                                        required
                                                        name="telp"
                                                        onChange={(e) => { handleChange(e, "edit"); }}
                                                        placeholder="Masukkan nomer telephone"
                                                        className="col-span-3 md:text-sm text-xs"
                                                    />
                                                </div>
                                                <div className="md:grid md:grid-cols-4 space-y-2 md:space-y-0 items-center gap-4">
                                                    <Label htmlFor="Gender" className="text-right">
                                                        Gender
                                                    </Label>
                                                    <Select
                                                        required
                                                        defaultValue="pria"
                                                        onValueChange={(value) =>
                                                            setEditKaryawanState((prev) => ({ ...prev, jenis_kelamin: value }))
                                                        }
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
                                                </div>
                                            </div>
                                        </DialogOverlay>
                                    </Dialog>
                                    <DialogAlert>
                                        <Trash2 size={15} className="text-red-500 cursor-pointer" />
                                    </DialogAlert>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
};

export default Karyawan;
