"use client";
import { getAdmins } from "@/api/hosterApi";
import AdminCard from "@/hosterComponents/AdminCard";
import HosterMenu from "@/hosterComponents/HosterMenu";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2, ServerCrash, UserPlus } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsLoading(true);
        const response = await getAdmins();
        setAdmins(response?.data?.admins || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch admins:", err);
        setError(err.message || "Failed to load administrators");
        setAdmins([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-blue-500" size={48} />
          <p className="mt-4 text-gray-600">Loading administrators...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ServerCrash className="mx-auto text-red-500" size={48} />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Unable to Load Administrators
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HosterMenu />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Management
          </h1>
        </div>

        {admins.length === 0 ? (
          <div className="text-center py-16">
            <UserPlus className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-xl text-gray-600">
              No administrators found
            </p>
            <p className="text-gray-500">
              Click "Add New Admin" to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin) => (
              <AdminCard
                key={admin.id || admin._id}
                value={admin}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
