'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { lowerNav2 } from '../../../public/profilePage'
import { bell, coloredcircle, community, homeicon, profileicon, CrossColor } from '../../../public/profile' // Assume closeicon is the cross icon image
import Link from 'next/link'
import { commproduct, commthread } from '../../../public/community'

const CommunityNav = ({ id, communityid }: { id: string | null , communityid?:string }) => {
  // State to manage the toggle
  const [isToggled, setIsToggled] = useState(false);

  // Function to handle the toggle
  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  // Function to handle the delayed toggle
  const handleDelayedToggle = () => {
    setTimeout(() => {
      setIsToggled(false);
    }, 300); // 300ms delay
  }

  return (
    <div className='h-full'>
      <div className={`w-full flex flex-col fixed bottom-0 z-10`}>
        <Image src={lowerNav2} alt='nav' className='relative shadow-xl w-full transition-all duration-300 ease-in-out' />
        <div className='flex absolute w-full mt-[1.7rem] px-6 z-10 transition-all duration-300 ease-in-out'>
          <Link href={'threads'}> <Image src={homeicon} alt='nav' /></Link>
          <Image src={commthread} alt='nav' className='ml-[16%]' />
          <Link href={'products'} className='ml-[40%]' >
          <Image src={commproduct} alt='nav'/>
          </Link>
          <div className='ml-auto'>
            <Link href={'/profile/' + id + "/threads"}><Image src={profileicon} alt='nav' /></Link>
          </div>
        </div>
        <div className='flex absolute justify-center w-full mx-auto mt-[-1.5rem] z-20 transition-all duration-300 ease-in-out'>
          <div className='relative cursor-pointer' onClick={handleToggle}>
            <Image src={coloredcircle} alt='nav' className={`transition-transform duration-300 ease-in-out ${isToggled ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </div>
      {isToggled && (
        <div className='fixed inset-0 bg-black/80 z-20 transition-opacity duration-300 ease-in-out'>
          <div className='flex flex-col items-center justify-end h-full pb-[2.8rem]'>
            {!communityid && (
                <div className='text-white mb-4 flex gap-[24px] flex-col items-center'>
                <Link href={'create/'} onClick={handleDelayedToggle}><p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Threads</p></Link>
                <Link href={'/createproduct'} onClick={handleDelayedToggle}><p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Products</p></Link>
              </div>
            )}
            {communityid && (
                <div className='text-white mb-4 flex gap-[24px] flex-col items-center'>
                <Link href={`/community/${communityid}/create/threads`} onClick={handleDelayedToggle}><p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Threads</p></Link>
                <Link href={'/community/${communityid}/create/products'} onClick={handleDelayedToggle}><p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Products</p></Link>
              </div>
            )}
            
            <div className='cursor-pointer' onClick={handleToggle}>
              <Image src={CrossColor} alt='close' className='transition-transform duration-300 ease-in-out' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityNav
