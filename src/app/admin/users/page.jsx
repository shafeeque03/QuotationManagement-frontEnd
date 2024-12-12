"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/adminComponents/Sidebar.jsx";
import { useFormik } from "formik";
import { userValidation } from "../../../Validation/UserValidation.jsx";
import toast from "react-hot-toast";
import Pagination from "../../../components/commonComponents/Pagination.jsx";
import DownloadUsersPDFButton from "@/components/adminComponents/DownloadUsersPDFButton.jsx";
import { addUser, getUser } from "@/api/adminApi.js";
import useDebounce from "@/hook/useDebounce.jsx";
import UserListTable from "@/components/adminComponents/UserListTable.jsx";
import { UserPlus, X, Download, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const admin_id = admin?._id
  const usersPerPage = 1;

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
      const res = await getUser(page, limit, searchQuery,admin_id);
      setAllUsers(res.data.users);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, usersPerPage]);

  const onSubmit = async () => {
    try {
      const res = await addUser(values,admin);
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

  const { values, handleBlur, handleChange, handleSubmit, errors,touched } = useFormik({
    initialValues,
    validationSchema: userValidation,
    onSubmit,
  });


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
              adminId={admin_id}
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </DownloadUsersPDFButton>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white w-full max-w-md mx-4 p-6 rounded-3xl shadow-xl relative transform transition-all duration-300">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Add New User
        </h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User Name Field */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter user's name"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.userName && touched.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter user's email"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Login ID Field */}
        <div>
          <label htmlFor="loginId" className="block text-sm font-medium text-gray-700">
            Login ID
          </label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={values.loginId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter login ID"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.loginId && touched.loginId && (
            <p className="text-red-500 text-xs mt-1">{errors.loginId}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter password"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="cPassword"
            name="cPassword"
            value={values.cPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Re-enter password"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          {errors.cPassword && touched.cPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.cPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            setAllUsers={setAllUsers}
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
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;