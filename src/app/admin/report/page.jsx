"use client"
import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { 
  Download, 
  TrendingUp, 
  Box, 
  Layers, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock 
} from "lucide-react";
import { totalReport } from "@/api/adminApi";
import { useSelector } from "react-redux";
import Sidebar from "@/adminComponents/Sidebar";

const ReportsDashboard = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        if (!adminId) {
          throw new Error('Admin ID not found');
        }

        const response = await totalReport(adminId);
        setReportData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch report data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchReportData();
  }, [adminId]);

  const generateChartData = (data, valueKey = 'totalRevenue') => ({
    labels: data.map(item => item.name || item._id),
    datasets: [{
      label: valueKey === 'totalRevenue' ? 'Revenue' : 'Count',
      data: data.map(item => item[valueKey]),
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)', 
        'rgba(16, 185, 129, 0.6)', 
        'rgba(236, 72, 153, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)', 
        'rgba(16, 185, 129, 1)', 
        'rgba(236, 72, 153, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  });

  const downloadCSV = () => {
    alert('CSV Export functionality to be implemented');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
          <p className="text-xl font-light">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white text-red-500">
        <p>Failed to load report data: {error.message}</p>
      </div>
    );
  }

  // Prepare Monthly Revenue Trend data
  const monthlyRevenueData = {
    labels: reportData.monthlyRevenueTrend
      .slice(-6)
      .map(item => {
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[item._id.month - 1]} ${item._id.year}`;
      }),
    datasets: [{
      label: 'Monthly Revenue',
      data: reportData.monthlyRevenueTrend
        .slice(-6)
        .map(item => item.totalRevenue),
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="min-h-screen bg-white p-6 w-full shadow-sm">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-light text-gray-800">
                Business <span className="text-blue-600 font-semibold">Insights</span>
              </h1>
              <p className="text-gray-500 mt-2">Comprehensive Business Performance Report</p>
            </div>
            <button 
              onClick={downloadCSV}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
            >
              <Download className="mr-2 h-5 w-5" /> Export Data
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500">Total Revenue</h3>
                <DollarSign className="text-blue-500" />
              </div>
              <p className="text-3xl font-semibold text-blue-600">
                ${reportData.totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500">Total Quotations</h3>
                <FileText className="text-green-500" />
              </div>
              <p className="text-2xl font-semibold text-green-600">
                {reportData.totalQuotations}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500">Top Service</h3>
                <Layers className="text-purple-500" />
              </div>
              <p className="text-xl font-semibold text-purple-600">
                {reportData.mostProvidedServices[0]?._id || 'N/A'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500">Best Product</h3>
                <Box className="text-pink-500" />
              </div>
              <p className="text-xl font-semibold text-pink-600">
                {reportData.mostPurchasedProducts[0]?._id || 'N/A'}
              </p>
            </div>
          </div>

          {/* Charts and Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue by Products */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Revenue by Products</h3>
              <Pie 
                data={generateChartData(reportData.mostPurchasedProducts)}
                options={{
                  plugins: {
                    legend: { 
                      labels: { 
                        color: 'rgb(55, 65, 81)',
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }}
              />
            </div>

            {/* Revenue by Services */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Revenue by Services</h3>
              <Pie 
                data={generateChartData(reportData.mostProvidedServices)}
                options={{
                  plugins: {
                    legend: { 
                      labels: { 
                        color: 'rgb(55, 65, 81)',
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }}
              />
            </div>

            {/* Quotation Status */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Quotation Status</h3>
              <div className="space-y-3">
                {Object.entries(reportData.quotationStatusBreakdown).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {status === 'accepted' && <CheckCircle className="text-green-500" />}
                      {status === 'rejected' && <XCircle className="text-red-500" />}
                      {status === 'pending' && <Clock className="text-yellow-500" />}
                      <span className="capitalize text-gray-700">{status}</span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Revenue Trend - Last 6 Months</h3>
              <Line 
                data={monthlyRevenueData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: {
                      grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        borderColor: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        color: 'rgba(0,0,0,0.6)',
                        callback: (value) => `$${value}`
                      }
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: 'rgba(0,0,0,0.6)' }
                    }
                  }
                }}
              />
            </div>

            {/* Top Clients */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Top Clients</h3>
              <div className="space-y-3">
                {reportData.topClients.map(client => (
                  <div 
                    key={client.name} 
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                  >
                    <span className="text-gray-700">{client.name}</span>
                    <div className="text-right">
                      <div className="text-sm text-blue-600 font-semibold">
                        ${client.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {client.quotationCount} Quotations
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;