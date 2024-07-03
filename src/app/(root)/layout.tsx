
import LowerNavbar from '@/components/LowerNavbar/LowerNavbar'
import { fetchProfile, getUserId } from '@/lib/Actions/user.action'
import { notFound } from 'next/navigation';
import React from 'react'


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const id = await getUserId();

   if(!id)return null;
  const profile=await fetchProfile(id);
  if(!profile)return null;
  return (
    <div>
        {children}
        <LowerNavbar id={id}  profile={profile}/>
    </div>
  )
}

export default Layout
