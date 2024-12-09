"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, LogOut, Home, Package, Settings,LayoutDashboard } from 'lucide-react';
import Cookies from 'js-cookie';
import { userLogout } from "@/redux/slice/UserSlice";

export const UserMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const state = useSelector((state) => state);
  const user = state?.user?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('userToken');
    dispatch(userLogout());
    router.push('/login');
  };


  const searchParams = useSearchParams();

  const currentPath = pathname + (searchParams.toString() ? `?${searchParams}` : "");
  
  const NavLink = ({ href, children, className = "" }) => (
    <Link 
      href={href} 
      className={`
        flex items-center gap-2 
        px-3 py-2 
        rounded-lg 
        transition-all duration-300 
        ${currentPath === href 
          ? 'bg-indigo-100 text-indigo-600' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}
      `}
    >
      {children}
    </Link>
  );

  if (!isClient || !user) {
    return null; // Prevent rendering during SSR or if user is not available
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              QMS
            </div>
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
            <NavLink href="/">
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            <NavLink href="/quotations?page=1">
              <Home size={20} />
              Quotations
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
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {user.name}
                  </div>
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
            <NavLink href="/">
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
              <NavLink href="/">
                <Home size={20} />
                Quotations
              </NavLink>
              
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div>
                  <div className="font-medium text-base text-gray-800">{user.name}</div>
                </div>
              </div>
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

export default UserMenu;
