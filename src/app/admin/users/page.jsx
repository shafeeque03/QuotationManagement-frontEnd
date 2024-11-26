"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../adminComponents/Sidebar.jsx";
import { useFormik } from "formik";
import { userValidation } from "../../../Validation/UserValidation.jsx";
import toast from "react-hot-toast";
import Pagination from "../../../commonComponents/Pagination.jsx";
import DownloadUsersPDFButton from "@/app/adminComponents/DownloadUsersPDFButton.jsx";
import { addUser, getUser } from "@/api/adminApi.js";
import useDebounce from "@/hook/useDebounce.jsx";
import UserListTable from "@/app/adminComponents/UserListTable.jsx";
import { UserPlus, X, Download, Loader2 } from "lucide-react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const usersPerPage = 2;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const initialValues = {
    userName: "",
    email: "",
    phone: "",
    loginId: "",
    password: "",
    cPassword: "",
  };

  const fetchUsers = async (page = 1, limit = usersPerPage, searchQuery = "") => {
    setIsLoading(true);
    try {
      const res = await getUser(page, limit, searchQuery);
      const { users, currentPage, totalPagess } = res.data;
      setAllUsers(users);
      setCurrentPage(currentPage);
      setTotalPages(totalPagess);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, usersPerPage]);

  const onSubmit = async () => {
    try {
      const res = await addUser(values);
      if (res?.status === 201) {
        toast.success("User added successfully!");
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: userValidation,
    onSubmit,
  });

  const InputField = ({ label, id, type = "text", ...props }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 p-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
        {...props}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Users Management
          </h1>
        </div>

        {/* Actions Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add New User</span>
            </button>
            
            <DownloadUsersPDFButton
              fileName="Users_Report"
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </DownloadUsersPDFButton>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl relative transform transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Add New User
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  label="User Name"
                  id="userName"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  label="Phone"
                  id="phone"
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  label="Login ID"
                  id="loginId"
                  name="loginId"
                  value={values.loginId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  label="Confirm Password"
                  id="cPassword"
                  type="password"
                  name="cPassword"
                  value={values.cPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : (
                    "Add User"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <UserListTable 
            allUsers={allUsers} 
            isLoading={isLoading} 
            currentPage={currentPage} 
            usersPerPage={usersPerPage}
          />
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => fetchUsers(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;