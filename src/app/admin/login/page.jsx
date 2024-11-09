"use client";
import { useRouter } from 'next/navigation';
import { adminLoginVerify } from '../../api/adminApi.js';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await adminLoginVerify(loginId, password);
        if (res?.status === 200) {
            toast.success("Verified")
            // router.push('/dashboard'); // Navigate to the dashboard;
        } else {
            // Handle login failure (e.g., show an error message)
            console.log("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
                <div className="md:w-1/2 p-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Admin Account</h2>
                    
                    <form onSubmit={handleSubmit}> {/* Form submission handler */}
                        <div className="mb-4">
                            <label htmlFor="loginId" className="block text-gray-700 font-medium mb-2">Login ID</label>
                            <input
                                type="text"
                                id="loginId"
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your Login ID"
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/employeePhoto.png"
                        alt="Login illustration"
                        className="w-full h-full object-cover rounded-r-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
