// import React from 'react'
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
//   PieChart, Pie, Cell, 
//   LineChart, Line, ResponsiveContainer 
// } from 'recharts'
// import { 
//   CreditCard, 
//   TrendingUp, 
//   Package, 
//   ShoppingCart, 
//   FileText, 
//   Check, 
//   X 
// } from 'lucide-react'
// import Sidebar from '@/adminComponents/Sidebar'

// // Dummy Data
// const revenueByProduct = [
//   { name: 'Laptop', revenue: 45000 },
//   { name: 'Smartphone', revenue: 62000 },
//   { name: 'Tablet', revenue: 28000 },
//   { name: 'Accessories', revenue: 15000 }
// ]

// const revenueByService = [
//   { name: 'Repair', revenue: 22000 },
//   { name: 'Consultation', revenue: 35000 },
//   { name: 'Training', revenue: 18000 },
//   { name: 'Support', revenue: 40000 }
// ]

// const dailyRevenue = [
//   { date: 'Jan 1', revenue: 5500 },
//   { date: 'Jan 2', revenue: 6200 },
//   { date: 'Jan 3', revenue: 4800 },
//   { date: 'Jan 4', revenue: 7100 },
//   { date: 'Jan 5', revenue: 6500 }
// ]

// const quotationData = {
//   total: 150,
//   approved: 105,
//   rejected: 45
// }

// const QuotationCard = () => {
//   const approvalPercentage = (quotationData.approved / quotationData.total * 100).toFixed(2)

//   return (

//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xl font-semibold text-gray-800">Quotations Overview</h3>
//         <FileText className="text-blue-500" />
//       </div>
//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-gray-500">Total</p>
//           <p className="text-2xl font-bold text-gray-800">{quotationData.total}</p>
//         </div>
//         <div>
//           <p className="text-green-500">Approved</p>
//           <p className="text-2xl font-bold text-green-700">{quotationData.approved}</p>
//         </div>
//         <div>
//           <p className="text-red-500">Rejected</p>
//           <p className="text-2xl font-bold text-red-700">{quotationData.rejected}</p>
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div 
//             className="bg-green-500 h-2.5 rounded-full" 
//             style={{width: `${approvalPercentage}%`}}
//           ></div>
//         </div>
//         <p className="text-center mt-2 text-gray-600">
//           {approvalPercentage}% Approval Rate
//         </p>
//       </div>
//     </div>
//   )
// }

// const RevenueCard = () => {
//   const totalRevenue = revenueByProduct.reduce((sum, item) => sum + item.revenue, 0) +
//                        revenueByService.reduce((sum, item) => sum + item.revenue, 0)

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xl font-semibold text-gray-800">Total Revenue</h3>
//         <CreditCard className="text-green-500" />
//       </div>
//       <p className="text-3xl font-bold text-green-700">
//         ${totalRevenue.toLocaleString()}
//       </p>
//       <p className="text-gray-500 mt-2">Across Products and Services</p>
//     </div>
//   )
// }

// const page = () => {
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
//         <Sidebar/>
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
//       <div className="w-full p-8">
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">Business Dashboard</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <RevenueCard />
//           <QuotationCard />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Product Revenue Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//               <Package className="mr-2 text-blue-500" />
//               <h3 className="text-xl font-semibold text-gray-800">Revenue by Products</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={revenueByProduct}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="revenue"
//                 >
//                   {revenueByProduct.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Service Revenue Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//               <ShoppingCart className="mr-2 text-green-500" />
//               <h3 className="text-xl font-semibold text-gray-800">Revenue by Services</h3>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={revenueByService}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="revenue" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Daily Revenue Line Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//           <div className="flex items-center mb-4">
//             <TrendingUp className="mr-2 text-purple-500" />
//             <h3 className="text-xl font-semibold text-gray-800">Daily Revenue Trend</h3>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={dailyRevenue}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default page