import type { IResponseAbsensi } from "@/types/type"
import type { AbsenFormValues } from "@/types/form"

import axiosInstance from "axios"


const url = import.meta.env.VITE_BASE_URL


export const createAbsensi = async (data:AbsenFormValues):Promise<IResponseAbsensi> => {
    try {
        const res = await axiosInstance.post<IResponseAbsensi>(`${url}/api/absensi`,data);
        return res.data
    } catch (error) {
        throw error;
    }
};

export const getAllAbsensi = async (token:string,page:number=0,limit:number=10,order:string="DESC",search:string="")=>{
    try{
        const res = await axiosInstance.get<IResponseAbsensi>(`${url}/api/absensi?page=${page}&limit=${limit}&order=${order}&search=${search}`,{headers:{Authorization:`Bearer ${token}`}})
         return res.data

    }catch(e){
        throw e.response
    }
}

export const getAbsensiById = async (token:string,id:number)=>{
    try{
        const res = await axiosInstance.get<IResponseAbsensi>(`${url}/api/absensi/${id}`,{headers:{Authorization:`Bearer ${token}`}})
         return res.data

    }catch(e){
        throw e.response
    }
}