import React from 'react';
import TimelineGraphforcollage from './Graphs/TimelineGraphforcollage';
import Timeline_new_students from './Timeline_new_students';
import { Blog } from '../Data/Blog';
import Loader from './Loading'

function Timeline() {

  const {Loading, Error} = Blog();

  if (Loading) {return <div className='w-full h-full p-2 flex items-center justify-center'><Loader/></div>;}
    if (Error) {return <div className='w-full h-full p-2 flex items-center justify-center'>Error: {Error.message}</div>;}
  return (
    <div className='w-full h-full overflow-auto flex flex-col gap-3 items-start justify-start rounded-xl'>
     <TimelineGraphforcollage/>
     <div className='w-full h-fit'>
      <Timeline_new_students/>
     </div>
    </div>
  )
}

export default Timeline