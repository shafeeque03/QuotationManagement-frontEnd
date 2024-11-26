"use client"; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2'; // Importing chart.js for the graph
import { Chart as ChartJS } from 'chart.js/auto';
import { adminLogout } from '@/redux/slice/AdminSlice.jsx';
import Sidebar from '../adminComponents/Sidebar';

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    Cookies.remove('adminToken');
    dispatch(adminLogout());
    router.push('/admin/login');
  };

  // Dummy data for the graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users Growth',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full bg-blue-600 p-5">
        <div className="w-full">
          <h1 className="font-xl text-white text-4xl mt-3 text-center">
            Welcome to Dashboard
          </h1>
          <h1
            className="text-black text-2xl text-center mt-4 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h1>
        </div>

        {/* Box Grid for small data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-black">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Quotations</h2>
            <p className="text-2xl font-bold text-gray-800">1,250</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800">1,230</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
            <h2 className="text-lg font-semibold">Total Clients</h2>
            <p className="text-2xl font-bold text-gray-800">40</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-gray-600">
            <h2 className="text-lg font-semibold">New Customers</h2>
            <p className="text-2xl font-bold text-gray-800">150</p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">User Growth Over Time</h2>
          <div className="mt-4">
            <Line data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
