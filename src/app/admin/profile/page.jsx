import Sidebar from '@/adminComponents/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar/>
        <div className='m-auto text-center'>Profile page</div>
    </div>
  )
}

export default page