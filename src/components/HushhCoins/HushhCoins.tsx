"use client"
import Image from 'next/image'
import React, { useRef } from 'react'

import { Coin, gift, medal, whitebackicon, copyicon, referal } from '../../../public/coins'
import { hushhprofile } from '../../../public/profile'

const HushhCoins = () => {
  const inputRef = useRef(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className='h-screen w-screen'>
      <div className='bg-gradient-to-l from-rose-600 to-blue-700 pt-4 px-6 pb-[21px]'>
        <Image src={whitebackicon} alt='back' />

        <div className=''>
          <div className="text-white text-base text-center font-semibold leading-tight">Hushh Coins</div>
        </div>
        <div className='flex justify-center gap-[4px] mt-[10px]'>
          <Image src={Coin} alt='back' />
          <div className="text-white text-[53.76px] font-semibold leading-[53.76px]">2956</div>
          <div className="text-white text-[9.60px] font-normal leading-[14.40px] mt-[31px]">Earned</div>
        </div>

        <div className='flex gap-4 mt-[35px] justify-center'>
          <div className='px-4 flex h-[38.40px] bg-violet-50/20 rounded-[48px] items-center gap-[8px]'>
            <Image src={medal} alt='medal' className='opacity-100' />
            <div className="text-white text-xs font-semibold uppercase leading-[14.40px]">24 referrals</div>
          </div>
          <div className='px-4 flex h-[38.40px] bg-violet-50/20 rounded-[48px] items-center gap-[8px]'>
            <Image src={gift} alt='medal' className='opacity-100' />
            <div className="text-white text-xs font-semibold uppercase leading-[14.40px]">leaderboard</div>
          </div>
        </div>
      </div>

      <div className='px-6 pt-[21px] w-full bg-zinc-100 pb-32'>
        <div className="w-full flex justify-center h-[46.08px] bg-white opacity-95 rounded-[5px] shadow px-[12px]" >
          <input
            type="text"
            ref={inputRef}
            className='h-full w-full bg-white opacity-95'
            placeholder='https://hushh.com/ref/23523525'
            
          />
          <button onClick={handleCopy}>
            <Image src={copyicon} alt='copy' />
          </button>
        </div>

        <div className='mt-[12px]'>
            <div className="w-full py-[12px] flex justify-center items-center bg-gradient-to-l from-rose-600 to-blue-700 rounded-[5px] text-white text-sm font-semibold leading-[21px]">
                Refer friends now
            </div>
        </div>

        <div className='mt-[24px]'>
            <div className='flex justify-between items-center'>
                <div>
                    <div className="text-black text-sm font-semibold  leading-[21px]">Referral History</div>
                    <div className="text-zinc-400 text-xs font-normal  leading-[18px]">2 Referrals</div>
                </div>
                <div className=" text-black text-sm font-semibold  leading-[21px]">View all</div>
            </div>

        </div>

        <div className='mt-[23px] w-full'>
            <div className=' px-3 py-[12px] bg-white rounded-xl justify-between items-center inline-flex w-full'>
                <div className='flex gap-[11.52px] items-center'>
                    <Image src={hushhprofile} alt='profile' className='w-[40.72px] h-[40.72px] rounded-full'></Image>
                    <div className='flex flex-col'>
                        <div className="text-neutral-900 text-sm font-medium  leading-[21px]">Marsha Fisher</div>
                        <div className="text-neutral-900 text-[10px] font-medium font-['Figtree'] leading-[15px]">marshafisher@gmail.com</div>
                    </div>
                </div>
                <div className=" text-right text-fuchsia-800 text-xs font-normal  leading-[18px]">Joined 8th Aug 2021</div>
            </div>
        </div>
        <div className='mt-[24px]'>
            <Image src={referal} alt='referal'></Image>
        </div>
      </div>
    </div>
  )
}

export default HushhCoins
