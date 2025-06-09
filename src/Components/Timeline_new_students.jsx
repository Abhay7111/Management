import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Timeline_new_students() {
  const [seeall, setall] = useState(null)
  const testData = [
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'CCC',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 28',
    date:'24/02/2025',
    day:'Tuesday',
    time:'11:40 - 12:50',
    teachername:'MR. Abhay vishwakarma', 
    image:'https://cdn.dribbble.com/users/16292774/avatars/normal/data?1684478653', 
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
  {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'CCC',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 28',
    date:'24/02/2025',
    day:'Tuesday',
    time:'11:40 - 12:50',
    teachername:'MR. Abhay vishwakarma', 
    image:'https://cdn.dribbble.com/users/16292774/avatars/normal/data?1684478653', 
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
  {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
    {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
    {
    title:'CCC',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 28',
    date:'24/02/2025',
    day:'Tuesday',
    time:'11:40 - 12:50',
    teachername:'MR. Abhay vishwakarma', 
    image:'https://cdn.dribbble.com/users/16292774/avatars/normal/data?1684478653', 
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
  {
    title:'Java learning',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 67',
    date:'11/05/2025',
    day:'wednesday',
    time:'10:20 - 12:10',
    teachername:'MR. Surya gupta',  
    image:'https://cdn.dribbble.com/users/19069224/avatars/normal/6c2321f33862f01c505f59f5945016b0.png?1748446531',
  },
  {
    title:'Web pogramming',
    collage:'Jagran collage of eduction, kanpur',
    roomno:'Room 87',
    date:'12/04/2025',
    day:'Tuesday',
    time:'11:20 - 12:30',
    teachername:'MR. Abhay vishwakarma',  
    image:'https://cdn.dribbble.com/userupload/43511036/file/original-f9677621276334220b50874aac317d48.png?resize=1024x768&vertical=center',
  },
]
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
      <div className='w-full h-fit rounded-lg bg-transparent flex flex-col items-center justify-start gap-2 hover:bg-zinc-50 transition-all duration-300'>
        <div className='w-full flex items-center justify-between'>
          <h3 className='text-base font-medium'>Timeline</h3>
          <div onClick={()=>setall(true)} className=' cursor-pointer text-xs font-medium hover:text-blue-500'>See All</div>
        </div>
        <div className='w-full h-full rounded-lg flex flex-col items-center justify-start gap-0.5'>
          {testData.slice(0,5).map((items, index)=> (
            <NavLink to={``} className='p-2 rounded-md gap-2 w-full bg-zinc-200/80 hover:bg-zinc-300/40 flex items-center justify-between'>
              <div className='w-fit  flex items-center gap-2'>
                <div className='w-10 h-10 rounded-md'><img src={items.image}  className='w-full h-full object-cover rounded-full'/></div>
                <div className=' w-fit h-full flex flex-col gap-0.5 px-1'>
                  <h1 className='text-lg font-medium leading-5'>{items.title}</h1>
                  <p className='text-xs leading-4 opacity-60'>{items.teachername}</p>
                  <p className='text-xs leading-4 opacity-60'>{items.collage}</p>
                </div>
              </div>
                <div className='w-fit p-1 rounded-md text-xs font-medium'>{items.day}</div>
              <div className={` w-fit h-5 border border-zinc-300 text-[0.64rem] text-nowrap p-0.5 px-1 font-semibold rounded-sm `}><p className='timeline'>{items.roomno}</p></div>
            </NavLink>
          ))}
        </div>
      </div>
      {seeall && <div className='w-full h-full bg-zinc-200 absolute top-0 left-0 p-3'>
          <div onClick={() => setall(prev => !prev)} className='absolute z-50 top-2 right-2 size-8 bg-zinc-200 hover:bg-zinc-900 hover:text-zinc-100 hover:scale-125 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-md border border-zinc-300'><i className='ri-close-line'></i></div>
        <div className='w-full h-full relative pt-3 overflow-auto'>
          <div className='w-full h-full px-5'>
            {testData.map((items, index)=> (
            <NavLink to={``} className='p-2 rounded-md gap-2 w-full bg-zinc-200/80 hover:bg-zinc-300/40 flex items-center justify-between'>
              <div className='w-fit  flex items-center gap-2'>
                <div className='w-10 h-10 rounded-md'><img src={items.image}  className='w-full h-full object-cover rounded-full'/></div>
                <div className=' w-fit h-full flex flex-col gap-0.5 px-1'>
                  <h1 className='text-lg font-medium leading-5'>{items.title}</h1>
                  <p className='text-xs leading-4 opacity-65'>{items.teachername}</p>
                  <p className='text-xs leading-4 opacity-65'>{items.collage}</p>
                </div>
              </div>
                <div className='w-fit p-1 rounded-md text-xs font-medium'>{items.day}</div>
              <div className={` w-fit h-5 border border-zinc-300 text-[0.64rem] text-nowrap p-0.5 px-1 font-semibold rounded-sm `}><p className='timeline'>{items.roomno}</p></div>
            </NavLink>
          ))}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Timeline_new_students