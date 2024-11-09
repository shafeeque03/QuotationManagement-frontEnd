import axios from "axios";
const baseURL = "http://localhost:3005/admin";
const adminInstance  = axios.create({baseURL:baseURL})
export const adminLoginVerify = async (id,password)=>{
    console.log(id,password,"hellooo");
    const data = await adminInstance.post('/login',{id,password});
    return data
}