"use client"
import Image from 'next/image'
import React, { startTransition, useEffect, useState } from 'react'
import {AppleWallet, GoogleWallet, arrowcircle, find, hushhCard, hushhprofile, menu, name, shareicon, user} from "@/../public/profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/Data/ProfileData'
import { UserDetails } from '@/app/(root)/profile/[id]/layout'
import Link from 'next/link'
import { facebook, instagram, linkedin, twitter, youtube } from '../../../public/profilePage'
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
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
import { arrowleft, BoldArrow, copyblackicon, linkicon } from '../../../public/signup'
import { socialMediaUpdate, socialupdate } from '@/lib/Actions/user.action'
import { FormError } from '../form/AuthForm/form-error'
import { FormSuccess } from '../form/AuthForm/form-success'

const ProfileCard2 = (props: UserDetails) => {

    const [showCard, setShowCard] = useState<boolean>(false);
    const [googleWallet, setGoogleWallet] = useState<string>("");
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { Canvas } = useQRCode();
    const pathname = usePathname();
    const path = 'https://hushhvivaconnect.shop/' + pathname;
    const [editableLink, setEditableLink] = useState<string>("");
    const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
    const [error , setError] = useState<string | undefined>('')
    const [success , setSuccess] = useState<string | undefined>('')
    const router = useRouter();

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

    const handleEditLink = (index: number) => {
        setEditingLinkIndex(index);
        setEditableLink(props.socialmedia[index].url);
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableLink(e.target.value);
    };

    const handleLinkSave = (index: number) => {
        const updatedSocialMedia = [...props.socialmedia];
        updatedSocialMedia[index].url = editableLink;
        console.log(updatedSocialMedia);
        // props.setSocialMedia(updatedSocialMedia); // Ensure you have a setSocialMedia function in props to update the parent state
        startTransition(() => {
          socialMediaUpdate(updatedSocialMedia,props.id,pathname).then((data)=>{
            setError(data?.error);
            setSuccess(data?.success);
            if(data?.success){
              setEditingLinkIndex(null);
              router.push(`/profile/${props.username}`);
              router.refresh();
            }
          })
        })
        
    };

    const platformIcons: any = {
        facebook,
        instagram,
        linkedin,
        twitter,
        youtube,
    };

    return (
        <div className=''>
            <div className='bg-zinc-100 px-6 pb-4 h-full'>
                <div className=''>
                    <div className='flex items-center gap-[8px]'>
                        <Image src={props.profilePic || hushhprofile} alt="profile" width={108.645} height={108.645} className="w-[108.645px] h-[108.645px] rounded-full" />
                        <div className='flex flex-col '>
                            <h2 className='text-lg text-black font-[600] '>{props.name} {props.lastname}</h2>
                            <div className='mt-[4px]'>
                                <p className=' text-neutral-500 text-xs font-light  leading-[18px]'>{props.bio}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Link href={'#'}>
                            <div className='flex justify-between mt-4 items-center'>
                                <div className=" text-zinc-400 text-xs font-extrabold  leading-[18px]">Tell us about yourself</div>
                                <div>
                                    <Image src={BoldArrow} alt='arrow'></Image>
                                </div>
                            </div>
                        </Link>

                        <Link href={'/onboarding/profilepic'}>
                            <div className='flex justify-between mt-4 items-center'>
                                <div className=" text-zinc-400 text-xs font-extrabold  leading-[18px]">Add Bio or profile image</div>
                                <div>
                                    <Image src={BoldArrow} alt='arrow'></Image>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className=' my-4'>
                        {props.socialmedia?.map((item: any, index: number) => {
                            const isComUrl = item.url.endsWith('.com/');
                            const iconStyle = isComUrl ? { filter: 'grayscale(100%)' } : {};
                            const displayUrl = item.url.replace(/^https:\/\/www\./, '');

                            return (
                                <div className='mb-4 flex justify-between items-center' key={item.platform}>
                                    <div>
                                        <Image
                                            src={platformIcons[item.platform]}
                                            width={24}
                                            height={24}
                                            alt={item.platform}
                                            style={iconStyle}
                                        />
                                    </div>
                                    <div>
                                        {editingLinkIndex === index ? (
                                            <input
                                                type="text"
                                                value={editableLink}
                                                onChange={handleLinkChange}
                                                onBlur={() => handleLinkSave(index)}
                                                className="text-zinc-400 text-xs font-normal w-[156px] mx-2"
                                            />
                                        ) : (
                                            <div className="text-zinc-400 text-xs font-normal overflow-hidden w-[156px] mx-2 h-4 whitespace-nowrap">{displayUrl}</div>
                                        )}
                                    </div>
                                    <div className='p-1 bg-white rounded-full ml-4 '>
                                        <Image src={copyblackicon} alt='copy'></Image>
                                    </div>
                                    <div className='p-1 bg-white rounded-full '>
                                        <Image src={linkicon} alt='copy'></Image>
                                    </div>
                                    <div className=" h-[19.87px] p-[5.44px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-md justify-center items-center gap-[6.79px] inline-flex">
                                        <button onClick={() => handleEditLink(index)} className="text-center text-white text-[11px] font-semibold  leading-3">
                                            {editingLinkIndex === index ? "Save" : "Edit link"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

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
                            <Image src={props.profilePic || hushhprofile} width={68.64} height={68.64} alt="profile" className="w-[68.64px] h-[68.64px] rounded-full" />
                            <p className='text-black text-lg font-semibold leading-[33.29px]'>{props.name + ""}{props.lastname}</p>
                        </div>
                        <div className='relative '>
                            <Image src={hushhCard} alt="card" className="w-full  relative rounded-xl  " />
                            <div className='absolute top-[16px] left-[24px] flex flex-col gap-[3.5rem] '>
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
                                <SharingOption />
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
    );
};

export default ProfileCard2;
