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
      {/* Render pagination only if totalPages > 1 */}
      {totalPages > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`p-3 font-bold transition rounded-full p-2 ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400"
                : "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
            }`}
          >
            <FaChevronLeft />
          </button>

          {/* Page 1 Button */}
          <button
            onClick={() => onPageChange(1)}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              currentPage === 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-700 hover:text-white"
            }`}
          >
            1
          </button>

          {/* Ellipsis */}
          {currentPage > 2 && totalPages > 2 && (
            <span className="px-4 py-2 text-gray-700 font-bold">...</span>
          )}

          {/* Current Page */}
          {currentPage > 1 && currentPage < totalPages && (
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-indigo-600 text-gray-100 hover:bg-indigo-700"
            >
              {currentPage}
            </button>
          )}

          {/* Last Page Button */}
          {totalPages > 1 && (
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                currentPage === totalPages
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-700 hover:text-white"
              }`}
            >
              {totalPages}
            </button>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-full font-bold transition ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400"
                : "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
            }`}
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
