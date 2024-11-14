"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../adminComponents/Sidebar.jsx";
import { addUser, getUser, searchUser } from "../../api/adminApi.js";
import { useFormik } from "formik";
import { userValidation } from "../../../Validation/UserValidation.jsx";
import toast from "react-hot-toast";
import Link from "next/link.js";
import { MoonLoader, BeatLoader } from "react-spinners";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input

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

  // Fetch all users when the component mounts
  useEffect(() => {
    getUser()
      .then((res) => setUsers(res?.data?.users))
      .catch((err) => console.log(err.message));
  }, []);

  // Search function to filter users based on search input
  const handleSearch = async () => {
    try {
      const res = await searchUser(searchQuery); // Call the API with the search query
      setUsers(res?.data?.filteredUsers || []); // Update users with filtered data
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async () => {
    try {
      const res = await addUser(values);
      if (res?.status === 201) {
        getUser()
          .then((res) => setUsers(res?.data?.users))
          .catch((err) => console.log(err.message));
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
    <div className="md:flex lg:flex xl:flex 2xl:flex">
      <Sidebar />
      <div className="bg-slate-200 w-full min-h-screen p-9">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-gray-600">Users</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-60 text-gray-800"
            />
            <button
              onClick={handleSearch} // Trigger search on button click
              className="text-white bg-blue-600 border border-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="text-gray-600 bg-gray-200 border border-gray-400 hover:bg-gray-600 hover:border-none hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  hover:scale-110 transform transition duration-700"
          >
            Add New User
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed fade-ef inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
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
              <h2 className="text-xl text-gray-800 font-semibold mb-4">
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
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Login ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((value, index) => (
                    <tr className="bg-gray-200" key={value._id || index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-gray-700"
                      >
                        {index+1}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-gray-700"
                      >
                        {value.name}
                      </th>
                      <td className="px-6 py-4">{value.loginId}</td>
                      <td className="px-6 py-4">{value.email}</td>
                      <td className="px-6 py-4 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/admin/userdetails",
                            query: { userId: value._id },
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <BeatLoader color="#f23535" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
