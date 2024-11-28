"use client";
import React, { useState } from "react";
import { createAdmin } from "@/api/hosterApi";
import { adminValidation } from "@/Validation/AdminValidation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import HosterMenu from "@/hosterComponents/HosterMenu";

const AdminRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const route = useRouter()
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    pincode: "",
    password: "",
    cPassword: "",
  };

  const onSubmit = async (values) => {
    try {
      const res = await createAdmin(values);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
        route.push('/hoster')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error.message);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: adminValidation,
    onSubmit,
  });

  return (
    <div>
      <HosterMenu/>
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Admin Account
          </h2>
          <p className="text-gray-600">
            Fill out the form to add a new admin to your system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                  errors.name && touched.name 
                    ? "border-red-500 ring-2 ring-red-200" 
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                  errors.email && touched.email 
                    ? "border-red-500 ring-2 ring-red-200" 
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                  errors.phone && touched.phone 
                    ? "border-red-500 ring-2 ring-red-200" 
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Address
              </label>
              <input
                id="address1"
                name="address1"
                type="text"
                value={values.address1}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                  errors.address1 && touched.address1 
                    ? "border-red-500 ring-2 ring-red-200" 
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                }`}
                placeholder="Enter primary address"
              />
              {errors.address1 && touched.address1 && (
                <p className="text-red-500 text-xs mt-1">{errors.address1}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Address (Optional)
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                value={values.address2}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter secondary address"
              />
            </div>

            <div className="relative">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                  errors.pincode && touched.pincode 
                    ? "border-red-500 ring-2 ring-red-200" 
                    : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                }`}
                placeholder="Enter pincode"
              />
              {errors.pincode && touched.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          {/* Full Width Password Section */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                    errors.password && touched.password 
                      ? "border-red-500 ring-2 ring-red-200" 
                      : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="cPassword"
                  name="cPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.cPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full px-4 py-3 text-sm rounded-lg border ${
                    errors.cPassword && touched.cPassword 
                      ? "border-red-500 ring-2 ring-red-200" 
                      : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  }`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? "👁️" : "🔒"}
                </button>
              </div>
              {errors.cPassword && touched.cPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Create Admin Account
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdminRegistrationPage;