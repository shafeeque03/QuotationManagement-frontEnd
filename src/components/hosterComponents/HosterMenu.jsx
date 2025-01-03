"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, LogOut, Home, Package, PlusIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { hosterLogout } from "@/redux/slice/HosterSlice";

export const HosterMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const state = useSelector((state) => state);
  const hoster = state?.hoster?.hoster;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('hosterToken');
    dispatch(hosterLogout());
    router.push('/hoster/login');
  };

  const NavLink = ({ href, children, className = "" }) => (
    <Link 
      href={href} 
      className={`
        flex items-center gap-2 
        px-3 py-2 
        rounded-lg 
        transition-all duration-300 
        ${pathname === href 
          ? 'bg-indigo-100 text-indigo-600' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}
      `}
    >
      {children}
    </Link>
  );

  if (!isClient || !hoster) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              QMS Developer Management
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink href="/hoster">
              <Home size={20} />
              Home
            </NavLink>
            <NavLink href="/hoster/add-admin">
              <PlusIcon size={20} />
              Add-Admin
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center text-gray-500 hover:text-indigo-600"
              >
                <User size={24} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink href="/hoster">
                <Home size={20} />
                Home
              </NavLink>
              <NavLink href="/hoster/add-admin">
                <PlusIcon size={20} />
                Products/Services
              </NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base text-gray-500 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HosterMenu;