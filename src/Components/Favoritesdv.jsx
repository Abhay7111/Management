import React from 'react';
import { Blog } from '../Data/Blog';
import { NavLink } from 'react-router-dom';

function Favoritesdv() {
  const { BlogData, Loading, Error } = Blog();
  
  if (Loading) return <div className='w-full h-fit flex items-center justify-center'>Loading...</div>;
  if (Error) return <div className='w-full h-full flex items-center justify-center'>Error loading favorites</div>;

  return (
    <div className='w-full h-full overflow-auto flex flex-col gap-1.5 p-1.5'>
      {BlogData.map((item, index) => (
        <NavLink
          key={index}
          to={`/likes/${item._id}`}
          className={({ isActive }) => 
            `w-full px-0.5 py-0.5 rounded-md hover:bg-zinc-400/50 transition-colors opacity-75 hover:opacity-100
            ${isActive ? 'bg-zinc-200' : ''}`
          }
        >
          <p className='line-clamp-1 text-sm'>
            <i className="ri-heart-3-fill mr-1.5"></i>
            {item.title}
          </p>
        </NavLink>
      ))}
    </div>
  )
}

export default Favoritesdv