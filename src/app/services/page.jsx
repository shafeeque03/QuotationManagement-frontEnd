"use client";
import React, { useState, useEffect } from "react";
import { getServices } from "@/api/adminApi.js";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce.jsx";
import Pagination from "@/commonComponents/Pagination.jsx";
import UserMenu from "@/userComponents/UserMenu.jsx";
import ServiceTable from "@/userComponents/ServiceTable";

const Page = () => {
  const [allServices, setAllServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const adminId = user?.adminIs;
  const servicesPerPage = 4;


  const fetchServices = async (
    page = 1,
    limit = servicesPerPage,
    searchQuery = ""
  ) => {
    setIsLoading(true);
    try {
      const data = await getServices(adminId, page, limit, searchQuery);
      setAllServices(data.services);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error in fetch Services:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchServices(currentPage, servicesPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery,servicesPerPage]);




  return (
    <div className=" min-h-screen bg-gray-50">
      {/* Sidebar */}
      <UserMenu />
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Services
          </h1>
        </div>

        {/* Search & Add Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
            />
          </div>

        </div>


        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
          </div>
        ) : (
          <ServiceTable
          filteredServices={allServices}
            currentPage={currentPage}
            servicesPerPage={servicesPerPage}
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Page;
