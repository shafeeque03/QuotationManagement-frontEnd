"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/adminComponents/Sidebar.jsx";
import Pagination from "../../../components/commonComponents/Pagination.jsx";
import {getClinets } from "@/api/adminApi.js";
import useDebounce from "@/hook/useDebounce.jsx";
import ClientListTable from "@/components/adminComponents/ClientListTable.jsx";
import DownloadClientsPDF from "@/components/adminComponents/DownloadClientsPDF.jsx";
import { useSelector } from "react-redux";

const Page = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id;

  const usersPerPage = 20;

  const fetchUsers = async (page = 1, limit = usersPerPage, searchQuery = "") => {
    setIsLoading(true);
    try {
      const res = await getClinets(page, limit, searchQuery,adminId);
      const { users, currentPage, totalPagess } = res.data;
      setAllUsers(users);
      setCurrentPage(currentPage);
      setTotalPages(totalPagess);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, usersPerPage]);


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Clients
          </h1>
        </div>

        {/* Actions Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3">
          <DownloadClientsPDF adminId={adminId}/>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ClientListTable 
            allUsers={allUsers} 
            isLoading={isLoading} 
            currentPage={currentPage} 
            usersPerPage={usersPerPage}
          />
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => fetchUsers(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;