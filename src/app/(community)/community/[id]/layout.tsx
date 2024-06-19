import LowerNavbar from '@/components/LowerNavbar/LowerNavbar'
import { getUserId } from '@/lib/Actions/user.action'
import React from 'react'


const Layout = async ({ children , params}: { children: React.ReactNode,params:{id:string} }) => {
  const userid = await getUserId();
  // if(!id) notFound();
  return (
    <div>
        {children}
        <LowerNavbar communityid={params.id} id={userid}/>
    </div>
  )
}

export default Layout
