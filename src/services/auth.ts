import type { ILogin,IResponseLogin} from "@/types/type"
import axiosInstance from "axios"


const url = import.meta.env.VITE_BASE_URL

// export const register = async (token:string,data:ILogin):Promise<IResponseFetch> => {
//     try {
//         const res = await axiosInstance.post<IResponseFetch>(`${url}/api/users/register`,
//             data
//             ,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             }
//         });
//         return res.data
//     } catch (error) {
//         throw error;
//     }
// };

export const login = async (data:ILogin):Promise<IResponseLogin> => {
    try {
        const res = await axiosInstance.post<IResponseLogin>(`${url}/api/users/login`,
            data)
        return res.data
    } catch (error) {
        throw error;
    }
};
