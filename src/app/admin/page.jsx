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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        fill: true,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#4F46E5",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1F2937",
        bodyColor: "#1F2937",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Revenue: $${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: "rgba(243, 244, 246, 0.8)",
          drawBorder: false
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          }
        }
      },
      x: {
        grid: { 
          display: false 
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          }
        }
      }
    }
  };

  const statsCards = [
    { icon: FileText, title: "Total Quotations", value: quotations, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { icon: Users, title: "Total Users", value: users, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { icon: Box, title: "Total Products", value: products, color: "text-violet-600", bgColor: "bg-violet-50" },
    { icon: Settings, title: "Total Services", value: services, color: "text-amber-600", bgColor: "bg-amber-50" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <span className="text-sm text-gray-600 font-medium">{card.title}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {card.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last 7 Days</span>
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="h-[300px] sm:h-[400px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;