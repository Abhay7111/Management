import React, { useState } from 'react'
import Music from './Music';

function Topnav() {
  const [openMusic, setOpenMusic] = useState(false);
  return (
    <div className='w-full h-12 rounded-md flex items-center justify-between px-2 border border-zinc-400'>
     <h1 className='text-xl font-medium'>Management</h1>
     <div className='w-20 h-full flex items-center justify-end gap-1'>
      <div onClick={()=>setOpenMusic(prev => !prev)} className='relative bg-zinc-300 px-1 rounded-md border border-zinc-300 hover:border-zinc-200 cursor-pointer transition-all duration-300 text-zinc-800/80 hover:text-zinc-800'>
        {openMusic ? <i className='ri-close-fill'></i> : <i className='ri-play-fill'></i>}
      </div>
      <div className={` ${openMusic ? 'size-96 border' : 'size-0'} border-zinc-400 overflow-hidden transition-all duration-300 absolute top-12 right-2 mt-2 rounded-lg bg-zinc-100 z-50`}>
        <Music/>
     </div>
     </div>
    </div>
  )
}

export default Topnav