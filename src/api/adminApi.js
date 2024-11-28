import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (id,password)=>{
    const data = await adminAxiosInstance.post('/login',{id,password});
    return data
}

export const addUser = async (values,admin)=>{
    const data = await adminAxiosInstance.post('/addUser',{...values,admin});
    return data
}

export const getUser = async (page, limit, search,admin_id) => {
    const data = await adminAxiosInstance.get(
      `/getUser?page=${page}&limit=${limit}&search=${search}&adminId=${admin_id}`
    );
    return data;
  };
  

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
    const data = await adminAxiosInstance.patch('/editProduct',{productId,value});
    return data
}

export const editService = async(serviceId,value)=>{
    const data = await adminAxiosInstance.patch('/editService',{serviceId,value});
    return data    
}

export const getClinets =  async (page, limit, search) => {
    const data = await adminAxiosInstance.get(
      `/getClients?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  };

  export const filteredQuotation = async ({ searchTerm, startDate, endDate, sortBy, sortOrder, page, limit }) => {
    const params = {
      searchTerm,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page,
      limit,
    };
  
    const response = await adminAxiosInstance.get("/filteredQuotation", { params });
    return response.data;
  };

export const getAllUsers = async()=>{
    const data = await adminAxiosInstance.get('/getAllUsers');
    return data
}

export const getAllClients = async()=>{
    const data = await adminAxiosInstance.get('/getAllClients');
    return data
}