import Template from '@/components/Template/Template'
import Link from 'next/link'
import React from 'react'
import { fetchProfile } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { arrowleft } from '../../../../../public/signup';
import Image from 'next/image';
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default async function page ()  {
  const session = await auth();
  if (!session || !session.userId) {
    return null;
  }
  const profile=await fetchProfile(session.userId);
  
  if(!profile)return null;
  return (
    <div className='px-6 py-4'>
       <div className="flex justify-between">
          <Link href={'yourself'}>
            <div className=" px-2.5 py-[3px] bg-white rounded-[51px] border border-neutral-200 justify-start items-center gap-1 inline-flex">
              <Image src={arrowleft} alt="back"></Image>
              <div className="text-black text-[13px] font-normal leading-snug">Yourself</div>
            </div>
          </Link>

        <Link href={'social'}  className="text-center text-gray-900 text-[15px] font-medium ">Skip</Link>
      
            </div>
        <div className="text-center text-gray-900 text-xl font-bold mt-[24px] ">Templates</div>

        <div className="text-center text-neutral-500 text-sm font-normal mt-[8px] leading-tight">Add your own content below. You can also further customize your links and appearance later.</div>
        <Suspense fallback={<Loader/>}>
          <Template id={session.userId} user={profile}></Template>
        </Suspense>
    </div>
  );
}

