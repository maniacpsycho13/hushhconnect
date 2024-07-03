import Image from 'next/image'
import React from 'react'
import { NextIcon, SettingIcon1, SettingIcon2, SettingIcon3, SettingIcon4, SettingIcon5, SettingIcon6, SettingIcon7, SettingIcon8 } from '../../../../public/Settings'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {
  return (
    <div>
        <div className='px-6 py-4 bg-gray-100 h-screen w-screen'>
            <div className='flex justify-between'>
                <h2 className='text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]'>Profile</h2>
                <div className='flex  flex-col items-center'>
                            {/* <Image src={SettingIcon8} alt='Manage'></Image> */}
                                <div>
                                    <SignedIn>
                                    <UserButton/>
                                    </SignedIn> 
                                </div> 
                                <div className='font-semibold text-black text-sm'>Logout</div>
                </div>
                </div>
            <div>
                <div className="text-indigo-950 text-xs font-normal mt-[12px] uppercase leading-[14.37px] tracking-tight">Allow Assets to access</div>
                <Link href={'/underprogress'}>
                    <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                        <div className='flex gap-[7.66px]'>
                            <Image src={SettingIcon1} alt='Manage'></Image>
                            <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">Manage your connections</div>
                        </div>
                        <div >
                            <Image src={NextIcon} alt='icon'></Image>
                        </div>
                    </div>
                </Link>

                <div className="text-indigo-950 text-xs font-normal mt-[23px] uppercase leading-[14.37px] tracking-tight">General</div>
                <Link href={'/underprogress'}>
                <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                    <div className='flex gap-[7.66px]'>
                        <Image src={SettingIcon2} alt='Manage'></Image>
                        <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">Your profile</div>
                    </div>
                    <div >
                        <Image src={NextIcon} alt='icon'></Image>
                    </div>
                </div>
                </Link>

                <Link href={'/underprogress'}>
                    <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                        <div className='flex gap-[7.66px]'>
                            <Image src={SettingIcon3} alt='Manage'></Image>
                            <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">App appearance</div>
                        </div>
                        <div >
                            <Image src={NextIcon} alt='icon'></Image>
                        </div>
                    </div>
                </Link>

                <Link href={'/underprogress'}>
                    <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                        <div className='flex gap-[7.66px]'>
                            <Image src={SettingIcon4} alt='Manage'></Image>
                            <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">Notification</div>
                        </div>
                        <div >
                            <Image src={NextIcon} alt='icon'></Image>
                        </div>
                    </div>
                </Link>

                <div className="text-indigo-950 text-xs font-normal mt-[23px] uppercase leading-[14.37px] tracking-tight">wallet</div>
                <Link href={'/underprogress'}>
                    <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                        <div className='flex gap-[7.66px]'>
                            <Image src={SettingIcon5} alt='Manage'></Image>
                            <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">Wallet</div>
                        </div>
                        <div >
                            <Image src={NextIcon} alt='icon'></Image>
                        </div>
                    </div>
                </Link>

                <Link href={'/underprogress'}>
                    <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                        <div className='flex gap-[7.66px]'>
                            <Image src={SettingIcon6} alt='Manage'></Image>
                            <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">Data management</div>
                        </div>
                        <div >
                            <Image src={NextIcon} alt='icon'></Image>
                        </div>
                    </div>
                </Link>

                <div className="text-indigo-950 text-xs font-normal  mt-[23px] uppercase leading-[14.37px] tracking-tight">help</div>

                <Link href={'/underprogress'}>
                <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between'>
                    <div className='flex gap-[7.66px]'>
                        <Image src={SettingIcon7} alt='Manage'></Image>
                        <div className=" text-indigo-950 text-base font-normal  leading-[22.99px]">FAQ</div>
                    </div>
                    <div >
                        <Image src={NextIcon} alt='icon'></Image>
                    </div>
                </div>
                </Link>

                {/* <div className='mt-[8.03px] h-[45.98px] w-full pl-[15.33px] bg-white rounded-[9.58px] pr-[15px] items-center inline-flex justify-between '>
                    <div className='flex gap-[7.66px]'>
                        <Image src={SettingIcon8} alt='Manage'></Image>
                            <SignedIn>
                            <UserButton/>
                            </SignedIn> 
                    </div>
                    <div >
                        <Image src={NextIcon} alt='icon'></Image>
                    </div>
                </div> */}
            </div>
        </div>
        <div className='bg-gray-100 w-full h-28'>

        </div>
    </div>
  )
}

export default page