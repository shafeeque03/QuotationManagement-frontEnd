import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu for small screens */}
      <div className="text-start md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed min-h-screen top-0 left-0 z-40 w-64 h-screen p-6 overflow-y-auto bg-gray-200 text-gray-700 shadow-lg transition-transform ${
          isOpen ? "block" : "hidden md:block"
        } md:w-64 md:h-auto md:relative`}
      >
        {/* Close button for small screens */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none dark:focus:ring-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h5 className="text-2xl font-bold uppercase tracking-wide mb-4 text-center">QMS</h5>

        {/* Dashboard Link */}
        <Link href="/admin/dashboard">
          <div className={`py-3 ${pathname=='/admin/dashboard'?'text-white':'text-gray-700'}`}>
            <ul className="space-y-3">
              <li>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === "/admin/dashboard"
                      ? "bg-red-700 shadow-lg"
                      : "hover:bg-red-600 hover:text-white hover:shadow-md transition-all"
                  }`}
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="font-medium text-lg">Dashboard</span>
                </div>
              </li>
            </ul>
          </div>
        </Link>

        {/* Users Link */}
        <Link href="/admin/users">
        <div className={`py-3 ${pathname=='/admin/users'?'text-white':'text-gray-700'}`}>
            <ul className="space-y-3">
              <li>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === "/admin/users"
                      ? "bg-red-700 shadow-lg"
                      : "hover:bg-red-600 hover:text-white hover:shadow-md transition-all"
                  }`}
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span className="font-medium text-lg">Users</span>
                </div>
              </li>
            </ul>
          </div>
        </Link>

        {/* Quotations Link */}
        <Link href="/admin/quotations">
        <div className={`py-3 ${pathname=='/admin/quotations'?'text-white':'text-gray-700'}`}>
            <ul className="space-y-3">
              <li>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === "/admin/quotations"
                      ? "bg-red-700 shadow-lg"
                      : "hover:bg-red-600 hover:text-white hover:shadow-md transition-all"
                  }`}
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.7 0 6 2.7 6 6v5.3l-2.5 2.5c-.8.8-.8 2.1 0 2.9s2.1.8 2.9 0L10 16.9V18c0 2.7 2.2 5 5 5s5-2.3 5-5V6c0-3.3-2.7-6-6-6z"/>
                  </svg>
                  <span className="font-medium text-lg">Quotations</span>
                </div>
              </li>
            </ul>
          </div>
        </Link>

        {/* Clients Link */}
        <Link href="/admin/clients">
        <div className={`py-3 ${pathname=='/admin/clients'?'text-white':'text-gray-700'}`}>
            <ul className="space-y-3">
              <li>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === "/admin/clients"
                      ? "bg-red-700 shadow-lg"
                      : "hover:bg-red-600 hover:text-white hover:shadow-md transition-all"
                  }`}
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 5-2.3 5-5S14.7 2 12 2s-5 2.3-5 5 2.3 5 5 5zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/>
                  </svg>
                  <span className="font-medium text-lg">Clients</span>
                </div>
              </li>
            </ul>
          </div>
        </Link>


        <Link href="/admin/proandser">
        <div className={`py-3 ${pathname=='/admin/proandser'?'text-white':'text-gray-700'}`}>
            <ul className="space-y-3">
              <li>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    pathname === "/admin/proandser"
                      ? "bg-red-700 shadow-lg"
                      : "hover:bg-red-600 hover:text-white hover:shadow-md transition-all"
                  }`}
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 5-2.3 5-5S14.7 2 12 2s-5 2.3-5 5 2.3 5 5 5zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/>
                  </svg>
                  <span className="font-medium text-lg">Pro/Ser</span>
                </div>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
