import React, { useState } from 'react';
import { Blog } from '../Data/Blog';
import Tasks from '../Forms/Tasks';

function Spreadsheet() {
  const { BlogData, Loading, Error } = Blog();
  const [Managerform, setManagerform] = useState(false);

  if (Loading) return <div>Loading...</div>;
  if (Error) return <div>Error: {Error.message}</div>;

  return (
    <div className='w-full min-h-40 max-h-[80vh] flex flex-col items-start justify-start gap-2 relative'>
      {/* Header Section */}
      <div className='flex items-center justify-start gap-3 text-sm w-full'>
        <div className='flex items-center gap-1 text-red-700 bg-red-200 px-2 py-1 border border-red-300 rounded-md'>
          <i className='ri-loader-4-line animate-spin'></i>
          <p>In progress</p>
        </div>
        <div className='flex items-center justify-center cursor-pointer hover:bg-gray-100 p-1 rounded'>
          <i className='ri-more-line'></i>
        </div>
        <div className='size-7 rounded-md border border-zinc-300 flex items-center justify-center bg-zinc-200'>
          2
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='w-full h-full overflow-auto'>
        <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1'>
          <div className='w-full h-fit flex flex-col gap-1'>
            <span>Task</span>
            {BlogData.map((item, index) => (
              <div key={item._id || index} className='w-full h-10 rounded-md border border-zinc-200 p-3 hover:shadow-sm transition-all'>
                <label htmlFor={`task-${item._id || index}`} className='text-sm font-medium line-clamp-1 flex items-center gap-2'>
                  <span>
                    <input type="checkbox" name={`task-${item._id || index}`} id={`task-${item._id || index}`} />
                  </span>
                  <span className='line-clamp-1'>{item.title.split(' ').slice(0, 2).join(' ')}</span>
                </label>
              </div>
            ))}
          </div>
          <div className='w-full h-fit flex flex-col gap-1'>
            <span>Description</span>
            {BlogData.map((item, index) => (
              <div key={index} className='w-full h-10 rounded-md border border-zinc-200 p-3 hover:shadow-sm transition-all'>
                <label htmlFor={`task-${item._id || index}`} className='text-sm font-medium line-clamp-1 flex items-center gap-2'><span className='line-clamp-1'>{item.dis}</span></label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className='w-full flex items-center justify-start gap-2 mt-4'>
        <div onClick={() => setManagerform(prev => !prev)} className='w-10 h-10 rounded-md border border-zinc-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'>
          <i className='ri-add-line text-xl font-medium'></i>
        </div>
      </div>
      {Managerform && <div className={` w-full h-[85vh] rounded-2xl bg-white border border-zinc-400 top-0 left-0 absolute`}>
          <div className='w-full h-full rounded-2xl relative p-2'>
            <div onClick={()=>setManagerform(false)} className='size-8 rounded-md border border-zinc-400 bg-zinc-300 cursor-pointer absolute top-2 right-2 flex items-center justify-center opacity-55 hover:opacity-90'><i className='ri-close-line text-2xl font-medium'></i></div>
            <Tasks/>
          </div>
        </div>}
    </div>
  );
}

export default Spreadsheet;