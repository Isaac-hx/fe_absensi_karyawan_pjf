import type { IKaryawan, IUser } from "@/types/type";
import axiosInstance from "axios"


const url = "https://run.mocky.io/v3/c3b00f74-d6fc-4dd0-a7d8-ee3a0c23311b"

export const getAllKaryawan = async ():Promise<IKaryawan[]> => {
    try {
        const res = await axiosInstance.get<IKaryawan[]>(url);
        return res.data
    } catch (error) {
        throw error;
    }
};