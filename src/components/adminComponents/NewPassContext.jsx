"use client"
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { KeyRound, Eye, EyeOff } from 'lucide-react'
import { changeAdminPassword } from '@/api/adminApi'
import toast from 'react-hot-toast'

const NewPasswordContext = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const validatePasswords = () => {
    const newErrors = {
      newPassword: '',
      confirmPassword: ''
    };

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validatePasswords()) {
      try {
        const res = await changeAdminPassword(userId, newPassword);
        toast.success(res?.data?.message);
        router.push('/admin/login'); // Redirect to login page after successful password change
      } catch (error) {
        toast.error(error.response.message || 'Failed to change password');
        console.log(error.message)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set New Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.newPassword 
                      ? 'border-red-500 text-red-900' 
                      : 'border-gray-300 text-gray-900'
                  } placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.confirmPassword 
                    ? 'border-red-500 text-red-900' 
                    : 'border-gray-300 text-gray-900'
                } placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Confirm New Password"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordContext;