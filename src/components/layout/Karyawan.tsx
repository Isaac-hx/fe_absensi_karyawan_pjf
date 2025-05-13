import type React from "react";
import TextLabel from "../common/TextLabel";
import { Input } from "@/components/ui/input";
import { Table,TableCaption,TableBody,TableCell,TableHead,TableHeader,TableFooter,TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

const data = [
    {id: 1475, nama: "Rina", gender: "Perempuan"},
    {id: 4685, nama: "Agus", gender: "Laki-laki"},
    {id: 7145, nama: "Wawan", gender: "Perempuan"},
    {id: 9983, nama: "Yuni", gender: "Laki-laki"},
    {id: 8521, nama: "Indra", gender: "Perempuan"},
    {id: 4744, nama: "Surya", gender: "Laki-laki"},
    {id: 6908, nama: "Budi", gender: "Laki-laki"},
    {id: 1367, nama: "Dewi", gender: "Laki-laki"},
    {id: 4011, nama: "Yuni", gender: "Laki-laki"},
    {id: 8548, nama: "Budi", gender: "Perempuan"}
]


const Karyawan:React.FC = ()=>{
    return(
        <div className=" bg-white rounded-md border-1">
            <section>
                <TextLabel text="Karyawan"/>
            </section>
            <section className="my-4 p-4">
                <div className=" flex justify-between items-center">
                    <div className="flex gap-1  w-2/6 md:w-">
                        <Input
                        id="search-karyawan"
                        type="text"
                        className="w-full text-xs bg-white "
                        placeholder="Masukan nama karyawan..."
                    />

                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">Cari</Button>
                    </div>
                    <div>
                        <Button className="bg-emerald-500 text-xl  hover:bg-emerald-600  cursor-pointer">+</Button>
                    </div>
                </div>

            </section>

            <section>
                <Table className="bg-white" >
                    <TableHeader className="bg-slate-100 ">
                        <TableRow>
                        <TableHead >ID </TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-slate-50">
                        {data.map((item) => (
                        <TableRow className="border-y-2" key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>{item.gender}</TableCell>
                            <TableCell ><Ellipsis className="text-center text-slate-500"/></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>

                    </Table>
            </section>
        </div>
    )
}

export default Karyawan