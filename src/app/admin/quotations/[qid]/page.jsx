"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/adminComponents/Sidebar";
import toast from "react-hot-toast";
import DownloadQuotation from "@/components/adminComponents/DownloadQuotation";
import {
  FileTextIcon,
  UserIcon,
  CalendarIcon,
  PackageIcon,
  CogIcon,
  DollarSignIcon,
} from "lucide-react";
import QuotationUploads from "@/components/adminComponents/QuotationUploads";
import { quotationDetails } from "@/api/adminApi";

const Page = ({ params }) => {
  const { qid } = React.use(params);
  const [quotation, setQuotation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    quotationDetails(qid)
      .then((res) => {
        setQuotation(res?.data?.quotation);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
        setIsLoading(false);
      });
  }, [qid]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-50 border border-yellow-500 text-yellow-600";
      case "accepted":
        return "bg-green-50 border border-green-500 text-green-600";
      case "rejected":
        return "bg-red-50 border border-red-500 text-red-600";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl text-gray-600">
            Loading Quotation...
          </div>
        </div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-red-600">
          Quotation not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <FileTextIcon className="text-indigo-600 w-10 h-10" />
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
                  Quotation #{quotation.quotationId}
                </h1>
              </div>
              <div className="flex items-center space-x-4"></div>
              <div className="flex items-center space-x-4">
                <div
                  onClick={() => window.open(quotation.proposal, "_blank")}
                  className="cursor-pointer bg-blue-500/10 text-blue-600 border border-blue-500/30  px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition"
                >
                  View Proposal
                </div>
              </div>
            </div>

            {quotation.status.toLowerCase() === "rejected" &&
              quotation.cancelReason && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-800 font-semibold mb-2 flex items-center">
                    <span className="mr-2">Rejection Reason:</span>
                  </h3>
                  <p className="text-red-600">{quotation.cancelReason}</p>
                </div>
              )}
          </div>

          {/* Client and Creator Info */}
          <div className="grid md:grid-cols-2 gap-6">

              {/* Quotation Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4 space-x-3">
                <CalendarIcon className="text-indigo-600 w-6 h-6" />
                <h2 className="text-xl font-semibold">Quotation Info</h2>
              </div>
              <div className="space-y-2">
                <p>
                  Created by: {quotation.createdBy.name} -{" "}
                  {quotation.createdBy.email}
                </p>
                <p>Created: {formatDate(quotation.createdAt)}</p>
                <p>Expires: {formatDate(quotation.expireDate)}</p>
                <p>
                  Approved:{" "}
                  {quotation.approvedOn
                    ? formatDate(quotation.approvedOn)
                    : "Not approved"}
                </p>
                <p>Total: {quotation.totalAmount?.toLocaleString()||'NA'}</p>
                <p>
                  {quotation.taxName||'NA'}: {quotation.tax?.toLocaleString()||'NA'}%
                </p>
                <p className="font-semibold">SubTotal: {quotation.subTotal?.toLocaleString()||'NA'}</p>
                <p
                  className={`${getStatusColor(
                    quotation.status
                  )} px-4 py-2 rounded-full text-sm font-medium mt-3 text-center`}
                >
                  {quotation.status.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Client Details */}
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

          {/* Products Section */}
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

          {/* Services Section */}
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

          {quotation.fileUrl && quotation.fileUrl.length > 0 && (
            <QuotationUploads files={quotation.fileUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
