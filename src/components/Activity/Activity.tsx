import Image from 'next/image'
import React from 'react'
import { hushhprofile } from '../../../public/profile'
import { Comment } from '@prisma/client'

const Activity = ({ comments }: { comments: any[] }) => {
  return (
    <div className='px-6 pt-4 h-screen '>
      <h2 className='text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] w-[25%]'>Activity</h2>

      <div className='mt-4'>
        {comments.map((comment) => {
          const createdAt = new Date(comment.createdAt);
          const formattedDate = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          const formattedTime = createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

          return (
            <div key={comment.id} className='flex gap-[13px] border-b-2 border-gray-200 py-4'>
              <div className='mt-2'>
                <Image src={comment.user.image || hushhprofile} alt='profile' height={32} width={32}></Image>
              </div>
              <div className='flex flex-col gap-[8px] w-[84%]'>
                <div>
                  <span className='text-gray-800 text-xs font-semibold leading-none'>{comment.user.username}</span>
                  <span className="text-gray-800 text-xs font-normal leading-none"> commented </span>
                  {/* <span className='text-gray-800 text-xs font-semibold leading-none'> thread caption</span> */}
                </div>
                <div className='flex gap-[6px]'>
                  <div className='w-[3.27px] bg-zinc-200 rounded-sm'></div>
                  <div className='text-gray-800 text-xs font-medium leading-none'>
                    {comment.body}
                  </div>
                </div>

                <div className="w-[307.64px] text-gray-400 text-xs font-medium leading-none">
                  {formattedDate} at {formattedTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Activity
