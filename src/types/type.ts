export interface IKaryawan{
    id: number,
    nama: string,
    gender: string,
    email: string,
    no_telepon: string
}

export interface IUser{
    id:number,
    username:string,
    status: "Active" | "Inactive"
}