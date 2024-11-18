"use client";
import { useSearchParams } from "next/navigation.js";
import Sidebar from "../../adminComponents/Sidebar.jsx";
import React, { useState, useEffect } from "react";
import {
  getUserDetails,
  updateUser,
  updatePassword,
} from "../../api/adminApi.js";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  userEditValidation,
  passwordValidation,
} from "@/Validation/UserEditValidation.jsx";

const UserDetailsPage = () => {
  const params = useSearchParams();
  const userId = params.get("userId");
  const [userDetails, setUserDetails] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    if (userId) {
      getUserDetails(userId)
        .then((res) => {
          setUserDetails(res?.data?.user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userId]);

  const onSubmit = async () => {
    const res = await updateUser(userId, values);
    if (res.status === 200) {
      toast.success(res?.data?.message);
      setUserDetails(res?.data?.user);
      setUpdateMode(false);
    }
  };

  const onPasswordSubmit = async (passwordValues) => {
    const res = await updatePassword(userId, passwordValues);
    if (res.status === 200) {
      toast.success(res?.data?.message);
      setShowModal(false);
    } else {
      toast.error(res?.response?.data?.message || "Error updating password");
    }
  };

  const initialValues = {
    name: userDetails.name || "",
    email: userDetails.email || "",
    phone: userDetails.phone || "",
    loginId: userDetails.loginId || "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: userEditValidation,
    enableReinitialize: true,
  });

  const passwordFormik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: passwordValidation,
    onSubmit: onPasswordSubmit,
  });

  return (
    <div className="md:flex lg:flex xl:flex 2xl:flex">
      <Sidebar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
            User Details
          </h2>

          <div className="space-y-6 text-gray-600">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Update Mode:</label>
              <div
                onClick={() => setUpdateMode(!updateMode)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                  updateMode ? "bg-red-700" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    updateMode ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values?.name || ""}
                  readOnly={!updateMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                    updateMode ? "bg-white" : "bg-gray-100"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mb-3 ms-2">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values?.email || ""}
                  readOnly={!updateMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                    updateMode ? "bg-white" : "bg-gray-100"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-3 ms-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={values?.phone || ""}
                  readOnly={!updateMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                    updateMode ? "bg-white" : "bg-gray-100"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mb-3 ms-2">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Login ID
                </label>
                <input
                  type="text"
                  name="loginId"
                  value={values?.loginId || ""}
                  readOnly={!updateMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
                    updateMode ? "bg-white" : "bg-gray-100"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.loginId && (
                  <p className="text-red-500 text-sm mb-3 ms-2">
                    {errors.loginId}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-md text-white ${
                    updateMode
                      ? "bg-red-700 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  } transition-colors`}
                  disabled={!updateMode}
                >
                  Update
                </button>
              </div>
            </form>
            <div>
              <p
                className="text-black cursor-pointer flex justify-end"
                onClick={() => setShowModal(true)}
              >
                Change Password
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-ef">
          <div className="bg-white rounded-lg shadow-lg text-black p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-700">Change Password</h2>
            <form onSubmit={passwordFormik.handleSubmit}>
              {/* New Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordFormik.values.newPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    passwordFormik.errors.newPassword &&
                    passwordFormik.touched.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordFormik.errors.newPassword &&
                  passwordFormik.touched.newPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordFormik.errors.newPassword}
                    </p>
                  )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordFormik.values.confirmPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    passwordFormik.errors.confirmPassword &&
                    passwordFormik.touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordFormik.errors.confirmPassword &&
                  passwordFormik.touched.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordFormik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-700 text-white rounded-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
