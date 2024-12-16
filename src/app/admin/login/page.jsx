"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';
import { adminLoginVerify } from "../../../api/adminApi.js";
import { adminLogin } from "@/redux/slice/AdminSlice.jsx";
import { Lock, User } from "lucide-react";


const FuturisticLoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await adminLoginVerify(loginId, password);
      if (res?.status === 200) {
        if (res.data.isVerified === false) {
          toast.error(res?.data?.message||"Please verify your account to continue.");
          router.push(`/admin/otp?userId=${res?.data?.adminData._id}`)
        }else{
          toast.success(res?.data?.message);
        Cookies.set('adminToken', res?.data?.accessToken, {
          expires: 0.5, // 12 hours
          secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
          sameSite: 'strict', // Protect against CSRF
        });
        
        dispatch(adminLogin({ token: res?.data?.accessToken, admin: res?.data?.admin }));
        router.push('/admin');
        }
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication Failed");
      console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden">
      {/* Floating Particles Effect */}


      <div 
        className="relative w-full max-w-4xl  backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="absolute inset-0 bg-purple-700 pointer-events-none"></div>
        
          {/* Login Form */}
          <div className="p-12 space-y-8 relative z-10">
            <div className="text-center">
              <h2 className="text-3xl font-extralight text-white mb-2">Admin Portal</h2>
              <p className="text-gray-400 mb-8">Secure Access Management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-500 w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                  className="w-full text-black pl-10 pr-4 py-3 bg-white border border-white/10 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-500 w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black pl-10 pr-4 py-3 bg-white border border-white/10 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
              </button>
            </form>
              <p className="text-center text-white cursor-pointer" onClick={()=>router.push('/admin/signup')}>Signup</p>
              <p className="text-center text-white cursor-pointer" onClick={()=>router.push('/admin/forgetPassword')}>Forget Password</p>
          </div>
      </div>
    </div>
  );
};

export default FuturisticLoginPage;