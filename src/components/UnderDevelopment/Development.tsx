import Image from 'next/image'
import React from 'react'
import { underConstruction } from '../../../public/community'

const Development = () => {
  return (
    <div>
        <div className='text-center text-base font-semibold  '>
          This Page is under Construction
        </div>
       <div className='flex justify-center mt-6'>
        <Image src={underConstruction} alt='construct'height={100} width={100} className='w-[60%]' ></Image>
       </div>
    </div>
  )
}

export default Development