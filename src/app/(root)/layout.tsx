import LowerNavbar from '@/components/LowerNavbar/LowerNavbar'
import { getUserId } from '@/lib/Actions/user.action'
import { notFound } from 'next/navigation';
import React from 'react'


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const id = await getUserId();
  if(!id) notFound();
  return (
    <div>
        {children}
        <LowerNavbar id={id}/>
    </div>
  )
}

export default Layout
