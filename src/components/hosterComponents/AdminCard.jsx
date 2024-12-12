"use client";
import React from "react";
import { Phone, Mail, MoreHorizontal, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminCard = ({ value }) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10 p-6 md:p-8 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1 animate-pulse-soft">
                <UserRoundCog
                  className="text-white bg-blue-600/80 rounded-full p-3 backdrop-blur-sm"
                  size={64}
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                {value?.name || 'Admin Name'}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Systems Administrator
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/70 rounded-xl p-4 flex items-center space-x-4 hover:bg-blue-50/50 transition-all duration-300">
              <Mail className="text-blue-500 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-base text-gray-800 font-semibold truncate">
                  {value?.email || 'email@example.com'}
                </p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/70 rounded-xl p-4 flex items-center space-x-4 hover:bg-blue-50/50 transition-all duration-300">
              <Phone className="text-green-500 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="text-base text-gray-800 font-semibold">
                  {value?.phone || 'Not Available'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 
            hover:from-blue-700 hover:to-purple-800 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-300 ease-in-out
            transform hover:-translate-y-0.5 active:translate-y-0.5"
            onClick={() => router.push(`/hoster/${value._id}`)}
            >
            <MoreHorizontal 
              className="transition-transform duration-300 group-hover:rotate-90" 
              size={24}
            />
            <span>View Full Profiles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;