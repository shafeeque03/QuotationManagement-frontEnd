"use client";
import React, { useEffect, useState } from "react";
import { UserMenu } from "../../userComponents/UserMenu";
import { useSearchParams } from "next/navigation";
import { quotationDetails, quotationStatusChange } from "../../api/userApi";
import toast from "react-hot-toast";
import DownloadQuotationPDF from "../../userComponents/DownloadQuotationPDF";

const Page = () => {
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const params = useSearchParams();
  const qid = params.get("qid");

  useEffect(() => {
    if (!qid) {
      setError("Quotation ID is missing from the URL.");
      setLoading(false);
      return;
    }

    quotationDetails(qid)
      .then((res) => {
        setQuotation(res?.data?.quotation);
      })
      .catch((err) => {
        console.error("Error fetching quotation details:", err.message);
        setError("Failed to fetch quotation details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [qid]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "rejected" && !rejectReason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    try {
      await quotationStatusChange(newStatus, rejectReason, qid);
      setQuotation((prev) => ({
        ...prev,
        status: newStatus,
        cancelReason: newStatus === "rejected" ? rejectReason : prev.cancelReason,
      }));
      toast.success(`Quotation status updated to ${newStatus}`);
      if (newStatus === "rejected") {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleAcceptQuotation = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmAccept = () => {
    handleStatusChange("accepted");
    setIsConfirmModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <UserMenu />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <UserMenu />
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
            Quotation Details
          </h2>
          <div className="flex flex-wrap gap-3">
          <div className={`${
                quotation.status === "rejected"
                  ? "bg-red-500/10 text-red-600 border border-red-500/30"
                  : quotation.status === "accepted"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
              } mt-6 px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition`}>
                {quotation.status.toUpperCase()}
              </div>
          <DownloadQuotationPDF quotation={quotation} />
          </div>
          
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
              Quotation Info
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">ID:</span>{" "}
                {quotation.quotationId}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Total Amount:</span>{" "}
                ₹{quotation.totalAmount.toLocaleString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Expire Date:</span>{" "}
                {new Date(quotation.expireDate).toLocaleDateString()}
              </p>
              {/* <div className={`${
                quotation.status === "rejected"
                  ? "text-red-600 bg-red-300 border border-red-700"
                  : quotation.status === "accepted"
                  ? "text-green-600 bg-green-300 border border-green-700"
                  : "text-yellow-600 bg-yellow-300 border border-yellow-700"
              } w-28 py-1 text-center text-sm rounded-xl`}>
                {quotation.status.toUpperCase()}
              </div> */}
              {quotation.status === "rejected" && (
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Cancel Reason:</span>{" "}
                  {quotation.cancelReason}
                </p>
              )}
            </div>
          </div>

          {/* Client Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
              Client Information
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Name:</span>{" "}
                {quotation.client.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                {quotation.client.email}
              </p>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
              Products
            </h3>
            {quotation.products.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-12 text-sm text-gray-500 px-2">
                  <span className="col-span-5">Product</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-center">Price</span>
                  <span className="col-span-3 text-right">Total</span>
                </div>
                {quotation.products.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 bg-gray-50 rounded-lg p-3 items-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="col-span-5 font-medium text-gray-800 truncate">
                      {item.product.name}
                    </span>
                    <span className="col-span-2 text-center text-blue-600">
                      {item.quantity}
                    </span>
                    <span className="col-span-2 text-center text-gray-600">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="col-span-3 text-right text-indigo-600 font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products added to this quotation.</p>
            )}
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
              Services
            </h3>
            {quotation.services.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-12 text-sm text-gray-500 px-2">
                  <span className="col-span-7">Service</span>
                  <span className="col-span-5 text-right">Price</span>
                </div>
                {quotation.services.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 bg-gray-50 rounded-lg p-3 items-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="col-span-7 font-medium text-gray-800 truncate">
                      {item.service.name}
                    </span>
                    <span className="col-span-5 text-right text-indigo-600 font-semibold">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No services added to this quotation.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {quotation.status === "pending" && (
          <div className="mt-8 flex space-x-4 justify-center">
            <button
              onClick={handleAcceptQuotation}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full
              hover:from-green-500 hover:to-green-600 transition duration-300 
              transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Accept Quotation
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full
              hover:from-red-500 hover:to-red-600 transition duration-300 
              transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Reject Quotation
            </button>
          </div>
        )}

        {/* {(quotation.status === "accepted" || quotation.status === "rejected") && (
          <div className="mt-8 flex justify-center">
            <span className={`text-xl font-semibold text-white p-3 rounded-xl ${
              quotation.status === "accepted" 
                ? "bg-green-500" 
                : "bg-red-500"
            }`}>
              Quotation {quotation.status}
            </span>
          </div>
        )} */}

        {/* Reject Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 transform transition-all">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Please provide rejection reason
              </h2>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full h-24 p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter rejection reason"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusChange("rejected")}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96 transform transition-all">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Are you sure you want to accept this quotation?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAccept}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;