import React, { useState } from 'react'

function Music() {
     const [playpause, setplaypause] = useState(false);
     const Musicdata = [
          {
               name:'Monsuni takat',
               author:'Honey singh',
               file:'',
               logo:'https://variety.com/wp-content/uploads/2022/07/Music-Streaming-Wars.jpg?w=1000&h=563&crop=1',
               lerix:'Lorem, ipsum dolor.'
          },
          {
               name:'Mind transform',
               author:'Honey singh',
               file:'',
               logo:'https://images.macrumors.com/t/MKlRm9rIBpfcGnjTpf6ZxgpFTUg=/1600x1200/smart/article-new/2018/05/apple-music-note.jpg',
               lerix:'Lorem, ipsum dolor.'
          },
          {
               name:'Monsuni takat',
               author:'Honey singh',
               file:'',
               logo:'https://live-production.wcms.abc-cdn.net.au/a362273509f7eccdcf362bb73b3b006d?impolicy=wcms_crop_resize&cropH=788&cropW=1400&xPos=0&yPos=0&width=862&height=485',
               lerix:'Lorem, ipsum dolor.'
          },
          {
               name:'Monsuni takat',
               author:'Honey singh',
               file:'',
               logo:'https://static.wixstatic.com/media/b42422_d833eeac7f9e46b8b12b8689410c9630~mv2.jpg/v1/fill/w_568,h_364,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b42422_d833eeac7f9e46b8b12b8689410c9630~mv2.jpg',
               lerix:'Lorem, ipsum dolor.'
          },
     ]
  return (
    <div className='w-96 h-96 p-2 flex flex-col items-start justify-around gap-1'>
     <p className='font-medium text-lg'>Motivation</p>
     <div className='w-full h-76 overflow-auto'>
          <div className='w-full h-fit grid grid-cols-2 pt-3 overflow-scroll gap-2'>
               {Musicdata.map((items, index)=> 
               <div key={items} onClick={()=>setplaypause(prev => !prev[items])} className='w-full relative h-20 rounded-lg border border-zinc-300 hover:border-zinc-400 cursor-pointer transition-all duration-300 flex items-center gap-0.5 p-1'>
                    <div className='w-24 h-full flex items-center justify-center'>
                    <img src={items.logo} className='rounded-md w-full h-18 object-cover' />
                    </div>
                    <div className='w-full h-full overflow-hidden rounded-md flex flex-col items-start p-1'>
                    <p className='text-lg font-medium text-nowrap tracking-tight'>{items.name}</p>
                    <p className='text-xs text-nowrap w-22 overflow-hidden'>{items.lerix}</p>
                    <p className='text-xs font-medium'>{items.author}</p>
                    </div>
                    {playpause && <div className='absolute top-1 right-1 size-7 rounded-md  bg-zinc-100 border border-zinc-300 hover:border-zinc-400 flex items-center justify-center hover:text-lg transition-all'><i className='ri-play-fill'></i></div>}
               </div>
          )}
          </div>
     </div>
     <div className='w-full h-10 bg-green-400'>

     </div>
    </div>
  )
}

export default Music