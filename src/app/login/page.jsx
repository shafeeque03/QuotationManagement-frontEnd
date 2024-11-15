// src/app/admin/login/page.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


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
