'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { lowerNav2 } from '../../../public/profilePage'
import { bell, coloredcircle, community, homeicon, profileicon, CrossColor, coloredbell, coloredhome, coloredmeet } from '../../../public/profile'
import Link from 'next/link'

const LowerNavbar = ({ id, communityid }: { id: string | null , communityid?:string }) => {
  const pathname = usePathname();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  const handleDelayedToggle = () => {
    setTimeout(() => {
      setIsToggled(false);
    }, 300); 
  }

  const getIcon = (basepath: string, defaultIcon: any, activeIcon: any) => {
    return pathname.startsWith(basepath) ? activeIcon : defaultIcon;
  }

  const isProfileActive = pathname.startsWith(`/profile/${id}`);

  return (
    <div className='h-full'>
      <div className={`w-full flex flex-col fixed bottom-0 z-10`}>
        <Image src={lowerNav2} alt='nav' className='relative shadow-xl w-full transition-all duration-300 ease-in-out' />
        <div className='flex absolute w-full mt-[1.7rem] px-6 z-10 transition-all duration-300 ease-in-out'>
          <Link href={'/home/thread'}>
            <Image src={getIcon('/home', homeicon, coloredhome)} alt='nav' />
          </Link>
          <Link href={`/activity/${id}`} className='ml-[16%]'>
            <Image src={getIcon(`/activity/${id}`, bell, coloredbell)} alt='nav' />
          </Link>
          <Link href={'/allcomm'} className='ml-[40%]'>
            <Image src={getIcon('/allcomm', community, coloredmeet)} alt='nav'/>
          </Link>
          <div className={`ml-auto ${isProfileActive ? 'border-2 border-rose-500 rounded-full' : ''}`}>
            <Link href={`/profile/${id}/threads`}>
              <Image src={profileicon} alt='nav' />
            </Link>
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
                <Link href={'/create'} onClick={handleDelayedToggle}>
                  <p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Threads</p>
                </Link>
                <Link href={'/createproduct'} onClick={handleDelayedToggle}>
                  <p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Products</p>
                </Link>
              </div>
            )}
            {communityid && (
              <div className='text-white mb-4 flex gap-[24px] flex-col items-center'>
                <Link href={`/community/${communityid}/create/threads`} onClick={handleDelayedToggle}>
                  <p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Threads</p>
                </Link>
                <Link href={`/community/${communityid}/create/products`} onClick={handleDelayedToggle}>
                  <p className="text-white/opacity-95 text-base font-medium leading-[19px] transition-opacity duration-300 ease-in-out">Products</p>
                </Link>
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

export default LowerNavbar
