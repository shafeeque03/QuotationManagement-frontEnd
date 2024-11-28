"use client";
import React, { useEffect, useState } from "react";
import { quotationDetails } from "@/api/userApi";
import Sidebar from "@/adminComponents/Sidebar";
import toast from "react-hot-toast";
import DownloadQuotation from "@/adminComponents/DownloadQuotation";
import { 
  FileTextIcon, 
  UserIcon, 
  CalendarIcon, 
  PackageIcon, 
  CogIcon, 
  DollarSignIcon 
} from "lucide-react";

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
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
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
              <div className="flex items-center space-x-4">
                <span
                  className={`${getStatusColor(
                    quotation.status
                  )} text-white px-4 py-2 rounded-full text-sm font-medium`}
                >
                  {quotation.status.toUpperCase()}
                </span>
                <DownloadQuotation quotation={quotation} />
              </div>
            </div>

            {quotation.status.toLowerCase() === "rejected" && quotation.cancelReason && (
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
            {/* Client Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4 space-x-3">
                <UserIcon className="text-indigo-600 w-6 h-6" />
                <h2 className="text-xl font-semibold">Client Details</h2>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-lg">{quotation.client.name}</p>
                <p className="text-gray-600">{quotation.client.email}</p>
              </div>
            </div>

            {/* Quotation Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4 space-x-3">
                <CalendarIcon className="text-indigo-600 w-6 h-6" />
                <h2 className="text-xl font-semibold">Quotation Info</h2>
              </div>
              <div className="space-y-2">
                <p>
                  Created by: {quotation.createdBy.name} - {quotation.createdBy.email}
                </p>
                <p>Created: {formatDate(quotation.createdAt)}</p>
                <p>Expires: {formatDate(quotation.expireDate)}</p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          {quotation.products.length>0&&<div className="bg-white rounded-xl shadow-md">
            <div className="border-b p-6 flex items-center space-x-3">
              <PackageIcon className="text-indigo-600 w-6 h-6" />
              <h2 className="text-xl font-semibold">Products</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-4 gap-4 pb-4 border-b font-semibold text-gray-600">
                  <div>Product</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Price</div>
                  <div className="text-right">Total</div>
                </div>
                <div className="divide-y">
                  {quotation.products.map((item) => (
                    <div key={item._id} className="grid grid-cols-4 gap-4 py-4 items-center">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">{item.quantity}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          }

          {/* Services Section */}
          {quotation.services.length>0&&<div className="bg-white rounded-xl shadow-md">
            <div className="border-b p-6 flex items-center space-x-3">
              <CogIcon className="text-indigo-600 w-6 h-6" />
              <h2 className="text-xl font-semibold">Services</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b font-semibold text-gray-600">
                  <div>Service</div>
                  <div className="text-right">Price</div>
                </div>
                <div className="divide-y">
                  {quotation.services.map((item) => (
                    <div key={item._id} className="grid grid-cols-2 gap-4 py-4 items-center">
                      <div>
                        <p className="font-medium">{item.service.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          }

          {/* Total Amount */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DollarSignIcon className="text-green-600 w-6 h-6" />
                <span className="text-xl font-semibold">Total Amount</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                ${quotation.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;