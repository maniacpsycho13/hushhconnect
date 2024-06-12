import Image from 'next/image'
import React, { useState } from 'react'
import { lowerNav2 } from '../../../public/profilePage'
import { bell, coloredcircle, community, homeicon, profileicon, CrossColor } from '../../../public/profile' // Assume closeicon is the cross icon image
import Link from 'next/link'

const LowerNavbar = () => {
  // State to manage the toggle
  const [isToggled, setIsToggled] = useState(false);

  // Function to handle the toggle
  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  return (
    <div className='h-full'>
      <div className={`w-full flex flex-col fixed bottom-0 z-10`}>
        <Image src={lowerNav2} alt='nav' className='relative shadow-xl w-full'></Image>
        <div className='flex absolute  w-full mt-[1.7rem] px-6 z-10'>
          <Link href={'/Profile/home'}> <Image src={homeicon} alt='nav' className=''></Image></Link>

          <Image src={bell} alt='nav' className='ml-[16%]'></Image>
          <Image src={community} alt='nav' className='ml-[40%]'></Image>
         <div className='ml-auto'>
         <Link href={'/Profile'}><Image src={profileicon} alt='nav' className=''></Image></Link>
         </div>
        </div>
        <div className='flex absolute justify-center w-full mx-auto mt-[-1.5rem] z-20'>
          <div className='relative cursor-pointer' onClick={handleToggle}>
            <Image src={coloredcircle} alt='nav' className={`transition-transform duration-300 ${isToggled ? 'rotate-90' : ''}`}></Image>
            {/* Add the toggle text with animation effect */}
           
          </div>
        </div>
      </div>
      {isToggled && (
        <div className='fixed inset-0 bg-black/80 z-20'>
          <div className='flex flex-col items-center justify-end h-full pb-[2.8rem]'>
            <div className='text-white mb-4 flex gap-[24px] flex-col items-center' >
              <Link href={'/create'}><p className="text-white/opacity-95 text-base font-medium  leading-[19px]">Threads</p></Link>
              <Link href={'/create'}><p className="text-white/opacity-95 text-base font-medium  leading-[19px]">Products</p></Link>
              
              {/* <p className="text-white/opacity-95 text-base font-medium  leading-[19px]">Products</p> */}
            </div>
            <div className='cursor-pointer' onClick={handleToggle}>
              <Image src={CrossColor} alt='close' className='transition-transform duration-1000'></Image>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LowerNavbar
