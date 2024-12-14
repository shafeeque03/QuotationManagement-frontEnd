"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';
import { adminLoginVerify } from "../../../api/adminApi.js";
import { adminLogin } from "@/redux/slice/AdminSlice.jsx";
import { Lock, User } from "lucide-react";

// Pre-generate particle data to ensure consistency between server and client
const generateParticles = () => {
  return [...Array(20)].map((_, i) => ({
    size: 5 + (i % 10),
    left: (i * 5) % 100,
    top: (i * 7) % 100,
    delay: i % 5
  }));
};

const FuturisticLoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on client-side
    setParticles(generateParticles());
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await adminLoginVerify(loginId, password);
      if (res?.status === 200) {
        toast.success(res?.data?.message, {
          style: {
            background: '#333',
            color: '#fff',
          }
        });

        Cookies.set('adminToken', res?.data?.token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        dispatch(adminLogin({ token: res?.data?.token, admin: res?.data?.admin }));
        router.push('/admin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication Failed", {
        style: {
          background: '#ff4444',
          color: '#fff',
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6 overflow-hidden">
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div 
            key={i} 
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div 
        className="relative w-full max-w-4xl bg-black/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
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
                  type="text"
                  placeholder="Login ID"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
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
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
              </button>
            </form>
          </div>

          {/* Futuristic Visual */}
          <div className="hidden md:flex items-center justify-center relative overflow-hidden">
            <div className={`absolute transition-all duration-700 ease-in-out ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
              <div className="w-72 h-72 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl absolute -top-20 -right-20"></div>
              <div className="relative z-10 w-72 h-72 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticLoginPage;