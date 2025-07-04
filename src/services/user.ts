import type { IResponseUser } from "@/types/type"
import type { KaryawanFormValues, UserFormValues } from "@/types/form"

import axiosInstance from "axios"


const url = import.meta.env.VITE_BASE_URL

export const getAllUsers = async (token:string,page:number=0,limit:number=10,order:string="DESC",name:string=""):Promise<IResponseUser> => {
    try {
        const res = await axiosInstance.get<IResponseUser>(`${url}/api/users?page=${page}&limit=${limit}&order=${order}&username=${name}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const getKaryawanById = async (id:number,token:string):Promise<IResponseUser> => {
    try {
        const res = await axiosInstance.get<IResponseUser>(`${url}/api/karyawan/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (id:number,token:string):Promise<IResponseUser> => {
    try {
        const res = await axiosInstance.delete<IResponseUser>(`${url}/api/users/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        throw error;
    }
};

export const createKaryawan = async (data:KaryawanFormValues,token:string):Promise<IResponseUser> => {
    try {
        const res = await axiosInstance.post<IResponseUser>(`${url}/api/karyawan`,data,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        throw error;
    }
};

export const editUserById = async (data:UserFormValues,token:string,id:number):Promise<IResponseUser> => {
    try {
        const res = await axiosInstance.put<IResponseUser>(`${url}/api/users/${id}`,data,{headers:{
            Authorization:`Bearer ${token}`
        }});
        return res.data
    } catch (error) {
        throw error;
    }
};

