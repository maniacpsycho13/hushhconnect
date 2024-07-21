import Template from '@/components/Template/Template'
import Link from 'next/link'
import React from 'react'
import { fetchProfile } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";

export default async function page ()  {
  const session = await auth();
  if (!session || !session.userId) {
    return null;
  }
  const profile=await fetchProfile(session.userId);
  
  if(!profile)return null;
  return (
    <div className='px-6 py-4'>
        <div className="text-center text-gray-900 text-xl font-bold mt-[24px] ">Templates</div>

        <div className="text-center text-neutral-500 text-sm font-normal mt-[8px] leading-tight">Add your own content below. You can also further customize your links and appearance later.</div>
        <Template id={session.userId} user={profile}></Template>
    </div>
  );
}

