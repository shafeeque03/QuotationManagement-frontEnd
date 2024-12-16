"use client"
import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Users } from 'lucide-react';
import { hosterLoginVerify } from '@/api/hosterApi';
import Cookies from 'js-cookie';
import { hosterLogin } from '@/redux/slice/HosterSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin =async (e) => {
    e.preventDefault();
    try {
      const res = await hosterLoginVerify(email,password);
      if (res.status === 200) {
        toast.success(res?.data?.message);
  
        // Store token in cookies
        Cookies.set('hosterToken', res?.data?.token, {
          expires: 0.5, // 12h
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'strict', // Protect against CSRF
        });
  
        // Dispatch user login details
        dispatch(hosterLogin({ token: res?.data?.token, hoster: res?.data?.hoster }));
  
        // Redirect user to home
        router.push('/hoster');
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || 'ID or Password incorrect');      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <Users className="h-16 w-16 text-blue-600" />
        </div>
        
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Hoster Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <Lock className="h-5 w-5 text-blue-600 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Lock className="h-5 w-5 mr-2" />
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Page;