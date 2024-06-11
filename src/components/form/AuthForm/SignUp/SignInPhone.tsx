'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Back, Star } from '../../../../../public/login';

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded && !signUp) return null;

    try {
      // Start the sign-up process using the phone number method
      await signUp.create({
        phoneNumber: phone,
      });

      // Start the verification - a SMS message will be sent to the
      // number with a one-time code
      await signUp.preparePhoneNumberVerification();

      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    // setError('');

    if (!isLoaded && !signUp) return null;

    try {
      // Use the code provided by the user and attempt verification
      const signInAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/onboarding/username');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  if (verifying) {
    return (
      <div className='px-6 py-4'>
        <div className=''>
          <div className='flex justify-between '>
            <Image src={Back} alt='backicon'></Image>
            <Image src={Star} alt='star'></Image>
          </div>
       </div>
       <div className="text-center text-black text-3xl font-bold mt-[38px] leading-[39px]">Verify your phone number</div>

       <div className="mt-[13px] text-center"><span className="text-black/opacity-70 text-base font-normal  leading-tight">We’ve sent an SMS with an activation code to your phone </span><span className="text-black text-base font-normal leading-tight">+33 2 94 27 84 11</span></div>

        <form onSubmit={handleVerification}>
          {/* <label htmlFor="code">Enter your verification code</label> */}
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit" className=' h-14 w-full py-[17px] bg-gradient-to-r from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold  leading-tight mt-[34px]'>Verify</button>
        </form>
      </div>
    );
  }

  return (
    <div className='px-6 py-4'>
      <div className=''>
        <div className='flex justify-between '>
          <Image src={Back} alt='backicon'></Image>
          <Image src={Star} alt='star'></Image>
        </div>
       </div>
       <div className=" text-black text-3xl font-bold leading-[39px] mt-[56px]">Sign up</div>
        
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mt-[15px]'>
            <label htmlFor="phone" className='text-black text-sm font-normal leading-[17.50px]'>Enter phone number</label>
            <input
              value={phone}
              id="phone"
              name="phone"
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              className='e-full h-14 mt-[6px] px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex focus:none text-black/opacity-50 text-base font-normal  leading-tight'
            />
            <button type="submit" className=' h-14 w-full py-[17px] bg-gradient-to-r from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold  leading-tight mt-[38px]'>Login</button>

            <div className='mt-[46px] text-center'><span className="text-black/opacity-70 text-sm font-normal leading-[17.50px]">Already have an account? </span><span className="text-black text-sm font-semibold leading-[17.50px]">Log in</span></div>
          </div>
        </form>
        </div>
   
  );
}