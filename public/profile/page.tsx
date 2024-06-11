"use client";
import { useState, useEffect } from 'react';
import { auth, signOut } from "@/auth";
import { Group1, Group2, Group3, Group4, Group5, arrowcircle, find, hushhCard, hushhprofile, name, shareicon, user } from "../../../../public/profilePage";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/Data/TabData/TabData';


export default function Page() {
    const [session, setSession] = useState(null);
    const [showCard, setShowCard] = useState(false);

    // useEffect(() => {
    //     async function fetchData() {
    //         const sessionData = await auth();
    //         setSession(sessionData);
    //     }
    //     fetchData();
    // }, []);

    const handleToggle = () => {
        setShowCard(!showCard);
    };

    return (
        <div>
            {/* {JSON.stringify(session)}
            <div>
                <form action={async () => {
                    'use server'
                    await signOut();
                }} >
                    <button type="submit">Logout</button>
                </form>
            </div> */}

            <div className='bg-white px-4 py-4'>
                <div className='flex justify-between'>
                    <Image src={name} alt="user" />
                    <div className='flex gap-4'>
                        <Image src={user} alt="user" />
                        <Image src={find} alt="find" />
                    </div>
                </div>

                <div className='mt-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <Image src={hushhprofile} alt="profile" className="w-[108.645px] h-[108.645px] rounded-full" />
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-[18px] text-black font-[600]'>Jess Bailey</h2>
                            <p onClick={handleToggle} className='cursor-pointer text-[12px] font-[400] mx-auto bg-clip-text text-transparent bg-gradient-to-l from-[#E0055F] to-[#2020ED]'>view hushh card</p>
                        </div>
                    </div>

                    <div className='flex justify-evenly my-4'>
                        <Image src={Group1} alt="Group1" />
                        <Image src={Group2} alt="Group2" />
                        <Image src={Group3} alt="Group3" />
                        <Image src={Group4} alt="Group4" />
                        <Image src={Group5} alt="Group5" />
                    </div>

                    <div className='bg-[#EFEFEF] rounded-xl p-4 mx-[5px]'>
                        <p className='text-center text-[#171717] text-[12px] font-medium'>Music is my life’s soundtrack. Follow for song recommendations, live sessions, and a peek into my creative process. Let’s vibe together!</p>
                    </div>

                    {/* <div className='my-4 text-[12px] font-medium text-black flex justify-between'>
                       <div className='py-[6px] px-[24px] rounded-[4px] addcolor text-white'>Thread</div>
                       <div className='py-[6px] px-[24px] bg-[#EFEFEF] rounded-[4px]'>Products</div>
                       <div className='py-[6px] px-[24px] bg-[#EFEFEF] rounded-[4px]'>Schedule Meet</div>
                     </div> */}

{/* ------------------------------------------------------------------------------------------------------------ */}
<div className='mt-[16.14px]'>
        <Tabs defaultValue='threads' className='w-full'>
           <TabsList className='flex bg-transparent gap-[10px]' >
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab  '>
                {/* <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain max-sm:hidden'
                /> */}
                <p className=''>{tab.label}</p>

                
              </TabsTrigger>
            ))}
          </TabsList> 
          
            <TabsContent
              key={`content-threads`}
              value="threads"
              className='w-full text-light-1'
            >
              {/* <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />  */}
            </TabsContent>

            <TabsContent
              key={`content-Product`}
              value="Product"
              className='w-full text-light-1'
            >
              {/* <div><ProductsTab 
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'></ProductsTab></div> */}

            </TabsContent>

            <TabsContent
              key={`content-Meeting`}
              value="Meeting"
              className='w-full text-light-1'
            >
              {/* <Payment></Payment> */}
              {/* <div className="text-white my-8">
                <div>Note:</div>
                <br />
                <ul className="list-disc ml-4"> 
                  <li>Please Add your email in Guest Section</li>
                </ul>
              </div>
              <div></div> */}
              
            </TabsContent>


        </Tabs>
      </div>

{/* ----------------------------------------------------------------------------------------------------------------------- */}





                </div>
            </div>

            <div className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[7.20px] flex items-end transition-transform duration-300 ${showCard ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className='w-full shadow-lg rounded-t-lg'>
                    <div className='px-[14px]'>
                        <div className="w-full h-2 bg-zinc-300 rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className='px-[13px] py-[14px] border-[1px] border-hidden bg-white rounded-tl-lg rounded-tr-lg h-[432px]'>
                        <div className='flex justify-end'>
                            <Image src={arrowcircle} alt="Group1" onClick={handleToggle} />
                        </div>
                        <div className='flex justify-center items-center mt-[-0.8rem] flex-col'>
                            <Image src={hushhprofile} alt="profile" className="w-[68.64px] h-[68.64px] rounded-full" />
                            <p className='text-black text-lg font-semibold leading-[33.29px]'>Jess Bailey</p>
                        </div>
                        <div className='relative'>
                            <Image src={hushhCard} alt="card" className="w-full  relative" />
                            <div className='absolute top-[16px] left-[24px] flex flex-col'>
                                <p className="text-white text-2xl font-normal font-['Figtree']">Jess Bailey</p>
                                <p className="text-white text-[8.85px] font-medium font-['Figtree']">jessbailey@hushhconnect.com</p>
                            </div>
                            <div className='absolute top-[24px] right-[26px]'>
                                <Image src={shareicon} alt="card" className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
