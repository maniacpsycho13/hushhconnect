"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Back, Star } from '../../../../../public/login';
import Link from 'next/link';
import { arrowleft } from '../../../../../public/signup';

const YourDetails = () => {
    const items = ['Business', 'Influencer & Digital Creator', 'Personal', 'Education', 'Entertainment', 'Fashion and Beauty', 'Food & Beverage', 'Government & politics', 'Health & fitness', 'Non-Profit', 'Other', 'Tech', 'Travel'];

    const items2 = ['Fashion & beauty', 'Crafts', 'Designer', 'Model', 'Visual arts', 'Writer', 'Lifestyle', 'Other'];

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedItems2, setSelectedItems2] = useState<number[]>([]);

    const handleItemClick = (index: number, category: string) => {
        if (category === 'items') {
            if (selectedItems.includes(index)) {
                setSelectedItems(selectedItems.filter(item => item !== index));
            } else if (selectedItems.length < 3) {
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
        <div>
            <div className='px-6 py-4'>
            <div className="flex justify-between">
                <Link href={'basicdetails'}>
                    <div className=" px-2.5 py-[3px] bg-white rounded-[51px] border border-neutral-200 justify-start items-center gap-1 inline-flex">
                        <Image src={arrowleft} alt="back"></Image>
                        <div className="text-black text-[13px] font-normal leading-snug">Basic details</div>
                    </div>
                </Link>

                <Link href={'thanks'}  className="text-center text-gray-900 text-[15px] font-medium ">Skip</Link>
      
            </div>
                <div className='mt-4'>
                    <div className="text-gray-900 text-xl font-bold text-center">Tell us about yourself</div>
                    <div className="text-center text-neutral-500 text-[15px] font-normal mt-[8px] leading-tight">This will personalize your hushh connect experience.</div>
                </div>
                <div className='mt-[33px]'>
                    <div className="text-center text-gray-900 text-[15px] font-semibold leading-tight">Select up to 3 categories that fit you</div>
                </div>
            </div>
            <div className='flex flex-wrap gap-[8px] px-[16px]'>
                {items.map((item, index) => (
                    <button
                        key={index}
                        id={`button-${index}`}
                        className={`px-2.5 py-[3px] ${selectedItems.includes(index) ? 'bg-gradient-to-l from-rose-500 to-purple-500 text-white' : 'bg-white'} rounded-[51px] border border-neutral-200 ${selectedItems.includes(index) ? 'text-white' : 'text-black'} text-[13px] font-normal leading-snug`}
                        onClick={() => handleItemClick(index, 'items')}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className='px-[16px]'>
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
            </div>
            <div className='w-full px-4 mt-8 py-4'>
                <Link href={'thanks'}><div className='w-full h-[54px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[14px] flex justify-center items-center gap-2.5 text-white text-base font-semibold'>
                    Continue
                </div></Link>
            </div>

          

        </div>
    );
};

export default YourDetails;
