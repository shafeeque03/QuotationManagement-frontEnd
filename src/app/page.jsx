// pages/quotations.js
"use client"
import { UserMenu } from "@/app/admin/userComponents/UserMenu";
import React, { useState } from "react";

const Quotations = () => {
  const [quotations, setQuotations] = useState([
    { no: 1, quotationNumber: "QTN001", expiryDate: "2024-12-01", status: "Pending" },
    { no: 2, quotationNumber: "QTN002", expiryDate: "2024-11-30", status: "Approved" },
    { no: 3, quotationNumber: "QTN003", expiryDate: "2024-12-15", status: "Rejected" },
    { no: 4, quotationNumber: "QTN004", expiryDate: "2024-12-15", status: "Rejected" },
  ]);

  const getStatusStyle = (status) => {
    if (status === "Approved") return "bg-green-500/20 text-green-600";
    if (status === "Rejected") return "bg-red-500/20 text-red-600";
    return "bg-yellow-500/20 text-yellow-600";
  };

  return (
    <div>
      <UserMenu/>
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800 p-6">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Quotations List
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quotations.map((quotation) => (
            <div
              key={quotation.no}
              className="bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 p-6"
            >
              <p className="text-gray-500 text-sm">No: {quotation.no}</p>
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                Quotation #{quotation.quotationNumber}
              </h2>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Expiry Date:</span>{" "}
                {quotation.expiryDate}
              </p>
              <div
                className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                  quotation.status
                )}`}
              >
                {quotation.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Quotations;
