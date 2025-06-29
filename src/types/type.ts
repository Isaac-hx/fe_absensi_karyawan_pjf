//This file is contain what data should be look
export interface IKaryawan{
    id: number,
    name: string,
    email: string,
    no_telp: string,
    gender: string
}

export interface IUser{
    id:number,
    username:string,
    status: "active" | "inactive"
}

export interface IAbsensi{
    absensi_id?:number,
    karyawan_id:number,
    name:string,
    url_profile:string,
    url_signature:string,
    target_work:string,
    result_work:string,
    location:string,
    create_date:string,
    check_in?:string,
    check_out?:string,

}
export interface ILogin {
  username: string;
  password: string;
}

export interface IPagination{
    total_items: number;
    total_pages: number;
    current_page: number;
}

interface IResponse{
    message:string
    pagination?:IPagination
}
export interface IResponseRegister extends IResponse{
    data?:string

}
export interface IResponseLogin extends IResponse{
    token:string
    username:string
}

export interface IResponseUser extends IResponse{
    data?:IUser|IUser[]
    
}


export interface IResponseKaryawan extends IResponse{
    data?:IKaryawan|IKaryawan[]
    
}


export interface IResponseAbsensi extends IResponse{
    data?:IAbsensi|IAbsensi[]
    
}