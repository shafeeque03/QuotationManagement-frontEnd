"use client";
import { UserMenu } from "@/components/userComponents/UserMenu";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Pagination from "@/components/commonComponents/Pagination";
import useDebounce from "@/hook/useDebounce";
import { Search, Calendar, SortDesc, PlusCircle } from "lucide-react";
import QuotationCard from "@/components/userComponents/QuotationCard";
import { filteredData } from "@/api/userApi";
import { useSearchParams } from "next/navigation";


const Quotations = () => {
  const [hydrated, setHydrated] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 12;

  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const debouncedStartDate = useDebounce(startDate, 600);
  const debouncedEndDate = useDebounce(endDate, 600);
  const debouncedSortOrder = useDebounce(sortOrder, 600);

  const handleCreateQuotation = () => {
    router.push("/create-quotation");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/quotations?page=${page}`, { scroll: false });
  };

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const response = await filteredData({
        searchTerm: debouncedSearchTerm,
        startDate: debouncedStartDate,
        endDate: debouncedEndDate,
        sortBy: "createdAt",
        sortOrder: debouncedSortOrder || "desc",
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        user: user,
      });

      setQuotations(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   router.push('/quotations?page=1');
  //   setCurrentPage(1);
  // }, [searchTerm, sortOrder, startDate, endDate]);

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

  const handleSearch = (e) => {
    setCurrentPage(1);
    router.push('/quotations?page=1')
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStartDate = (e)=>{
    setCurrentPage(1);
    router.push('/quotations?page=1')
    setStartDate(e.target.value)
  }

  const handleEndDate = (e)=>{
    setCurrentPage(1);
    router.push('/quotations?page=1')
    setEndDate(e.target.value)
  }

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!user ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl text-gray-300">Loading user information...</p>
        </div>
      ) : (
        <>
          <UserMenu />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Quotation Management
              </h1>
            </div>

            {/* Search, Sort, and Filter Section */}
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
                      onChange={handleStartDate}
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
                      onChange={handleEndDate}
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
                <button
                  onClick={handleCreateQuotation}
                  className="flex items-center justify-center space-x-2 px-4 py-3 
      bg-gradient-to-r from-indigo-600 to-purple-600 
      text-white rounded-xl 
      hover:from-indigo-700 hover:to-purple-700 
      transition w-full text-sm sm:text-base"
                >
                  <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Create Quotation</span>
                </button>
              </div>
            </div>

            {/* Quotations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-white/50 backdrop-blur-xl rounded-2xl animate-pulse h-64 shadow-lg"
                      ></div>
                    ))
                : quotations.map((value) => (
                    <QuotationCard key={value._id} value={value} />
                  ))}
            </div>

            {/* Empty State */}
            {!loading && quotations.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <p className="text-2xl text-gray-500 mb-4">
                  No Quotations Found
                </p>
                <p className="text-gray-400 mb-6">
                  Create your first quotation or adjust your search filters
                </p>
                <button
                  onClick={handleCreateQuotation}
                  className="mx-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Create New Quotation</span>
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quotations;
