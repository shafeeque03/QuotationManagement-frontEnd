"use client";
import React, { useEffect, useState } from "react";
import { UserMenu } from "../../components/userComponents/UserMenu";
import { useRouter, useSearchParams } from "next/navigation";
import { quotationDetails, quotationStatusChange } from "../../api/userApi";
import toast from "react-hot-toast";
import QuotationFiles from "@/components/userComponents/QuotationFiles";
import Link from "next/link";

const QuotationDetailsContent = () => {
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const params = useSearchParams();
  const qid = params.get("qid");
  

  const router = useRouter();

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
        cancelReason:
          newStatus === "rejected" ? rejectReason : prev.cancelReason,
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
  const handleViewQuotation = (id) => {
    router.push(`/quotation-details/${id}`);
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
            <div
              onClick={() => window.open(quotation.proposal, "_blank")}
              className="cursor-pointer bg-blue-500/10 text-blue-600 border border-blue-500/30 mt-6 px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition"
            >
              View Proposal
            </div>
            {quotation.status == "pending" && (
              <div
                onClick={() => handleViewQuotation(quotation._id)}
                className="cursor-pointer bg-orange-500/10 text-orange-600 border border-orange-500/30 mt-6 px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition"
              >
                Update Quotation
              </div>
            )}
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
                <span className="font-medium text-gray-900">Expire Date:</span>{" "}
                {new Date(quotation.expireDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Total Amount:</span>{" "}
                {quotation.totalAmount?.toFixed(2) || "NA"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">
                  {quotation.taxName}:
                </span>{" "}
                {quotation.tax?.toFixed(2) || "NA"}%
              </p>
              <p className="text-gray-700 font-semibold">
                <span className="font-medium text-gray-900 ">SubTotal:</span>{" "}
                {quotation.subTotal?.toFixed(2) || "NA"}
              </p>

              {quotation.status === "rejected" && (
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">
                    Cancel Reason:
                  </span>{" "}
                  {quotation.cancelReason}
                </p>
              )}
              <div
                className={`${
                  quotation.status === "rejected"
                    ? "bg-red-500/10 text-red-600 border border-red-500/30"
                    : quotation.status === "accepted"
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                } mt-6 px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition text-center`}
              >
                {quotation.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Client Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
              Client Information
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Client Details
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {quotation.client.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {quotation.client.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  {quotation.client.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Address:</span>{" "}
                  {quotation.client.address}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Quotation From
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {quotation.from.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {quotation.from.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  {quotation.from.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Address:</span>{" "}
                  {quotation.from.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 my-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
            Products
          </h3>
          {quotation.products.length > 0 ? (
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-4 text-left">Product Name</th>
                      <th className="py-3 px-4 text-center">Description</th>
                      <th className="py-3 px-4 text-center">Price</th>
                      <th className="py-3 px-4 text-center">Quantity</th>
                      <th className="py-3 px-4 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {quotation.products.map((product, index) => (
                      <tr
                        key={product._id || index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 text-left">
                          <span className="font-medium">{product.name}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <p className="text-gray-500">
                            {product.description || "No description"}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {product.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {product.quantity}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold">
                          {(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              No products added to this quotation.
            </p>
          )}
        </div>

        {/* Services Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
            Services
          </h3>
          {quotation.services.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Selected Services</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-4 text-left">Service Name</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {quotation.services.map((service, index) => (
                      <tr
                        key={service._id || index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 text-left">
                          <span className="font-medium">{service.name}</span>
                        </td>
                        <td className="py-3 px-4 text-left">
                          <p className="text-gray-500">
                            {service.description || "No description"}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          {service.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              No services added to this quotation.
            </p>
          )}
        </div>
        {/* Files Card */}
        {quotation.fileUrl && quotation.fileUrl.length > 0 && (
          <QuotationFiles files={quotation.fileUrl} />
        )}

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

export default QuotationDetailsContent;
