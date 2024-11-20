"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../adminComponents/Sidebar.jsx";
import { addUser, getUser, searchUser } from "../../api/adminApi.js";
import { useFormik } from "formik";
import { userValidation } from "../../../Validation/UserValidation.jsx";
import toast from "react-hot-toast";
import Link from "next/link.js";
import Pagination from "../../../commonComponents/Pagination.jsx";
import { MoonLoader, BeatLoader } from "react-spinners";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const usersPerPage = 2; // Number of users per page

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

  // Fetch all users with pagination
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getUser();
      const allUsers = res?.data?.users || [];
      setTotalPages(Math.ceil(allUsers.length / usersPerPage));
      const paginatedUsers = allUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
      );
      setUsers(paginatedUsers);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const res = await searchUser(searchQuery);
      const filteredUsers = res?.data?.filteredUsers || [];
      setUsers(filteredUsers.slice(0, usersPerPage));
      setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 bg-slate-200 w-full min-h-screen p-4 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
  <h1 className="text-2xl md:text-3xl text-red-700">Users</h1>
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
    <input
      type="text"
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm w-full sm:w-60 text-gray-800"
    />
    <button
      onClick={handleSearch}
      className="w-full sm:w-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
    >
      Search
    </button>
  </div>
  <button
    type="button"
    onClick={openModal}
    className="text-gray-600 bg-gray-200 border border-gray-400 hover:bg-red-700 hover:border-none hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:scale-110 transform transition duration-700"
  >
    Add New User
  </button>
</div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg z-50 fade-ef">
            <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mb-4">
                Add New User
              </h2>
              <form className="text-gray-800" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="LoginId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Login ID
                  </label>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.loginId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.loginId && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.loginId}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cPassword"
                    name="cPassword"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={values.cPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.cPassword && (
                    <p className="text-red-500 text-sm mb-3 ms-2">
                      {errors.cPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {/* User Table */}
        <div className="mt-4">
        <div className="relative overflow-x-auto rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-700">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
      <tr>
        <th className="px-4 py-2 md:px-6 md:py-3">No</th>
        <th className="px-4 py-2 md:px-6 md:py-3">User Name</th>
        <th className="px-4 py-2 md:px-6 md:py-3">Login ID</th>
        <th className="px-4 py-2 md:px-6 md:py-3">Email</th>
      </tr>
    </thead>
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan="4" className="px-4 py-2 text-center">
            <MoonLoader color="#4A90E2" />
          </td>
        </tr>
      ) : users.length > 0 ? (
        users.map((user, index) => (
          <tr
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
            key={user._id || index}
            onClick={() =>
              (window.location.href = `/admin/userdetails?userId=${user._id}`)
            }
          >
            <th className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-700">
              {(currentPage - 1) * usersPerPage + index + 1}
            </th>
            <td className="px-4 py-2 md:px-6 md:py-4">{user.name}</td>
            <td className="px-4 py-2 md:px-6 md:py-4">{user.loginId}</td>
            <td className="px-4 py-2 md:px-6 md:py-4">{user.email}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center px-4 py-2">
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Page;
