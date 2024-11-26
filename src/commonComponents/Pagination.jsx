"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg font-bold transition ${
          currentPage === 1
            ? "bg-gray-700 text-gray-400"
            : "bg-indigo-600 text-gray-700 hover:bg-indigo-700"
        }`}
      >
        <FaChevronLeft className="mr-2" />
        
      </button>

      {/* Page Indicator */}
      <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold">
        {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-lg font-bold transition ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-400"
            : "bg-indigo-600 text-gray-700 hover:bg-indigo-700"
        }`}
      >
        <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
