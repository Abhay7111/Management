import React from 'react'
import { Outlet } from 'react-router-dom'
import { Blog } from '../Data/Blog';
import Loader from './Loading';
import { div } from 'motion/react-client';

function Outletcm() {
     const { Loading, Error } = Blog();
    
    if (Loading) {return <div className='w-full h-full p-2 flex items-center justify-center'><Loader/></div>;}
    if (Error) {return <div className='w-full h-full p-2 flex items-center justify-center'>Error: {Error.message}</div>;}
    

  return (
            <div className=' w-full h-full overflow-auto'>
              <Outlet/>
            </div>
  )
}

export default Outletcm