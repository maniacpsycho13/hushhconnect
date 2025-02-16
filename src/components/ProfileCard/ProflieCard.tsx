"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  AppleWallet,
  GoogleWallet,
  arrowcircle,
  find,
  hushhCard,
  hushhprofile,
  menu,
  name,
  shareicon,
  user
} from "@/../public/profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/Data/ProfileData'
import { UserDetails } from '@/app/(root)/profile/[id]/layout'
import Link from 'next/link'
import {
  facebook,
  instagram,
  linkedin,
  twitter,
  youtube
} from '../../../public/profilePage'
import Post from '../Post/Post'
import { SharingOption } from './Sharingoption'
import axios from 'axios'
import { Coin } from '../../../public/coins'
import './ProfileCard.css'; 
import { responsive } from '@/Data/ResponsiveData'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQRCode } from "next-qrcode";
import { useRouter, usePathname } from 'next/navigation'

const ProfileCard = (props: any) => {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [googleWallet, setGoogleWallet] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { Canvas } = useQRCode();
  const pathname = usePathname();
  const path = 'https://hushhvivaconnect.shop/' + pathname

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.post('/api/create-pass', {
          email: props.email,
          id: props.id,
          name: props.name,
        });
        setGoogleWallet(response.data.saveUrl);
      } catch (error) {
        console.error('Error creating pass:', error);
      }
    };
    handleSubmit();
  }, [props.email, props.id, props.name]);

  const handleToggle = () => {
    setShowCard(!showCard);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const platformIcons: any = {
    facebook,
    instagram,
    linkedin,
    twitter,
    youtube,
  };


  const handleNfcShare = async () => {
    if ('NDEFReader' in window) {
     
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.write({
          records: [{
            recordType: "url",
            data: path
          }]
        });
        alert("NFC message sent.");
      } catch (error) {
        console.error("Error writing NFC message:");
      }
    } else {
      console.log("NFC is not supported on your device.");
    }
  };
  

  return (
    <div className=''>
     
      <div className='bg-zinc-100 px-6 py-4 h-full'>
        <div className='flex justify-between items-center'>
          <div className="bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] text-xl font-semibold ">Hushh Connect</div>
          <div className='flex gap-4 items-center'>
            <Link href={`/hushhcoins/${props.id}`}>
              <div className='w-[62.33px] h-[30.68px] bg-gradient-to-l from-rose-600 to-blue-700 rounded-[118.88px] justify-center flex items-center gap-[4px]'>
                <div>
                  <Image src={Coin} alt='coin' className='w-[14.25px] h-[14.25px]'></Image>
                </div>
                <div className="text-white text-base font-semibold ">{props.coins}</div>
              </div>
            </Link>
            <div onClick={handleToggleMenu} className="cursor-pointer">
              <Image src={menu} alt='menu' className='mobile:hidden'></Image>
            </div>
            <div className={`menu-content ${showMenu ? 'open' : 'close'} `} >
              <Link href={'/settings'}><Image src={user} alt="user" /></Link>
              <Link href={'/search'}><Image src={find} alt="find" /></Link>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={props.profilePic || hushhprofile} alt="profile" width={108.645} height={108.645} className="w-[108.645px] h-[108.645px] rounded-full" />
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-[18px] text-black font-[600] inline'>{props.name} {props.lastname}</h2>
            </div>
          </div>

          <div className=' my-4 pl-5'>
            <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3000}>
              {props.socialmedia?.map((item: any) => {
                const isComUrl = item.url.endsWith('.com/');
                const iconStyle = isComUrl ? { filter: 'grayscale(100%)' } : {};

                return (
                  <Link href={isComUrl ? `/edit/${props.id}/social` : item.url} key={item.platform}>
                    <Image 
                      src={platformIcons[item.platform]} 
                      width={46} 
                      height={46} 
                      alt={item.platform} 
                      style={iconStyle} 
                    />
                  </Link>
                );
              })}
            </Carousel>
          </div>

          <div className=' rounded-xl p-4 mx-[5px]'>
            <p className='text-center text-[#171717] text-[12px] font-medium'>{props.bio}</p>
          </div> 

          {/* <button onClick={handleNfcShare} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Share via NFC
          </button> */}

          {/* Tabs section */}
          <div className='mt-[16.14px]'>
            <Tabs defaultValue='threads' className='w-full'>
              <TabsList className='flex bg-transparent gap-[10px]' >
                {profileTabs.map((tab) => (
                  <Link href={"/profile/" + props.username + "/" + tab.value} key={tab.label}>
                    <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                      <p className=''>{tab.label}</p>
                    </TabsTrigger>
                  </Link>
                ))}
              </TabsList> 
              
              <TabsContent key={`content-threads`} value="threads" className='w-full text-light-1'>
                {/* Add your content here */}
              </TabsContent>

              <TabsContent key={`content-Product`} value="Product" className='w-full text-light-1'>
                {/* Add your content here */}
              </TabsContent>

              <TabsContent key={`content-Meeting`} value="Meeting" className='w-full text-light-1'>
                {/* Add your content here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Hushh card modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[7.20px] flex items-end z-50 transition-transform duration-300 max-w-[460px] mx-auto ${showCard ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className='w-full shadow-lg rounded-t-lg'>
          <div className='px-[14px]'>
            <div className="w-full h-2 bg-zinc-300 rounded-tl-xl rounded-tr-xl" />
          </div>
          <div className='px-[13px] py-[14px] border-[1px] border-hidden bg-white rounded-tl-lg rounded-tr-lg h-[432px]'>
            <div className='flex justify-end'>
              <Image src={arrowcircle} alt="Group1" onClick={handleToggle} />
            </div>
            <div className='flex justify-center items-center mt-[-0.8rem] flex-col'>
              <Image src={props.profilePic || hushhprofile} width={68.64} height={68.64} alt="profile" className="w-[68.64px] h-[68.64px] rounded-full" />
              <p className='text-black text-lg font-semibold leading-[33.29px]'>{props.name}{props.lastname}</p>
            </div>
            <div className='relative '>
              <Image src={hushhCard} alt="card" className="w-full relative rounded-xl" />
              <div className='absolute top-[16px] left-[24px] flex flex-col gap-[3.5rem]'>
                <div>
                  <p className="text-white text-2xl font-normal ">{props.name}{props.lastname}</p>
                  <p className="text-white text-[8.85px] font-medium ">{props.email}</p>
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
              <div className='absolute top-[24px] right-[26px]'>
                <SharingOption profile={props}/>
              </div>
              <div></div>
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

export default ProfileCard
