import { userAxiosInstance } from "./axiosInstance";

export const userLoginApi = async(loginId,password)=>{
    const data = await userAxiosInstance.post('/login',{loginId,password});
    return data
}

export const addClient = async(value,adminId)=>{
    const data = await userAxiosInstance.post('/addClient',{value,adminId});
    return data
}

export const getClients = async()=>{
    const data = await userAxiosInstance.get('/getClients');
    return data
}

export const addQuotation = async(quotationData,adminId)=>{
    const data = await userAxiosInstance.post('/createQuotation',{...quotationData,adminId});
    return data
}

export const quotationDetails = async(qid)=>{
    const data = await userAxiosInstance.get(`quotationDetails/${qid}`);
    return data
}

export const quotationStatusChange = async(status,reason,qid)=>{
    const data = await userAxiosInstance.patch('/qtnStatusChange',{status, reason,qid});
    return data
}

export const filteredData = async ({ searchTerm, startDate, endDate, sortBy, sortOrder, page, limit,user }) => {
    const params = {
      searchTerm,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page,
      limit,
      user
    };
  
    const response = await userAxiosInstance.get("/filteredData", { params });
    return response.data;
  };

  export const getProAndSer = async(adminId)=>{
    const data = await userAxiosInstance.get(`/getProAndSer/${adminId}`);
    return data
  }
