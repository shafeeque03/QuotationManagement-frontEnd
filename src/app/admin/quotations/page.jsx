"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/commonComponents/Pagination";
import useDebounce from "@/hook/useDebounce";
import { Search, Calendar, SortDesc, Eye } from "lucide-react";
import { filteredQuotation } from "@/api/adminApi";
import Sidebar from "@/adminComponents/Sidebar";
import DownloadQuotationsPDF from "@/adminComponents/DownloadQuotationsPDF";
import { useSelector } from "react-redux";
import QuotationTable from "@/adminComponents/QuotationTable";

const QuotationsTable = () => {
  const [hydrated, setHydrated] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id;

  const ITEMS_PER_PAGE = 5;
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const debouncedStartDate = useDebounce(startDate, 600);
  const debouncedEndDate = useDebounce(endDate, 600);
  const debouncedSortOrder = useDebounce(sortOrder, 600);

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const response = await filteredQuotation({
        searchTerm: debouncedSearchTerm,
        startDate: debouncedStartDate,
        endDate: debouncedEndDate,
        sortBy: "createdAt",
        sortOrder: debouncedSortOrder || "desc",
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        adminId:adminId
      });

      setQuotations(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      fetchFilteredData();
    }
  }, [
    hydrated,
    debouncedSearchTerm,
    debouncedStartDate,
    debouncedEndDate,
    debouncedSortOrder,
    currentPage,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, startDate, endDate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
  };

  const handleViewQuotation = (id) => {
    router.push(`/admin/quotations/${id}`);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Search, Sort, and Filter Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Quotations
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="number"
                placeholder="Search by Quotation ID"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                  [&::-webkit-outer-spin-button]:appearance-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 text-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    text-xs sm:text-sm"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 text-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    text-xs sm:text-sm"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Sort Button */}
            <button
              onClick={handleSort}
              className="flex items-center justify-center space-x-2 px-4 py-3 
                bg-indigo-50 text-indigo-600 rounded-xl 
                hover:bg-indigo-100 transition
                w-full text-sm sm:text-base"
            >
              <SortDesc className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>
                Sort by
                {sortOrder === "asc" ? " ↑" : " ↓"}
              </span>
            </button>

            {/* Create Quotation Button */}
            <DownloadQuotationsPDF
                searchTerm={debouncedSearchTerm}
                startDate={debouncedStartDate}
                endDate={debouncedEndDate}
                sortBy={"createdAt"}
                sortOrder={debouncedSortOrder || "asc"}
                adminId={adminId}
            />
          </div>
        </div>

        {/* Quotations Table */}
        {loading ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-12 bg-gray-100 rounded w-full"></div>
          </div>
        ) : quotations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-500 mb-4">No Quotations Found</p>
          </div>
        ) : (
          <QuotationTable quotations={quotations} handleViewQuotation={handleViewQuotation}/>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationsTable;
