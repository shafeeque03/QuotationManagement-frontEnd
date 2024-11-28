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