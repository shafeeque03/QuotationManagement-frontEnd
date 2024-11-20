import { userAxiosInstance } from "./axiosInstance";
export const userLoginApi = async(loginId,password)=>{
    const data = await userAxiosInstance.post('/login',{loginId,password});
    return data
}
