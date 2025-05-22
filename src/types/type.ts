export interface IKaryawan{
    id: number,
    nama: string,
    email: string,
    no_telepon: string,
    jenis_kelamin: string
}

export interface IUser{
    id:number,
    username:string,
    status: "Active" | "Inactive"
}