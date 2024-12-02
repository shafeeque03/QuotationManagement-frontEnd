"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { 
  Users, 
  FileText, 
  Settings,
  Box
} from 'lucide-react';
import Sidebar from '../../adminComponents/Sidebar';

const Dashboard = () => {
  // Dummy data for the graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users Growth',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: '#3b82f6',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        }
      },
      x: {
        grid: {
          color: '#f3f4f6'
        }
      }
    }
  };

  const statsCards = [
    {
      icon: FileText,
      title: 'Total Quotations',
      value: '1,250',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Total Users',
      value: '1,230',
      color: 'text-green-600'
    },
    {
      icon: Box,
      title: 'Total Products',
      value: '40',
      color: 'text-purple-600'
    },
    {
      icon: Settings,
      title: 'Total Services',
      value: '150',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-grow p-6 lg:p-8 space-y-8">
        {/* Stats Grid */}
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
            <h2 className="text-xl font-semibold text-gray-800">User Growth</h2>
            <span className="text-sm text-gray-500">Last 6 Months</span>
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