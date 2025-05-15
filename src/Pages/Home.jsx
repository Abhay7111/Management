import React from 'react'
import Nav from '../Components/Nav'
import Topnav from '../Components/Topnav'
import { Outlet } from 'react-router-dom'
import { Blog } from '../Data/Blog';
import StartLoading from '../Components/StartLoading';

function Home() {
  const { Loading, Error } = Blog();
    
    if (Loading) {return <div className='w-[100vw] h-[100vh] p-2 flex items-center justify-center'><StartLoading/></div>;}
    if (Error) {return <div className='w-[100vw] h-[100vh] p-2 flex items-center justify-center'>Error: {Error.message}</div>;}
  return (
    <div className='w-full h-dvh flex flex-col items-center justify-center gap-1.5 p-1'>
          <Topnav/>
          <div className='w-full h-full flex items-center justify-center gap-0.5'>
          <Nav/>
          <div className='w-full h-full bg-white p-2 transition-all duration-300 rounded-xl overflow-hidden'>
               <Outlet/>
          </div>
     </div>
    </div>
  )
}

export default Home