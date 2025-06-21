import type { IKaryawan,IResponseKaryawan } from "@/types/type"
import type { KaryawanFormValues } from "@/types/form"

import axiosInstance from "axios"


const url = import.meta.env.VITE_BASE_URL

export const getAllKaryawan = async (token:string,page:number=0,limit:number=10,order:string="ASC",name:string=""):Promise<IResponseKaryawan> => {
    try {
        const res = await axiosInstance.get<IResponseKaryawan>(`${url}/api/karyawan?page=${page}&limit=${limit}&order=${order}&name=${name}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const getKaryawanById = async (id:number,token:string):Promise<IResponseKaryawan> => {
    try {
        const res = await axiosInstance.get<IResponseKaryawan>(`${url}/api/karyawan/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const deleteKaryawanById = async (id:number,token:string):Promise<IResponseKaryawan> => {
    try {
        const res = await axiosInstance.delete<IResponseKaryawan>(`${url}/api/karyawan/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const createKaryawan = async (data:KaryawanFormValues,token:string):Promise<IResponseKaryawan> => {
    try {
        const res = await axiosInstance.post<IResponseKaryawan>(`${url}/api/karyawan`,data,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        throw error;
    }
};

export const editKaryawanById = async (data:KaryawanFormValues,token:string,id:number):Promise<IResponseKaryawan> => {
    try {
        const res = await axiosInstance.put<IResponseKaryawan>(`${url}/api/karyawan/${id}`,data,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        throw error;
    }
};