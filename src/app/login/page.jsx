// src/app/admin/login/page.jsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userLoginApi } from '../../api/userApi';
import toast from 'react-hot-toast';
import { userLogin } from '@/redux/slice/UserSlice';
import Cookies from 'js-cookie';



const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userLoginApi(loginId, password); // API request to login
      console.log(res.data,"juuuoo")
  
      if (res.status === 200) {
        toast.success(res?.data?.message);
  
        // Store token in cookies (ensure secure flag is set for production)
        Cookies.set('userToken', res?.data?.accessToken, {
          expires: 0.5, // 12 hours
          secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
          sameSite: 'strict', // Protect against CSRF
        });
  
        // Dispatch user login details to Redux store
        dispatch(userLogin({ token: res?.data?.accessToken, user: res?.data?.user }));
  
        // Redirect user to home page
        router.push('/');
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || 'ID or Password incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Employee Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 font-medium mb-2">Login ID</label>
              <input
                type="text"
                id="text"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Login ID"
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src="/employeePhoto.png"
            alt="Login illustration"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
