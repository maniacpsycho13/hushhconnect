"use client"
import Image from 'next/image'
import React from 'react'
import { facebook, hushhprofile, instagram, linkedin, loginbg, twitter, youtube } from '../../../public/profilePage'
import Link from 'next/link'
import { UserDetails } from '@/app/(root)/profile/[id]/layout'
import vCard from 'vcf'

const ProfileLoginCard = (props: UserDetails) => {
    const platformIcons: any = {
        facebook,
        instagram,
        linkedin,
        twitter,
        youtube,
    };

    const saveContact = () => {
        const card = new vCard();

        card.set('fn', `${props.name} ${props.lastname}`);
        card.set('org', 'Hushh Connect');
        card.set('email', props.email || ''); 
        card.set('tel', "8959624876" || ''); 
        card.set('note', props.bio || '');

        const blob = new Blob([card.toString()], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${props.name}_${props.lastname}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='w-full h-full'>
            <div className="relative w-full flex justify-center items-center h-[271px]">
                <Image src={loginbg} alt="bg" className="w-full h-full object-cover absolute top-0 left-0" />
                <div className="absolute top-20 w-full text-center">
                    <div className="text-white text-xl font-semibold">Hushh Connect</div>
                </div>
                <div className="absolute top-32 w-full flex justify-center">
                    <Image src={props.profilePic || hushhprofile} alt="profile" width={108.645} height={108.645} className="w-40 h-40 rounded-full border-4 border-white" />
                </div>
            </div>

            <div className='px-6 mt-[1rem]'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-[18px] text-black font-[600] inline'>{props.name} {props.lastname}</h2>
                    <p className='text-[12px] font-[600] mx-auto bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]'>view hushh card</p>
                </div>
            </div>
            <div className='flex justify-evenly mt-[8px] px-4'>
                {props.socialmedia?.map((item: any) => (
                    <Link href={item.url} key={item.platform}><Image src={platformIcons[item.platform]} width={26} height={26} alt="Group1" /></Link>
                ))}
            </div>
            <div className="mt-[25px] px-4 text-center text-neutral-900 text-xs font-medium leading-[18.40px]">{props.bio}</div>

            <div className='flex px-6 gap-4 justify-center py-[17px]'>
                <div onClick={saveContact} className="w-[141px] h-10 px-4 bg-blue-600 rounded-[39px] justify-center items-center gap-2.5 inline-flex cursor-pointer">
                    <div className="text-white text-[15px] font-normal">Save Contact</div>
                </div>

                <div className="w-[141px] h-10 px-4 rounded-[39px] border border-neutral-400 justify-center items-center gap-2.5 inline-flex">
                    <div className="text-neutral-400 text-[15px] font-normal">Share</div>
                </div>
            </div>

            <div className='h-full flex justify-center items-center z-[500] bg-zinc-100 py-8'>
                <div className="w-[193px] h-10 px-4 bg-gradient-to-l from-rose-600 to-blue-700 rounded-[39px] shadow border-2 border-white justify-center items-center gap-2.5 inline-flex">
                    <Link href="/sign-in">
                        <div className="text-white text-[15px] font-normal font-['Figtree']">Login to see full profile</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileLoginCard;
