import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs, profileTabshome } from '@/Data/ProfileData'
import { find } from '../../../../public/profile'
import DashboardPage from '../dashboard/page'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      {/* <div className='px-6 py-4'>

        <div className='mt-4'>
        <Tabs defaultValue='threads' className='w-full'>
           <TabsList className='flex bg-transparent gap-6' >
            {profileTabshome.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain max-sm:hidden'
                />
                <p className=''>{tab.label}</p>

                
              </TabsTrigger>
            ))}
          </TabsList> 
          
            <TabsContent
              key={`content-threads`}
              value="threads"
              className='w-full text-light-1'
            >
                <DashboardPage/>  
            <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>

            <TabsContent
              key={`content-Product`}
              value="Product"
              className='w-full text-light-1'
            >
              
              <div><ProductsTab 
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'></ProductsTab></div>

            </TabsContent>
        </Tabs>
        </div>
      </div> */}
    </div>
  )
}

export default page