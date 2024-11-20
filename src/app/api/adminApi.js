import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (id,password)=>{
    console.log("heyyy")
    const data = await adminAxiosInstance.post('/login',{id,password});
    return data
}

export const addUser = async (values)=>{
    const data = await adminAxiosInstance.post('/addUser',{...values});
    return data
}

export const getUser = async()=>{
    const data = await adminAxiosInstance.get('/getUser');
    return data
}

export const getUserDetails = async(userId)=>{
    const data = await adminAxiosInstance.get(`userDetails/${userId}`);
    return data
}

export const searchUser = async(value)=>{
    const data = await adminAxiosInstance.get(`searchUser/${value}`);
    return data
}

export const updateUser = async(userId,values)=>{
    const data = await adminAxiosInstance.patch("/updateUser",{userId,values});
    return data
}

export const updatePassword = async(userId,password)=>{
    const data = await adminAxiosInstance.patch("/changeUserPassword",{userId,password});
    return data
}

export const addProduct = async(formdata)=>{
    console.log(formdata,"ivide working")
    const data = await adminAxiosInstance.post('/addProduct',{formdata});
    return data
}

export const addService = async(formdata)=>{
    const data = await adminAxiosInstance.post('/addService',{formdata});
    return data
}

export const getProAndSer = async()=>{
    const data = await adminAxiosInstance.get('/getProAndSer');
    return data
}

export const editProduct = async(productId,value)=>{
    console.log(productId,"okokokoko")
    const data = await adminAxiosInstance.patch('/editProduct',{productId,value});
    return data
}

export const editService = async(serviceId,value)=>{
    const data = await adminAxiosInstance.patch('/editService',{serviceId,value});
    return data    
}