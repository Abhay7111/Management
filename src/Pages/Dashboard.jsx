import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Outletcm from '../Components/Outletcm';
import * as motion from "motion/react-client"
import Filter from '../Components/Filter';

function Dashboard() {
    const [Tagsearchof, setTagsearchof] = useState(null);
    const [filter, setfilter] = useState(null)

    return (
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='w-full flex items-center justify-between'>
                <div className='w-fit h-10 bg-zinc-300 rounded-lg border-[2px] border-zinc-300 flex items-center justify-between gap-[2px]'>
                    <NavLink to={`students`} className={ ({isActive}) => `w-fit h-full ${isActive ? 'bg-white text-blue-500 font-medium' : ''} rounded-md flex items-center justify-center gap-2 text-sm px-2`}><i className="ri-graduation-cap-line"></i>Students</NavLink>
                    <NavLink to={`timeline`} className={ ({isActive}) => `w-fit h-full ${isActive ? 'bg-white text-blue-500 font-medium' : ''} rounded-md flex items-center justify-center gap-2 text-sm px-2`}><i className="ri-menu-4-line"></i>Timeline</NavLink>
                    <NavLink to={`calender`} className={ ({isActive}) => `w-fit h-full ${isActive ? 'bg-white text-blue-500 font-medium' : ''} rounded-md flex items-center justify-center gap-2 text-sm px-2`}><i className="ri-calendar-2-line"></i>Calender</NavLink>
                    <NavLink to={`Board`} className={ ({isActive}) => `w-fit h-full ${isActive ? 'bg-white text-blue-500 font-medium' : ''} rounded-md flex items-center justify-center gap-2 text-sm px-2`}><i className="ri-pause-line"></i>Board</NavLink>
                    <NavLink to={`add`} className={({isActive}) => ` ${isActive ? 'text-blue-600' : ''} w-9 h-full rounded-md border border-zinc-400 bg-white flex items-center justify-center`}><i className='ri-add-fill font-medium text-lg'></i></NavLink>
                </div>
                <div className='w-fit h-10 rounded-lg flex items-center justify-end gap-2'>
                    <div className=' bg-white border border-zinc-300 w-fit h-full rounded-md overflow-hidden flex items-center justify-center py-1 px-2 gap-1'>
                        <label onClick={()=>setTagsearchof(prev => !prev)} htmlFor='tagsearch' className='ri-search-line opacity-35 font-bold'></label>
                        <input 
                        onClick={()=>setTagsearchof(true)}
                        type="search" 
                        name="" 
                        id="tagsearch" 
                        placeholder='Search Task...' 
                        className={`outline-none bg-white ${Tagsearchof ? 'w-40' : 'w-20'} transition-all duration-500 placeholder:text-sm placeholder:font-medium font-medium placeholder:line-clamp-1`}/>
                        {Tagsearchof && <span onClick={()=>setTagsearchof(false)} className={`ri-close-fill cursor-pointer opacity-40 hover:opacity-80 transition-all duration-300`}></span>}
                    </div>
                    <div className={` border border-zinc-300 bg-white hover:bg-zinc-300 transition-all rounded-md h-full gap-1 cursor-pointer relative`}><span onClick={()=> setfilter((prev)=>!prev)} className='w-full h-full rounded-md px-2 py-1 flex items-center justify-center relative z-20 '><span className='font-medium'>Filter</span><i class="ri-filter-3-line font-bold"></i> </span><div className={` ${filter? 'w-96 h-96 mt-1 top-full right-0  rounded-xl border border-zinc-300 opacity-100' : 'w-0 h-0 opacity-0 rounded-md top-0 right-0 -z-10'} transition-all duration-300 absolute  overflow-hidden z-50`}><Filter/></div></div>
                    <div className={`w-10 h-10 border border-zinc-300 bg-white hover:bg-zinc-200 transition-all rounded-md flex items-center justify-center gap-1 cursor-pointer`}><i class="ri-more-line font-bold"></i></div>
                </div>
            </div>
            <div className='w-full h-full bg-white rounded-md p-1 overflow-scroll '>
                <Outletcm/>
            </div>
        </div>
    );
}

export default Dashboard;