import type { ILogin,IResponseLogin,IResponseRegister} from "@/types/type"
import axiosInstance from "axios"
import type { UserFormValues } from "@/types/form";

const url = import.meta.env.VITE_BASE_URL

export const register = async (data:UserFormValues):Promise<IResponseRegister> => {
    try {
        const res = await axiosInstance.post<IResponseRegister>(`${url}/api/users/register`,
            data
        );
        return res.data
    } catch (error) {
        throw error;
    }
};

export const login = async (data:ILogin):Promise<IResponseLogin> => {
    try {
        const res = await axiosInstance.post<IResponseLogin>(`${url}/api/users/login`,
            data)
        return res.data
    } catch (error) {
        throw error;
    }
};
