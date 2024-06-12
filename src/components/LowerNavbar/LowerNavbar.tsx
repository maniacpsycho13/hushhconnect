import Image from 'next/image'
import React from 'react'
import { lowerNav, lowerNav2 } from '../../../public/profilePage'
import { bell, coloredcircle, community, homeicon, profileicon } from '../../../public/profile'

const LowerNavbar = () => {
  return (
    <div className='w-full  flex  flex-col  fixed bottom-0'>
        <Image src={lowerNav2} alt='nav' className='relative shadow-xl w-full'></Image>
        <div className='flex absolute justify-between w-full mt-[1.7rem] px-6'>
            <Image src={homeicon} alt='nav' className=''></Image>
            {/* <Image src={bell} alt='nav' className=''></Image>
            <Image src={community} alt='nav' className=''></Image> */}
            <Image src={profileicon} alt='nav' className=''></Image>
        </div>
        <div className='flex absolute justify-between w-full px-24 mt-[1.7rem]'>
          <Image src={bell} alt='nav' className=''></Image>
          <Image src={community} alt='nav' className=''></Image>
        </div>
        <div className='flex absolute justify-center w-full mx-auto mt-[-1.5rem]'>
          <Image src={coloredcircle} alt='nav' className=''></Image>
        </div>
    </div>
  )
}

export default LowerNavbar