"use client"
import React from 'react'
import Sidebar from '../../adminComponents/Sidebar'
const page = () => {
  return (
    <div className='md:flex lg:flex xl:flex 2xl:flex'>
        <Sidebar/>
        <div>clientPage</div>
    </div>
  )
}

export default page