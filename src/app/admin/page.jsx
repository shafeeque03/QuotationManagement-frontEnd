"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Users, FileText, Settings, Box } from "lucide-react";
import Sidebar from "../../components/adminComponents/Sidebar";
import { dashboardData } from "@/api/adminApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [quotations, setQuotations] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [services, setServices] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id;

  useEffect(() => {
    dashboardData(adminId)
      .then((res) => {
        setProducts(res.data.totalProducts);
        setServices(res.data.totalServices);
        setUsers(res.data.totalUsers);
        setQuotations(res.data.totalQuotations);
        setRevenueData(res.data.last7DaysRevenue || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Prepare data for the graph
  const today = new Date();
  const labels = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - i));
    return day.toISOString().split("T")[0];
  });

  const revenueValues = labels.map((date) => {
    const revenueEntry = revenueData.find((entry) => entry._id === date);
    return revenueEntry ? revenueEntry.totalAmount : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Revenue",
        data: revenueValues,
        fill: false,
        borderColor: "#34d399",
        backgroundColor: "#34d399",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#34d399",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f3f4f6" },
      },
      x: {
        grid: { color: "#f3f4f6" },
      },
    },
  };

  const statsCards = [
    { icon: FileText, title: "Total Quotations", value: quotations, color: "text-blue-600" },
    { icon: Users, title: "Total Users", value: users, color: "text-green-600" },
    { icon: Box, title: "Total Products", value: products, color: "text-purple-600" },
    { icon: Settings, title: "Total Services", value: services, color: "text-orange-600" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6 lg:p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <card.icon className={`w-10 h-10 ${card.color}`} />
                <span className="text-sm text-gray-500 font-medium">{card.title}</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Daily Revenue</h2>
            <span className="text-sm text-gray-500">Last 7 Days</span>
          </div>
          <div className="h-[350px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
