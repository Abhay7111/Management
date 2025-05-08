import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
     const [wid , setWed] = useState(null);
     const [widbutton, setWidbutton] = useState(null);
  return (
    <div
    onMouseEnter={() => setWidbutton(true)} onMouseLeave={() => setWidbutton(false)}
    className={`${wid ? 'w-[300px]' : 'w-[50px]'} h-full transition-all duration-700 border-r border-zinc-400 relative`}>
     <button 
     onClick={() => setWed(prev => !prev)} 
     className={`absolute top-1/2 left-full -translate-y-1/2 rounded-r py-1 ${widbutton ? 'border border-l-[0px]' : ' border-0 border-zinc-50/0'} border-zinc-500 bg-white cursor-pointer transition-all duration-500 overflow-hidden ${
       widbutton ? 'w-4' : 'w-0'
     }`}>
     {wid ? <i className="ri-arrow-drop-left-line"></i> : <i className="ri-arrow-drop-right-line"></i>}
     </button>
     <div className='w-full h-full flex flex-col items-center justify-start gap-5 px-1'>
          <div className='w-full h-10 border border-zinc-400 rounded-md px-2.5 flex items-center bg-white hover:bg-zinc-50 transition-colors duration-200 shadow-sm'>
               <select 
                    name="" 
                    id="" 
                    className='w-full bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer'
               >
                    <option value="" className='text-zinc-400'>Select an option</option>
                    <option value="value1" className='text-zinc-700'>Value 1</option>
                    <option value="value2" className='text-zinc-700'>Value 2</option>
               </select>
          </div>
          <div className='w-full h-fit flex flex-col items-start gap-1.5'>
               <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                         ` w-full flex items-center h-10 rounded-md border-zinc-400
                         ${wid ? 'px-2.5 gap-1 text-sm font-medium' : 'justify-center'}
                         ${isActive ? 'bg-zinc-300 text-zinc-800 font-semibold  border' : 'hover:bg-zinc-300/70'}`
                    }
               >
                    <i className="ri-home-5-line"></i>
                    <span className={`transition-all duration-500 overflow-hidden ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Dashboard
                    </span>
               </NavLink>
               <NavLink 
                    to="/inbox" 
                    className={({ isActive }) => 
                         ` w-full flex items-center h-10 rounded-md border-zinc-400
                         ${wid ? 'px-2.5 gap-1 text-sm font-medium' : 'justify-center'}
                         ${isActive ? 'bg-zinc-300 text-zinc-800 font-semibold  border' : 'hover:bg-zinc-300/70'}`
                    }
               >
                    <i class="ri-inbox-2-line"></i>
                    <span className={`transition-all duration-500 overflow-hidden ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Inbox
                    </span>
               </NavLink>
               <NavLink 
                    to="/teams" 
                    className={({ isActive }) => 
                         ` w-full flex items-center h-10 rounded-md border-zinc-400
                         ${wid ? 'px-2.5 gap-1 text-sm font-medium' : 'justify-center'}
                         ${isActive ? 'bg-zinc-300 text-zinc-800 font-semibold  border' : 'hover:bg-zinc-300/70'}`
                    }
               >
                    <i class="ri-team-line"></i>
                    <span className={`transition-all duration-500 overflow-hidden ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Teams
                    </span>
               </NavLink>
               <NavLink 
                    to="/assigned to me" 
                    className={({ isActive }) => 
                         ` w-full flex items-center h-10 rounded-md border-zinc-400
                         ${wid ? 'px-2.5 gap-1 text-sm font-medium' : 'justify-center'}
                         ${isActive ? 'bg-zinc-300 text-zinc-800 font-semibold  border' : 'hover:bg-zinc-300/70'}`
                    }
               >
                    <i class="ri-focus-2-line"></i>
                    <span className={`transition-all duration-500 overflow-hidden ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Assigned to me
                    </span>
               </NavLink>
               <NavLink 
                    to="/created by me" 
                    className={({ isActive }) => 
                         ` w-full flex items-center h-10 rounded-md border-zinc-400
                         ${wid ? 'px-2.5 gap-1 text-sm font-medium' : 'justify-center'}
                         ${isActive ? 'bg-zinc-300 text-zinc-800 font-semibold  border' : 'hover:bg-zinc-300/70'}`
                    }
               >
                    <i class="ri-list-indefinite"></i>
                    <span className={`transition-all duration-500 overflow-hidden ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Created by me
                    </span>
               </NavLink>
          </div>
     </div>
    </div>
  )
}

export default Nav