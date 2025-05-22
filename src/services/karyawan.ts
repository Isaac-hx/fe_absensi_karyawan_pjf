import type { IKaryawan, IUser } from "@/types/type";
import axiosInstance from "axios"


const url = "https://run.mocky.io/v3/2afb4572-95dd-4045-8075-fd90db489566"

export const getAllKaryawan = async ():Promise<IKaryawan[]> => {
    try {
        const res = await axiosInstance.get<IKaryawan[]>(url);
        return res.data
    } catch (error) {
        throw error;
    }
};