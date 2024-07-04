import Image from 'next/image'
import React from 'react'
import { backicon, hushhprofile } from '../../../public/profilePage'
import { Coin, P1, P10, P2, P3, P4, P5, P7, P8, P9, crown } from '../../../public/coins'
import Link from 'next/link'

const Leaderboard = () => {
  return (
    <div className='bg-zinc-100  pt-4 h-screen'>
        <div className='px-6'>
            <Link href={'/home/thread'}><Image src={backicon} alt='icon'></Image></Link>
        </div>
        <div className='flex justify-center px-6'>
            <div className="text-center  text-base font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] w-[35%] leading-[23.04px]">Leaderboard</div>
        </div>

        <div>
            <div className='flex justify-between px-6'>
                <div className='mt-[60px] flex flex-col items-center'>
                    <Image src={P2} alt='profile' className='w-[71.04px] relative h-[71.04px] rounded-full border-2 border-black/opacity-25'></Image>
                    <div className='text-center text-white text-base font-bold  leading-[23.04px] w-[26.88px] h-[26.88px] bg-black rounded-full absolute  top-[11.2rem] '>2</div>
                   <div className='flex flex-col items-center'>
                    <div className=" text-center text-black text-sm font-bold mt-3 leading-tight">Meghan Jes...</div>
                        <div className="flex items-center">
                            <div>
                                <Image src={Coin} alt='coin' className='w-[14.25px] h-[14.25px]'></Image>
                            </div>
                            <div className="text-black text-sm font-semibold">150</div>
                        </div>
                   </div>
                </div>

                <div className='mt-[32.68px] flex flex-col items-center'>
                    
                        <Image src={crown} alt='crown' className='absolute top-[4.5rem] '></Image>
                   
                    <Image src={P1} alt='profile' className='w-[80.64px] h-[80.64px] rounded-full border-2 border-rose-500'></Image>
                    <div className='text-center text-white text-base font-bold  leading-[23.04px] w-[26.88px] h-[26.88px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-full absolute  top-[10.1rem] '>1</div>
                    <div className='flex flex-col items-center'>
                        
                        <div className="mt-3 text-center text-black text-sm font-bold  leading-tight">Bryan Wolf</div>
                        <div className="flex items-center">
                            <div>
                                <Image src={Coin} alt='coin' className='w-[14.25px] h-[14.25px]'></Image>
                            </div>
                            <div className="text-black text-sm font-semibold">200</div>
                        </div>
                    </div>
                </div>

                <div className='mt-[60px] flex flex-col items-center'>
                    <Image src={P3} alt='profile' className='w-[71.04px] relative h-[71.04px] rounded-full border-2 border-black/opacity-25'></Image>
                    <div className='text-center text-white text-base font-bold  leading-[23.04px] w-[26.88px] h-[26.88px] bg-black rounded-full absolute  top-[11.2rem] '>3</div>
                   <div className='flex flex-col items-center'>
                    <div className=" text-center text-black text-sm font-bold mt-3 leading-tight">Meghan Jes...</div>
                        <div className="flex items-center">
                            <div>
                                <Image src={Coin} alt='coin' className='w-[14.25px] h-[14.25px]'></Image>
                            </div>
                            <div className="text-black text-sm font-semibold">120</div>
                        </div>
                   </div>
                </div>

                
            </div>
        </div>

        <div className='bg-lime-50 rounded-tl-[30.72px] rounded-tr-[30.72px] pt-[23px] mt-[30px] px-6 h-full flex flex-col gap-[8px]'>
            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>4</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P4} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Marsha Fisher</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">68</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>5</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P5} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Juanita Cormier</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">62</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>6</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P4} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Alex Turner</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">54</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>7</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P7} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Tamara Schmidt</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">44</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>8</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P8} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Ricardo Veum</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">40</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>9</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P9} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Gary Sanford</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">33</div>
                </div>
            </div>

            <div className=" bg-white rounded-xl px-4 py-[8px] flex justify-between"> 
                <div className='gap-[11px] flex items-center'>
                    <p>10</p>
                    <div className='flex items-center gap-[12px]'>
                        <div>
                            <Image src={P10} alt='profile' className='h-[30.72px] w-[30.72px]'></Image>
                        </div>
                        <div className="text-neutral-900 text-sm font-medium  leading-tight">Becky Bartell</div>
                    </div>
                </div>

                <div className='flex items-center gap-[4px]'>
                    <div>
                        <Image src={Coin} alt='coin ' className='w-[14.25px] h-[14.25px]'></Image>
                    </div>
                    <div className="text-black text-sm font-semibold ">24</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Leaderboard