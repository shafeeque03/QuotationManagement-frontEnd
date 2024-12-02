const { hosterAxiosInstance } = require("./axiosInstance");


export const hosterLoginVerify = async (id,password)=>{
    const data = await hosterAxiosInstance.post('/login',{id,password});
    return data
}

export const createAdmin = async(formData)=>{
    const data = await hosterAxiosInstance.post('/createAdmin',{formData});
    return data
}

export const getAdmins = async()=>{
    const data = await hosterAxiosInstance.get('/getAdmins');
    return data
}

export const getAdminDetails = async(adminId)=>{
    const data = await hosterAxiosInstance.get(`/getAdminDetails/${adminId}`);
    return data
}

export const changeAdminPassword = async(adminId,password)=>{
    const data = await hosterAxiosInstance.post('/changeAdminPassword',{adminId,password});
    return data
}

export const changAdminBlock = async(adminId,status)=>{
    const data = await hosterAxiosInstance.post('/changeAdminBlock',{adminId,status});
    return data
}