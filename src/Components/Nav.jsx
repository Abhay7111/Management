import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Project from './Project';
import Favoritesdv from './Favoritesdv';
import Profile from './Profile';
import { Blog } from '../Data/Blog';

function Nav() {
     const {BlogData, Loading, Error} = Blog();
     const [wid , setWed] = useState(null);
     const [widbutton, setWidbutton] = useState(null);
     const [Favorites, setFavorites] = useState(null);
     const [Projects, setProjects] = useState(null);
     const [settings, setSettings] = useState(null);
     const [Help, setHelp] = useState(null);
  return (
    <div
    onMouseEnter={() => setWidbutton(true)} onMouseLeave={() => setWidbutton(false)}
    className={`${wid ? 'w-[300px]' : 'w-[57px]'} h-full transition-all duration-700 relative`}>
     <button 
     onClick={() => setWed(prev => !prev)} 
     className={`absolute top-1/2 left-full rounded-r-2xl -translate-y-1/2 py-1 border-zinc-500 bg-zinc-300 cursor-pointer transition-all duration-500 overflow-hidden ${
       widbutton ? 'w-[18px]' : 'w-0'
     }`}>
     {wid ? <i className="ri-arrow-left-s-fill"></i> : <i className="ri-arrow-right-s-fill"></i>}
     </button>
     <div className='w-full h-full flex flex-col items-center justify-start gap-5 px-2'>
          <div className='w-full h-10 border border-zinc-400 rounded-md px-2.5 flex items-center bg-zinc-300 hover:bg-zinc-50 transition-colors duration-200 shadow-sm'>
               <select 
                    name="" 
                    id="" 
                    className='w-full h-10    bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer'
               >
                    <option value="" className='text-zinc-400'>Select your projects</option>
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
                    <span className={`transition-all duration-500 overflow-hidden line-clamp-1 ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
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
                    <span className={`transition-all duration-500 overflow-hidden line-clamp-1 ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
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
                    <span className={`transition-all duration-500 overflow-hidden line-clamp-1 ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
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
                    <span className={`transition-all duration-500 overflow-hidden line-clamp-1 ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
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
                    <span className={`transition-all duration-500 overflow-hidden line-clamp-1 ${wid ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}>
                         Created by me
                    </span>
               </NavLink>
          </div>
          <div className='w-full h-full flex flex-col items-center justify-start gap-1'>
               <div className='w-full flex flex-col gap-1.5'>
                    <div className={`w-full min-h-10 rounded-md bg-zinc-300 ${wid ? '' : '  border-zinc-400'} border-[1px] hover:bg-zinc-300/70 border-transparent transition-all duration-700 flex flex-col items-center justify-center`}>
                         <div className={`w-full h-10 flex items-center ${wid ? 'justify-between px-1' : 'justify-center'}`}>
                              <span onClick={()=>{setFavorites(prev => !prev); setProjects(false)}} className={`${wid ? '' : 'w-full'} flex items-center h-full justify-center text-sm cursor-pointer`}>
                                   <i className={`ri-triangle-fill ${Favorites ? 'rotate-180' : 'rotate-0'} transition-all duration-500 text-sm`}></i>
                                   <p className={`${wid ? 'w-32 opacity-100 ml-2' : 'w-0 opacity-0'} overflow-hidden transition-all duration-500 line-clamp-1`}>Favorites</p>
                              </span>
                              { wid && <div className='flex items-center gap-2'>
                                   <span className='relative rotate-90'>
                                        <i class="ri-more-2-line font-bold text-md opacity-75 cursor-pointer"></i>
                                   </span>
                                   <span className='relative rotate-90'>
                                        <i class="ri-add-line font-semibold text-lg opacity-75 cursor-pointer"></i>
                                   </span>
                              </div>}
                         </div>
                    </div>
                    <div className={` ${Favorites ? 'h-52  border-zinc-400 border ' : 'h-0'} ${wid ? 'items-start px-1.5' : 'items-center'} overflow-hidden w-full transition-all duration-500 bg-zinc-300 rounded-md border-transparent flex flex-col`}>
                         <Favoritesdv/>
                    </div>
               </div>
               <div className='w-full flex flex-col gap-1.5'>
                    <div className={`w-full min-h-10 rounded-md bg-zinc-300 ${wid ? '' : '  border-zinc-400'} border-[1px] hover:bg-zinc-300/70 border-transparent transition-all duration-700 flex flex-col items-center justify-center`}>
                         <div className={`w-full h-10 flex items-center ${wid ? 'justify-between px-1' : 'justify-center'}`}>
                              <span onClick={()=>{setProjects(prev => !prev); setFavorites(false)}} className={`${wid ? '' : 'w-full'} flex items-center h-full justify-center text-sm cursor-pointer`}>
                                   <i className={`ri-triangle-fill ${Projects ? 'rotate-180' : 'rotate-0'} transition-all duration-500 text-sm`}></i>
                                   <p className={`${wid ? 'w-32 opacity-100 ml-2' : 'w-0 opacity-0'} overflow-hidden transition-all duration-500 line-clamp-1`}>Projects</p>
                              </span>
                              { wid && <div className='flex items-center gap-2'>
                                   <span className='relative rotate-90'>
                                        <i class="ri-more-2-line font-bold text-md opacity-75 cursor-pointer"></i>
                                   </span>
                                   <span className='relative rotate-90'>
                                        <i class="ri-add-line font-semibold text-lg opacity-75 cursor-pointer"></i>
                                   </span>
                              </div>}
                         </div>
                    </div>
                    <div className={` ${Projects ? 'h-52  border-zinc-400 border ' : 'h-0'} ${wid ? 'items-start px-1.5' : 'items-center'} overflow-hidden w-full transition-all duration-500 bg-zinc-300 rounded-md border-transparent flex flex-col`}>
                         <Project/>
                    </div>
               </div>
          </div>
          <div className='w-full '>
               <div className={`relative flex items-center ${wid ? 'px-2' : ' justify-center'} w-full`}>
                    <div onClick={()=> {setSettings(prev => !prev); setHelp(false)}} className={` ${settings ? 'opacity-100 font-medium scale-105' : ''} opacity-65 hover:opacity-100 cursor-pointer flex items-center text-sm gap-1`}>
                         <i className="ri-settings-4-line text-[20px]"></i> {wid && <p>Setting</p>}
                    </div>
                    {settings && <div className='w-60 h-40 border border-zinc-400/80 bg-zinc-300 absolute rounded-md bottom-0 left-full p-1'>
                         Setting
                    </div>}
               </div>
               <div className={`relative flex items-center ${wid ? 'px-2' : ' justify-center'} w-full`}>
                    <div onClick={()=> {setHelp(prev => !prev); setSettings(false)}} className={` ${Help ? 'opacity-100 font-medium scale-105' : ''} opacity-65 hover:opacity-100 cursor-pointer flex items-center text-sm gap-1`}>
                         <i className="ri-questionnaire-line text-[20px]"></i> {wid && <p>Help</p>}
                    </div>
                    {Help && <div className='w-60 h-40 border border-zinc-400/80 bg-zinc-300 absolute rounded-md bottom-0 left-full p-1'>
                         Help
                    </div>}
               </div>
          </div>
          <div className={`${wid ? 'w-full rounded-md border' : 'w-full rounded-full'}  border-zinc-400 h-[70px] transition-all bg-zinc-300 overflow-hidden flex items-center justify-center`}>
               {!wid && BlogData.slice(0,1).map((items, index) => (
                    <NavLink to={`/profile`} className={`w-full h-full`}>
                         <img 
                         key={index}
                         src={items.image} 
                         alt="Profile" 
                         className="size-9 object-cover rounded-full"
                         />
                    </NavLink>
               ))}
               {wid && <div className='w-full h-full flex items-center p-1'>
                    {BlogData.slice(0,1).map((items, index) => (
                         <div className='w-fit h-fit flex items-center justify-start gap-2'>
                              <NavLink to={`/profile`} className={`flex items-center text-xs h-full gap-2`}>
                              <img 
                              key={index}
                              src={items.image} 
                              alt="Profile" 
                              className="size-[30px] object-cover rounded-full"
                              />
                                   <div className='flex flex-col text-xs h-full'>
                                        <span className='font-medium text-[15px]'>{items.author}</span>
                                        <NavLink to={items.github} className='line-clamp-1 text-[11px] hover:text-blue-800'>{items.github}</NavLink>
                                   </div>
                              </NavLink>
                         </div>
                    ))}
               </div>}
          </div>
     </div>
    </div>
  )
}

export default Nav