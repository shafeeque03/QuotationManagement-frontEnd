"use client"
import { forgetPassword } from '@/api/adminApi'
import React, { useState } from 'react'
import { Mail, KeyRound } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
        toast.error('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await forgetPassword(email);
      if(response.status==200){
          toast.success(response.data?.message);
          setEmail('');
          router.push(`/admin/fotp?userId=${response?.data?.admin?._id}`)

      }
    } catch (error) {
      // Handle potential API errors
      toast.error(error.response?.data?.message || 'Failed to send OTP');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <div className='flex justify-center mb-6'>
          <KeyRound className='text-blue-600 w-12 h-12' />
        </div>
        
        <h3 className='text-center text-black text-2xl mb-2'>QMS</h3>
        <h4 className='text-center text-gray-600 text-xl mb-6'>Forget Password</h4>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 
                       disabled:bg-blue-300 disabled:cursor-not-allowed flex justify-center items-center'
          >
            {isLoading ? (
              <svg className='animate-spin h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Send OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;