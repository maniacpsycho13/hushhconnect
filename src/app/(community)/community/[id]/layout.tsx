import AllRequests from "@/components/Community/AllRequests";
import CommunityReq from "@/components/Community/CommunityReq";
import { checkUserRole, getCommunityById } from "@/lib/Actions/community.action"
import Image from "next/image";
import Link from "next/link";
import { hushhprofile, shareicon } from "../../../../../public/profile";
import { getUserId } from '@/lib/Actions/user.action'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabsAdmin, profileTabsMember } from "@/Data/ProfileData";
import { addcommunity, commlock, sharebutton } from "../../../../../public/community";
import { backicon } from "../../../../../public/profilePage";
import { Sharingoption } from "@/components/Community/Sharingoption";


const Layout = async ({ children , params}: { children: React.ReactNode,params:{id:string} }) => {
  const userid= await getUserId();
    const community=await getCommunityById(params.id);
    if(!community || !userid) return null;
    const role=await checkUserRole(community.id,userid);
  
  // if(!id) notFound();
  return (
    <div>
        <div className="px-6 pt-4 bg-zinc-100 ">
          <div>
            <Link href={'/allcomm'}><Image src={backicon} alt="back"></Image></Link>
          </div>
          <div className="flex justify-between items-center mt-[6px]">
            <div>
              <div className="  text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Community</div>
            </div>
            <div>
             <Sharingoption/>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-center">
              <Image src={community.image || hushhprofile} alt="profile" className="w-[108px] h-[108px]  rounded-full"></Image>
            </div>
          </div>
       
        <div className="text-black text-lg font-semibold  leading-[33.29px] text-center">{community.name}</div>
        <div className=" text-xs font-[600] text-center bg-clip-text  text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">@{community.name}</div>

        <div className="w-full text-center text-neutral-900 text-xs font-medium mt-4 leading-[18.40px]">{community.description}</div>
        {/* <div>{community.description}</div> */}

        {/* {<div>{role.role}</div>}  */}

        {/* <div className="pt-[28.14px] flex gap-[6px] justify-center">
          <div className=" py-1.5 px-[16px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium "><CommunityReq communityid={params.id} userid={userid}/></div>

          <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
            Share
          </div>
        </div> */}

        {role.role==='admin' && <div>

          {/* <div className="pt-[28.14px] flex gap-[6px] justify-center">
          <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium ">Requests</div> */}

          {/* <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
            Share
          </div> */}

          <Tabs defaultValue='threads' className='w-full mt-4'>
           <TabsList className='flex bg-transparent gap-[10px]' >
            {profileTabsAdmin.map((tab) => (
              <Link href={tab.value} key={tab.label}>
                  <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                    <p className=''>{tab.label}</p>
                  </TabsTrigger>
              </Link>
            ))}
          </TabsList> 
          
            {/* <TabsContent
              key={`content-threads`}
              value="threads"
              className='w-full text-light-1'
            >
              
            </TabsContent> */}

            <TabsContent
              key={`content-Product`}
              value="Product"
              className='w-full text-light-1'
            >
              <div>
              <AllRequests communityId={params.id} userid={userid}/>
              </div>

            </TabsContent>

          </Tabs>
        </div>

          
          /* <AllRequests communityId={params.id} userid={userid}/> */
        
        }

        {role.role==='none' && <div className="bg-zinc-100 h-screen">

          <div className="pt-[28.14px] flex gap-[6px] justify-center">
          <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium "><CommunityReq communityid={params.id} userid={userid}/></div>

          <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
            Share
          </div>
          </div>

          <div className="mt-[120px] ">
            <div className="flex justify-center ">
              <Image src={commlock} alt="lock"></Image>
            </div>

            <div className=" mx-8 mt-[12px] text-center text-neutral-400 text-[15px] font-normal ">You can see the post after your request accepted</div>
          </div>

          {/* <CommunityReq communityid={params.id} userid={userid}/> */}
          </div>
          } 

        {role.role==='member' && <div className="pt-[28.14px] flex gap-[6px] justify-center">
          {/* <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium ">Member</div>

          <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
            Share
          </div> */}
          <Tabs defaultValue='threads' className='w-full'>
           <TabsList className='flex bg-transparent gap-[10px]' >
            {profileTabsMember.map((tab) => (
              <Link href={tab.value} key={tab.label}>
                  <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                    <p className=''>{tab.label}</p>
                  </TabsTrigger>
              </Link>
            ))}
            <div className=" px-[21px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
            Member
          </div>

          
          </TabsList> 
            <TabsContent
              key={`content-threads`}
              value="threads"
              className='w-full text-light-1'
            >
              
            </TabsContent>

            <TabsContent
              key={`content-Product`}
              value="Product"
              className='w-full text-light-1'
            >
              <div>
              <AllRequests communityId={params.id} userid={userid}/>
              </div>

            </TabsContent>

            
             
              
            

        </Tabs>

          </div>}
        </div>
        {children}
        {/* <CommunityNav communityid={params.id} id={userid}/> */}
    </div>
  )
}

export default Layout
