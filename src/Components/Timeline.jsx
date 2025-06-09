import React from 'react'
import TimelineGraphforcollage from './Graphs/TimelineGraphforcollage'
import Timeline_new_students from './Timeline_new_students'

function Timeline() {
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