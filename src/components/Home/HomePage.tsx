'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homepage } from '../../../public/profilePage';

export default function HomePage() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get('referralCode');
    setReferralCode(referralCode);
    localStorage.setItem('referralCode', referralCode || '');    
    console.log(referralCode);
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="w-full">
          <Image src={homepage} alt="loader" className="w-full" />
        </div>

        <h2 className="text-gray-900 text-2xl font-bold mt-16 text-center">Welcome to Hushh Connect</h2>
        <p className="text-center text-neutral-500 font-normal font-['Figtree'] leading-tight mt-2 w-3/4">Here’s a good place for a brief overview of the app or it’s key features.</p>
        <Image src="smallloader.svg" alt="loader" width={359} height={24} className="mt-6" />
        <div className="h-full flex items-end w-full mb-16">
          <Link href={`/sign-up`}  className="w-full px-4 mt-16">
            <button className="w-full bg-gradient-to-l from-rose-600 to-blue-700 rounded-[14px] text-white text-base font-semibold font-['Figtree'] min-h-14">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}
