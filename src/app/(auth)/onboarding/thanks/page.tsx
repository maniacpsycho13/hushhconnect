'use client'
import { getUserbyId } from '@/lib/Actions/user.action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Page = () => {
  

  return (
    <div className='px-6 py-4 h-screen'>
        <div className=' flex  flex-col justify-center mt-[50%]'>
            <p className="bg-clip-text text-transparent w-[55%] bg-gradient-to-l from-[#E54D60] to-[#A342FF] text-[50px] font-bold leading-[63px] ">Thanks</p>
            <p className="text-gray-900 text-xl font-bold  leading-[25.20px]">for signing up...</p>
            <p className=" text-neutral-500 text-[15px] font-normal w-[70%] mt-[12px] leading-tight">Start sharing everything you are, in one simple link.</p>
        </div>
        <div className="w-full h-[54px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[14px] justify-center items-center gap-2.5 inline-flex mt-[70%]">
            <Link href={'social'}><div className="text-white text-base font-semibold ">Continue </div></Link>
            
        </div>
    </div>
  )
}

export default Page