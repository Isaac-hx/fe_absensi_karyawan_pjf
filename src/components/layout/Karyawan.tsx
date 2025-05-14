import type React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ellipsis, ArrowUpDown, Search } from "lucide-react";

const data = [
    { id: 1475, nama: "Rina", gender: "Perempuan" },
    { id: 4685, nama: "Agus", gender: "Laki-laki" },
    { id: 7145, nama: "Wawan", gender: "Perempuan" },
    { id: 9983, nama: "Yuni", gender: "Laki-laki" },
    { id: 8521, nama: "Indra", gender: "Perempuan" },
    { id: 4744, nama: "Surya", gender: "Laki-laki" },
    { id: 6908, nama: "Budi", gender: "Laki-laki" },
    { id: 1367, nama: "Dewi", gender: "Laki-laki" },
    { id: 4011, nama: "Yuni", gender: "Laki-laki" },
    { id: 8548, nama: "Budi", gender: "Perempuan" },
];

const Karyawan: React.FC = () => {
    const handleSortKaryawan=()=>{
        data.sort()
    }
    return (
        <div>
            <section className="my-4 p-2 flex justify-between">
                <h2 className="font-medium text-lg">Karyawan List</h2>
                <div>
                    <Button className="bg-slate-100 border-1 border-emerald-500 shadow-sm text-emerald-500  hover:bg-emerald-100 cursor-pointer" 
                    onClick={handleSortKaryawan}
                        >
                            <p className="text-lg">+</p>
                            <p className="">Add karyawan</p>                        
                    </Button>
                </div>
            </section>

            <section className="bg-white rounded-lg border-1 space-y-10 py-2">
                <div className="flex justify-between items-center p-4
                ">
                    <div className="relative w-2/6 ">
                        {/* Ikon Search */}
  
                        <Search  className="text-gray-400  text-xs absolute top-2 left-2  md:top-3 md:left-2 " />

                        {/* Input Field */}
                        <Input
                            id="search-karyawan"
                            type="text"
                            className="w-full pl-10 text-xs bg-white py-4 md:py-6"
                            placeholder="Masukan nama karyawan..."
                        />
                    </div>
                    <div>
                        <Button className="bg-slate-100 border-1 border-emerald-500 shadow-sm text-emerald-500 text-xl hover:bg-emerald-100 cursor-pointer" 
                        onClick={handleSortKaryawan}
                        >
                            <ArrowUpDown />
                        
                        </Button>
                    </div>
                </div>
                <Table className="bg-white">
                    <TableHeader className="bg-slate-100">
                        <TableRow >
                            <TableHead className="text-emerald-600">ID</TableHead>
                            <TableHead className="text-emerald-600">Nama</TableHead>
                            <TableHead className="text-emerald-600">Gender</TableHead>
                            <TableHead className="text-emerald-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white">
                        {data.map((item) => (
                            <TableRow className="border-y-2" key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell className="text-slate-600">{item.nama}</TableCell>
                                <TableCell className="text-slate-600">{item.gender}</TableCell>
                                <TableCell>
                                    <Ellipsis className="text-center text-slate-500" />
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
