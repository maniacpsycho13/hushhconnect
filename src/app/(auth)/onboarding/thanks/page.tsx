'use client'
import { getUserbyId } from '@/lib/Actions/user.action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { hiImage } from '../../../../../public/signup';


const Page = () => {
  

  return (
    <div className='px-6 py-4 h-screen'>
        <div>
          <div className="text-rose-500 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] w-[60%]">Hushh Connect</div>
        </div>

        <div className='flex justify-center items-center pt-[90px] pb-[60px]'>
          <Image src={hiImage} alt='hii'></Image>
        </div>

        <div>
          <h2 className='text-[50px] font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] w-[80%]'>Hey there</h2>
          <p className='font-bold text-cl text-gray-900'>Carthee_hushh</p>

          <div className="w-[80%] text-neutral-500 text-[15px] font-normal  leading-tight">Lets set you up for your connect card this is your one stop place for all your social engagement and lead generation</div>
        </div>
        <div className="w-full h-[54px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[14px] justify-center items-center gap-2.5 inline-flex mt-12">
            <Link href={'profilepic'}><div className="text-white text-base font-semibold ">Continue </div></Link>
        </div>
    </div>
  )
}

export default Page