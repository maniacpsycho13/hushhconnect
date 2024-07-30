'use client'

import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { HushhCard1, HushhCard2, HushhCard3, HushhCard4, HushhCard5, HushhCard6, HushhCard7 } from '../../../public/hushhCards';
import { hushhprofile } from '../../../public/profile';
import Link from 'next/link';
import { UserWithExtras } from "@/lib/Validations/definitions";
import { FormError } from '../form/AuthForm/form-error';
import { FormSuccess } from '../form/AuthForm/form-success';
import { useRouter } from 'next/navigation';
import { templateUpdate } from '@/lib/Actions/user.action';

export const profileData = [
  { cardImage: HushhCard1 },
  { cardImage: HushhCard2 },
  { cardImage: HushhCard3 },
  { cardImage: HushhCard4 },
  { cardImage: HushhCard5 },
  { cardImage: HushhCard6 },
  { cardImage: HushhCard7 },
];

const Template = ({ id, user }: { id: string; user: UserWithExtras }) => {
  const [selectedCardImage, setSelectedCardImage] = useState<string | null>(null);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const handleCardClick = (cardImage: string) => {
    setSelectedCardImage(cardImage);
    console.log(selectedCardImage);
    
    // console.log(cardImage);
    
  };

  const onSubmit = () => {
    setError('');
    setSuccess('');
    startTransition(() => {
      console.log(selectedCardImage);
      
      templateUpdate(selectedCardImage, id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          router.push('/onboarding/social');
        }
      });
    });
  };

  return (
    <div className='mt-4'>
      {profileData.map((profile, index) => (
        <div
          key={index}
          className={`relative mb-8 ${selectedCardImage === index.toString() ? 'border-4 border-green-500 rounded-xl' : ''}`}
          onClick={() => handleCardClick(index.toString())}
        >
          <Image src={profile.cardImage} alt="card" className="w-full relative rounded-xl cursor-pointer" />
          <div className='absolute top-[16px] left-[16px] flex items-center gap-2'>
            <div>
              <Image src={user.image || hushhprofile} alt='profile' width={33} height={33} className='rounded-full' />
            </div>
            <div className='flex flex-col gap-[3.5rem]'>
              <div>
                <p className="text-white text-2xl font-normal">{user.name}</p>
                <p className="text-white text-[8.85px] font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="px-4 pt-[88px]">
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="h-14 py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
