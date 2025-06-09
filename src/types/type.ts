//This file is contain what data should be look
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

export interface IAbsensi{
    employee_id:number,
    name:string,
    url_profile:string,
    url_signature:string,
    target_work:string,
    result_work:string,
    location:string,
    create_date:string,
    check_in:number,
    check_out:number,

}