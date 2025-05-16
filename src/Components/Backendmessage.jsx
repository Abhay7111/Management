import React from 'react'

function Backendmessage() {
  return (
     <div className='w-96 bg-gradient-to-bl from-yellow-100 to-red-100 border border-zinc-200 shadow-lg h-fit rounded-xl p-6 flex flex-col items-center space-y-4'>
       <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2'>
         <i className='ri-server-line text-2xl text-red-600'></i>
       </div>
       <h1 className='text-2xl text-center font-bold text-gray-800'>Server Unavailable</h1>
       <div className='space-y-2 text-center'>
         <p className='text-sm text-gray-600'>Our backend services are currently experiencing issues.</p>
         <p className='text-sm text-gray-600'>Our team is working diligently to restore functionality.</p>
         <p className='text-sm text-gray-600'>We appreciate your patience and understanding.</p>
       </div>
       <button className='mt-4 px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium'>
         Try After some time
       </button>
     </div>
  )
}

export default Backendmessage