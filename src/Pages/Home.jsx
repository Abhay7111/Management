import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Topnav from '../Components/Topnav'
import { Outlet } from 'react-router-dom'
import { Blog } from '../Data/Blog';
import StartLoading from '../Components/StartLoading';
import Backendmessage from '../Components/Backendmessage';

function Home() {
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);
  const { Loading, Error } = Blog();

  useEffect(() => {
    if (Loading) {
      const timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 35000); // Reduced to 35 seconds for faster feedback
      
      return () => clearTimeout(timer);
    }
  }, [Loading]);

  if (Loading) {
    return (
      <div className='w-[100vw] h-[100vh] p-2 flex items-center justify-center'>
        {showLongLoadingMessage ? (
          <Backendmessage/>
        ) : (
          <StartLoading/>
        )}
      </div>
    );
  }

  if (Error) {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='w-80 bg-gradient-to-bl from-yellow-300/30 to-red-300/40 overflow-hidden relative border border-zinc-400/50 opacity-95 h-40 rounded-2xl p-2 flex flex-col items-center space-y-4 shadow-lg backdrop-blur-sm'>
        <div className='w-[400px] h-[400px] bg-red-400/80 p-3 absolute bottom-16 -left-[12%] rounded-full z-0 flex items-center justify-end flex-col'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-800 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>
        <p className='text-[0.92rem] text-center font-medium text-zinc-700 leading-relaxed mt-20 relative'>
          {Error.message} <br /> check your network
        </p>
      </div>
    </div>;
  }

  return (
    <div className='w-full h-dvh flex flex-col items-center justify-center gap-1.5 p-1'>
      <Topnav/>
      <div className='w-full h-full flex items-center justify-center gap-0.5'>
        <Nav/>
        <div className='w-full h-[93vh] bg-white p-2 transition-all duration-300 rounded-xl overflow-hidden'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Home