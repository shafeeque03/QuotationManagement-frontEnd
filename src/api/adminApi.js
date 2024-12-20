import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (id, password) => {
  const data = await adminAxiosInstance.post("/login", { id, password });
  return data;
};

export const dashboardData = async(adminId)=>{
  const params = {adminId}
  const data  = await adminAxiosInstance.get('/dashboardData',{params});
  return data
  
}

export const downloadSerOrPro = async (fileName, admin_id) => {
  const data = await adminAxiosInstance.get(
    `/downloadSerOrPro?fileName=${fileName}&adminId=${admin_id}`
  );
  return data;
};

//user
export const addUser = async (values, admin) => {
  const data = await adminAxiosInstance.post("/addUser", { ...values, admin });
  return data;
};

export const getUserDetails = async (userId) => {
  const data = await adminAxiosInstance.get(`userDetails/${userId}`);
  return data;
};



export const updateUser = async (userId, values) => {
  const data = await adminAxiosInstance.patch("/updateUser", {
    userId,
    values,
  });
  return data;
};

export const updatePassword = async (userId, password) => {
  const data = await adminAxiosInstance.patch("/changeUserPassword", {
    userId,
    password,
  });
  return data;
};

export const getUser = async (page, limit, search, admin_id) => {
  const data = await adminAxiosInstance.get(
    `/getUser?page=${page}&limit=${limit}&search=${search}&adminId=${admin_id}`
  );
  return data;
};

//product


export const getProducts = async (
  adminId,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  try {
    const res = await adminAxiosInstance.get(
      `/getProducts?adminId=${adminId}&page=${page}&limit=${limit}&searchQuery=${encodeURIComponent(
        searchQuery
      )}`
    );
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Rethrow error for caller to handle
  }
};



//service
export const getServices = async (
  adminId,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  try {
    const res = await adminAxiosInstance.get(
      `/getServices?adminId=${adminId}&page=${page}&limit=${limit}&searchQuery=${encodeURIComponent(
        searchQuery
      )}`
    );
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Rethrow error for caller to handle
  }
};


export const getClinets = async (page, limit, search,adminId) => {
  const data = await adminAxiosInstance.get(
    `/getClients?page=${page}&limit=${limit}&search=${search}&adminId=${adminId}`
  );
  return data;
};

export const filteredQuotation = async ({
  searchTerm,
  startDate,
  endDate,
  sortBy,
  sortOrder,
  page,
  limit,
  adminId
}) => {
  const params = {
    searchTerm,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page,
    limit,
    adminId
  };

  const response = await adminAxiosInstance.get("/filteredQuotation", {
    params,
  });
  return response.data;
};

export const getAllUsers = async (adminId) => {
  const data = await adminAxiosInstance.get(`/getAllUsers/${adminId}`);
  return data;
};

export const getAllClients = async (adminId) => {
  const data = await adminAxiosInstance.get(`/getAllClients/${adminId}`);
  return data;
};

export const downloadQuotations = async ({
  searchTerm,
  startDate,
  endDate,
  sortBy,
  sortOrder,
  adminId
}) => {
  console.log(adminId,"okok")
  const params = {
    searchTerm,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    adminId
  };

  const response = await adminAxiosInstance.get("/downloadQuotation", {
    params,
  });
  return response.data;
};

export const totalReport = async(adminId)=>{
  const data = await adminAxiosInstance.get(`/totalReport/${adminId}`);
  return data
}

export const downloadReportByDateRange = async (adminId, startDate, endDate) => {
  try {
    const response = await adminAxiosInstance.get(`/download-report/${adminId}?startDate=${startDate}&endDate=${endDate}`, {
      responseType: 'blob' // Keep this as blob
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `quotations_${startDate}_to_${endDate}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response;
  } catch (error) {
    throw error;
  }
};
export const updateAdminProfile = async(adminId,values)=>{
  const data = await adminAxiosInstance.post('/updateProfile',{adminId,values});
  return data
}

export const updateAdminPassword = async(adminId,password)=>{
  const data = await adminAxiosInstance.post('/updateProfilePassword',{adminId,password})
}

export const updateAdminLogo = async(adminId,file)=>{
  const data = await adminAxiosInstance.post('/updateLogo',{adminId,file});
  return data
}

export const quotationDetails = async(qid)=>{
  const data = await adminAxiosInstance.get(`quotationDetails/${qid}`);
  return data
}

export const createAdmin = async(formData)=>{
  const data = await adminAxiosInstance.post('/createAdmin',{formData});
  return data
}

export const verifyOtp = async(adminId,otp)=>{
  const data = await adminAxiosInstance.post('/verifyOtp',{adminId,otp});
  return data
}

export const resendOtp = async(adminId)=>{
  const data = await adminAxiosInstance.post('/resendOtp',{adminId});
  return data
}

export const forgetPassword = async(email)=>{
  const data = await adminAxiosInstance.post('/forgetPassword',{email});
  return data
}

export const changeAdminPassword = async(adminId,password)=>{
  const data = await adminAxiosInstance.post('/changePassword',{adminId,password});
  return data
}