"use client"
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { hosterEmailVerify, hosterOtpVerify, resendOtp } from '@/api/hosterApi';
import Cookies from 'js-cookie';
import { hosterLogin } from '@/redux/slice/HosterSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Page = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await resendOtp(email);
      if (res.status === 200) {
        toast.success('OTP resent successfully!');
        setTimer(30);
        setCanResend(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await hosterEmailVerify(email);
      if (res.status === 200) {
        setStep(2);
        setTimer(30);
        setCanResend(false);
        toast.success('OTP sent to your email!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occured');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpString = otp.join('');
    
    try {
      const res = await hosterOtpVerify(otpString);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        Cookies.set('hosterToken', res?.data?.token, {
          expires: 0.5,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        dispatch(hosterLogin({ token: res?.data?.token, hoster: res?.data?.hoster }));
        router.push('/hoster');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error Occured');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-blue-100">Login to access your dashboard</p>
            </div>
          </div>

          <div className="p-8">
            <div className="relative">
              <div className={`transform transition-all duration-500 ${step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'}`}>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="Enter your email"
                      />
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className={`transform transition-all duration-500 ${step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Enter OTP</label>
                    <p className="text-sm text-gray-500">We've sent a code to {email}</p>
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          name={`otp-${index}`}
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-14 h-14 text-center text-xl font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.some(digit => !digit)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Verify OTP'
                    )}
                  </button>

                  <div className="flex flex-col items-center space-y-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-gray-600 text-sm hover:text-gray-800 transition duration-200"
                    >
                      Change email address
                    </button>
                    
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-blue-600 text-sm hover:text-blue-800 transition duration-200"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Resend OTP in {timer}s
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;