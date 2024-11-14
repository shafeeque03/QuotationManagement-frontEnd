"use client";
import {useSearchParams } from 'next/navigation.js';
import Sidebar from '../../adminComponents/Sidebar.jsx';
import React, { useState,useEffect } from 'react';
import { getUserDetails } from '../../api/adminApi.js';
const UserDetailsPage = () => {
  const params = useSearchParams()
  const userId = params.get('userId');
  const [isBlocked, setIsBlocked] = useState(false);
  const[userDetails,setUserDetails] = useState({});

  useEffect(() => {
    if (userId) { // Check if userId exists
      getUserDetails(userId)
        .then((res) => {
          setUserDetails(res?.data?.user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userId]); 
  console.log(userDetails,"userDetails after api call")

  const handleBlockUnblock = () => {
    setIsBlocked(!isBlocked);
  };

  return (
    <div className='md:flex lg:flex xl:flex 2xl:flex'>
      <Sidebar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Details</h2>
        
        <div className="space-y-6 text-gray-600">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={userDetails?.name}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={userDetails?.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={userDetails?.phone}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Login ID</label>
            <input
              type="text"
              value={userDetails?.loginId}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value="********"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleBlockUnblock}
              className={`px-6 py-2 rounded-md text-white ${isBlocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-colors`}
            >
              {isBlocked ? 'Unblock User' : 'Block User'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetailsPage;
