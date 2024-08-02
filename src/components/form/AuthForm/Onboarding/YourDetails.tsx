"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Back, Star } from '../../../../../public/login';
import Link from 'next/link';
import { arrowleft } from '../../../../../public/signup';

const YourDetails = () => {
    const items = ['Business', 'Influencer & Digital Creator', 'Personal', 'Education', 'Entertainment', 'Fashion and Beauty', 'Food & Beverage', 'Government & politics', 'Health & fitness', 'Non-Profit', 'Tech', 'Travel','Fashion & beauty', 'Crafts', 'Designer', 'Model', 'Visual arts', 'Writer', 'Lifestyle','Gymnastics','House parties','Gymnastics','Hockey','Home workouts','Language exchange','Films','Spotify','Theater','Walking','Running','Travel','Gym','Cricket','Social Media','SkinCare','Hip hop',];

    

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedItems2, setSelectedItems2] = useState<number[]>([]);

    const handleItemClick = (index: number, category: string) => {
        if (category === 'items') {
            if (selectedItems.includes(index)) {
                setSelectedItems(selectedItems.filter(item => item !== index));
            } else if (selectedItems.length < 5) {
                setSelectedItems([...selectedItems, index]);
            }
        } else {
            if (selectedItems2.includes(index)) {
                setSelectedItems2(selectedItems2.filter(item => item !== index));
            } else if (selectedItems2.length < 3) {
                setSelectedItems2([...selectedItems2, index]);
            }
        }
    };

    return (
        <div className='bg-[#21262E] pt-4 h-screen overflow-y-auto'>
            <div className="flex pt-4">
                <div className="bg-gradient-to-l from-rose-500 to-purple-500 h-[10px] w-[25%]"></div>
                <div className="h-[10px bg-white/20 w-[90%]"></div>
            </div>
            <div className='px-6 mt-4'>
            <div className="flex justify-between">
                <Link href={'basicdetails'}>
                    <div className=" px-2.5 py-[3px] bg-white rounded-[51px] border border-neutral-200 justify-start items-center gap-1 inline-flex">
                        <Image src={arrowleft} alt="back"></Image>
                        <div className="text-[#939BA7] text-[13px] font-normal leading-snug">Basic details</div>
                    </div>
                </Link>

                <Link href={'thanks'}  className="text-center text-gray-900 text-[15px] font-medium ">Skip</Link>
      
            </div>
                <div className='mt-4'>
                    <div className="text-[#E9EBEE] text-[1.75rem] font-bold text-center">Passions</div>
                    <div className="text-center text-[#939BA7] text-[1.06rem] font-normal mt-[8px] leading-tight">Let everyone know what you’re passionate
                    about, by adding it to your profile.</div>
                </div>
            </div>
            <div className='flex flex-wrap gap-[8px] px-[16px] mt-4'>
                {items.map((item, index) => (
                    <button
                        key={index}
                        id={`button-${index}`}
                        className={`px-2.5 py-[3px] ${selectedItems.includes(index) ? 'bg-gradient-to-l from-rose-500 to-purple-500 text-white' : 'bg-[#3c444f]'} rounded-[51px] border border-[#939ba7] ${selectedItems.includes(index) ? 'text-white' : 'text-[#939ba7]'} text-[13px] font-normal leading-snug`}
                        onClick={() => handleItemClick(index, 'items')}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {/* <div className='px-[16px]'>
                <div className="mt-[33px] text-center text-gray-900 text-[15px] font-semibold leading-tight">Pick up to 3 Influencer & Digital Creator categories (optional)</div>
                <div className='flex flex-wrap gap-[8px] mt-4'>
                    {items2.map((item, index) => (
                        <button
                            key={index}
                            id={`button-${index}`}
                            className={`px-2.5 py-[3px] ${selectedItems2.includes(index) ? 'bg-black text-white' : 'bg-white'} rounded-[51px] border border-neutral-200 ${selectedItems2.includes(index) ? 'text-white' : 'text-black'} text-[13px] font-normal leading-snug`}
                            onClick={() => handleItemClick(index, 'items2')}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div> */}
            <div className='w-full px-4 mt-8 py-4'>
                <Link href={'thanks'}><div className='h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[1.375rem] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight'>
                    Continue
                </div></Link>
            </div>

          

        </div>
    );
};

export default YourDetails;
