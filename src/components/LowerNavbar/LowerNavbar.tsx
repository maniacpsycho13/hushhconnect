'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { lowerNav2 } from '../../../public/profilePage'
import { bell, coloredcircle, community, homeicon, profileicon, CrossColor, coloredbell, coloredhome, coloredmeet } from '../../../public/profile'
import Link from 'next/link'
import { useRouter} from 'next/navigation'
import UserAvatar from '../Post/UserAvatar'
import { UserWithExtras } from '@/lib/Validations/definitions'
import { coloredShare } from '../../../public/signup'
import { useQRCode } from "next-qrcode";
import {AppleWallet, GoogleWallet, arrowcircle, find, hushhCard, hushhprofile, menu, name, shareicon, user} from "@/../public/profile"
import { SharingOption } from '../ProfileCard/Sharingoption'

const LowerNavbar = ({ id, communityid, profile }: { id: string | null , communityid?:string ,profile?:UserWithExtras | null }) => {

  const [showCard, setShowCard] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState(false);
  const [googleWallet,setGoogleWallet] = useState<string>("");

  const { Canvas } = useQRCode();
  const pathname = usePathname();
  const path='https://hushhvivaconnect.shop/'+pathname

  const handleToggle = () => {
    setShowCard(!showCard);
};

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
    <div className='h-full '>
      <div className={`w-full flex flex-col fixed bottom-0 z-10 max-w-[460px]`}>
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
             
                 <Image src={profile?.image || profileicon} alt='nav' height={24} width={24} className='rounded-full'/> 
             
            </Link>
          </div>
        </div>
        <div className='flex absolute justify-center w-full mx-auto mt-[-1.5rem] z-20 transition-all duration-300 ease-in-out'>
          <div className='relative cursor-pointer' onClick={handleToggle}>
            <Image src={coloredShare} alt='nav' className={`transition-transform duration-300 ease-in-out ${isToggled ? 'rotate-90' : ''}`} />
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
              <div className='text-white mb-4 flex gap-[24px] flex-col items-center '>
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

              <div className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[7.20px] flex items-end z-50 transition-transform duration-300  max-w-[460px] mx-auto ${showCard ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className='w-full shadow-lg rounded-t-lg'>
                    <div className='px-[14px]'>
                        <div className="w-full h-2 bg-zinc-300 rounded-tl-xl rounded-tr-xl" />
                    </div>
                    
                    <div className='px-[13px] py-[14px] border-[1px] border-hidden bg-white rounded-tl-lg rounded-tr-lg h-[432px]'>
                        <div className='flex justify-end'>
                            <Image src={arrowcircle} alt="Group1" onClick={handleToggle} />
                        </div>
                        <div className='flex justify-center items-center mt-[-0.8rem] flex-col'>
                            <Image src={hushhprofile} width={68.64} height={68.64} alt="profile" className="w-[68.64px] h-[68.64px] rounded-full" />
                            <p className='text-black text-lg font-semibold leading-[33.29px]'>Anmol Singh</p>
                        </div>
                        <div className='relative '>
                            <Image src={hushhCard} alt="card" className="w-full  relative rounded-xl  " />
                            <div className='absolute top-[16px] left-[24px] flex flex-col gap-[3.5rem] '>
                               <div>
                                <p className="text-white text-2xl font-normal ">Anmol Singh</p>
                                <p className="text-white text-[8.85px] font-medium ">anmolrajawat1234@gmail.com</p>
                               </div>
                                <div className='opacity-[80%]'>
                                    <Canvas
                                  text={path}
                                  options={{
                                    errorCorrectionLevel: 'M',
                                    margin: 2,
                                    scale: 2,
                                    width: 56,
                                    color: {
                                      dark: '#FFFFFF',
                                      light: '#1A73E9',
                                    },
                                    
                                  }}
                                />
                                </div>
                            </div>
                            <div className='absolute top-[24px] right-[26px] z-50'>
                                
                                <SharingOption/>
                            </div>
                            <div>
                           
                            </div>
                        </div>

                        <div className='flex justify-between px-[22px]'>
                          <Link href={googleWallet || ""} target="_blank">
                          <Image src={GoogleWallet} alt='google'></Image>
                          </Link>
                          <Image src={AppleWallet} alt='apple'></Image>
                        </div>
                    </div>
                </div>
            </div> 
    </div>
  )
}

export default LowerNavbar
