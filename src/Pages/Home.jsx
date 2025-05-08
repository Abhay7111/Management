import React from 'react'
import Nav from '../Components/Nav'
import Topnav from '../Components/Topnav'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-dvh flex flex-col items-center justify-center gap-1.5 p-1'>
          <Topnav/>
          <div className='w-full h-full flex items-center justify-center gap-0.5'>
          <Nav/>
          <div className='w-full h-full transition-all duration-300 rounded-md rounded-l-[0px] overflow-hidden'>
               <Outlet/>
          </div>
     </div>
    </div>
  )
}

export default Home