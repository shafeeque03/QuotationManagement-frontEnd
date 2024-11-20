"use client";
import { userLogout } from "@/redux/slice/UserSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import Link from "next/link";
export const UserMenu = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove('userToken');
    dispatch(userLogout());
    router.push('/login')
  }
  const state = useSelector((state) => state);
const user = state?.user?.user

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          Quotation Management
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 text-3xl md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li className="group">
            <Link
              href={{pathname:"/"}}
              className="text-gray-700 text-lg font-medium transition-colors duration-300 hover:text-indigo-600"
            >
              Quotations
            </Link>
          </li>
          <li className="group">
            <Link
              href={{pathname:'/proandser'}}
              className="text-gray-700 text-lg font-medium transition-colors duration-300 hover:text-indigo-600"
            >
              Products/Services
            </Link>
          </li>
        </ul>

        {/* Profile Button with Submenu */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {/* Submenu */}
          <div
            className={`absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-48 transition-all duration-300 ease-in-out transform ${
              isProfileMenuOpen
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-5 opacity-0 scale-95"
            }`}
          >

              <p className="block px-4 py-2 text-gray-700 text-sm hover:bg-indigo-100">User: {user?.name || "Guest"}</p>
           
            <p
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-indigo-100"
              onClick={handleLogout}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col items-start space-y-4 bg-gray-100 py-4 px-6 md:hidden">
          <li>
            <a
              href="#"
              className="text-gray-700 text-lg font-medium transition-colors duration-300 hover:text-indigo-600"
            >
              Quotations
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 text-lg font-medium transition-colors duration-300 hover:text-indigo-600"
            >
              Products/Services
            </a>
          </li>
          <li>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="text-gray-700 text-lg font-medium transition-colors duration-300 hover:text-indigo-600"
            >
              Profile
            </button>
            {/* Mobile Submenu */}
            {isProfileMenuOpen && (
              <ul className="mt-2 pl-4">
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 text-sm py-2 hover:text-indigo-600"
                  >
                    User Name
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 text-sm py-2 hover:text-indigo-600"
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};
