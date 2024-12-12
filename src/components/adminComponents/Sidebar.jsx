"use client"
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Building2, 
  Package, 
  ChevronLeft,
  Menu,
  Boxes,
  LogOut,
  Settings,
  FilePen,
  UserPen
  
} from "lucide-react";
import Cookies from 'js-cookie';
import { adminLogout } from "@/redux/slice/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
// Import other dependencies...

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Hydration flag
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;


  useEffect(() => {
    // Mark as hydrated after mounting
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('adminToken');
    dispatch(adminLogout());
    router.push('/admin/login');
  };

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/quotations", icon: FileText, label: "Quotations" },
    { path: "/admin/clients", icon: Building2, label: "Clients" },
    { path: "/admin/products", icon: Package, label: "Product" },
    { path: "/admin/services", icon: Settings, label: "Service" },
    { path: "/admin/report", icon: FilePen, label: "Report" },
    { path: "/admin/profile", icon: UserPen, label: "Profile" },
  ];

  return (
    <div>
      {/* Mobile Menu Trigger */}
      <div className="text-start md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed min-h-screen top-0 left-0 z-50 w-72 h-screen overflow-y-auto 
        bg-gradient-to-b from-gray-50 to-white border-r border-gray-100
        shadow-xl transition-all duration-300 ease-in-out transform
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:relative md:w-72 md:shadow-none`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Boxes className="w-8 h-8 text-indigo-600" />
            {/* Render admin.name only after hydration */}
            <h5 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              {isHydrated ? admin?.name || "Admin" : "Loading..."}
            </h5>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-6 flex flex-col h-[calc(100vh-120px)]">
          <div className="space-y-2 flex-grow">
            {menuItems.map((item) => {
              const basePath = pathname.split("?")[0];
              let isActive = basePath === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                      transition-all duration-200 group relative
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200"
                          : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 text-gray-600"
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ? "text-white" : "group-hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="absolute right-4 w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-auto px-2 pb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
              text-gray-600 hover:bg-red-50 hover:text-red-600 
              transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              <span className="font-medium group-hover:text-red-600">
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
