"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyOtp, resendOtp } from '@/api/adminApi';
import toast from 'react-hot-toast';

const FotpContext = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // New state for resend cooldown
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Create a timer to decrement cooldown
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }

    // Cleanup the interval when component unmounts or cooldown reaches 0
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      toast.error('Please enter the complete OTP');
      return;
    }

    // Reset error and set loading state
    setError('');
    setIsLoading(true);

    try {
      const response = await verifyOtp( 
        userId, otpString
      );

      if (response.status === 200) {
        // Successful verification, route to admin login
        toast.success(response.data.message);
        router.push(`/admin/newPassword?userId=${userId}`);
      } else {
        // Handle other status codes
        setError(response.data.message || 'OTP verification failed');
      }
    } catch (err) {
      // Handle network or other errors
      const errorMessage = err.response?.data?.message || 'An error occurred during verification';
      toast.error(errorMessage);
      setError(errorMessage);
      console.log('OTP Verification Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // Check if cooldown is active
    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown} seconds before requesting a new OTP`);
      return;
    }

    try {
      const res = await resendOtp(userId);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        // Set 60-second cooldown
        setResendCooldown(60);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      setError(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">OTP Verification</h2>
          <p className="text-gray-500">Enter the 4-digit code sent to your mobile</p>
        </div>

        {userId && (
          <div className="text-center text-sm text-gray-600 mb-4">
            User ID: <span className="font-semibold">{userId}</span>
          </div>
        )}

        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-16 h-16 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              disabled={isLoading}
            />
          ))}
        </div>

        {error && (
          <div className="text-center text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          onClick={handleVerifyOtp}
          disabled={isLoading}
          className={`w-full text-white py-3 rounded-lg transition-colors ${
            isLoading 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="text-center text-sm text-gray-500">
          Didnt receive the code? 
          <p 
            className={`inline-block ml-2 ${
              resendCooldown > 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-500 hover:underline cursor-pointer'
            }`} 
            onClick={handleResendOtp}
          >
            {resendCooldown > 0 
              ? `Resend in ${resendCooldown}s` 
              : 'Resend'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FotpContext;