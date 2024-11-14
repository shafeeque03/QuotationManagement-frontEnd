import axios from "axios";
const baseURL = "http://localhost:3005/admin";
const adminInstance  = axios.create({baseURL:baseURL});

export const adminLoginVerify = async (id,password)=>{
    const data = await adminInstance.post('/login',{id,password});
    return data
}

export const addUser = async (values)=>{
    const data = await adminInstance.post('/addUser',{...values});
    return data
}

export const getUser = async()=>{
    const data = await adminInstance.get('/getUser');
    return data
}

export const getUserDetails = async(userId)=>{
    const data = await adminInstance.get(`userDetails/${userId}`);
    return data
}

export const searchUser = async(value)=>{
    const data = await adminInstance.get(`searchUser/${value}`);
    return data
}