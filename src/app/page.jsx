"use client";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  Eye,
} from "lucide-react";
import UserMenu from "@/userComponents/UserMenu";
import { userDashboardData } from "@/api/userApi";
import { useSelector } from "react-redux";

const QuotationDashboard = () => {
  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const [quotations, setQuotations] = useState([]);
  const [approvedQtn, setApprovedQtn] = useState(0);
  const [rejectedQtn, setRejectedQtn] = useState(0);
  const [pendingQtn, setPendingQtn] = useState(0);
  const [totalQtn, setTotalQtn] = useState(0);

  useEffect(() => {
    userDashboardData(user).then((res) => {
      setQuotations(res?.data?.lastTenQuotations);
      setApprovedQtn(res?.data?.approvedQuotations);
      setPendingQtn(res?.data?.pendingQuotations);
      setRejectedQtn(res?.data?.rejectedQuotations);
      setTotalQtn(res?.data?.totalQuotations);
    });
  }, []);

  const quotationStats = {
    total: totalQtn,
    pending: pendingQtn,
    approved: approvedQtn,
    rejected: rejectedQtn,
  };

  const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div
      className={`${bgColor} rounded-lg p-6 shadow-md flex items-center space-x-4`}
    >
      <div className="bg-white/20 p-3 rounded-full">
        <Icon className="text-white" size={32} />
      </div>
      <div>
        <p className="text-white text-opacity-80 text-sm">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const statusColors = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserMenu />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Quotation Dashboard
          </h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FileText}
            title="Total Quotations"
            value={quotationStats.total}
            bgColor="bg-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Pending Quotations"
            value={quotationStats.pending}
            bgColor="bg-yellow-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Approved Quotations"
            value={quotationStats.approved}
            bgColor="bg-green-600"
          />
          <StatCard
            icon={XCircle}
            title="Rejected Quotations"
            value={quotationStats.rejected}
            bgColor="bg-red-600"
          />
        </div>

        {/* Quotations Table */}
        <div className="bg-white shadow-md rounded-lg">
          {/* Table Header */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Last 10 Quotations
            </h2>
          </div>

          {/* Table Content */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 text-left">Quotation ID</th>
                <th className="p-4 text-left">Created on</th>
                <th className="p-4 text-left">Expire Date</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation,index) => (
                <tr
                key={quotation.id||index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-800">{quotation.quotationId}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(quotation.createdAt)
                      .toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(quotation.expireDate)
                      .toLocaleDateString("en-GB")}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {quotation.subTotal||'N/A'}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={quotation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotationDashboard;
