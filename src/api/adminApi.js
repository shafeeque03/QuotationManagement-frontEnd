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