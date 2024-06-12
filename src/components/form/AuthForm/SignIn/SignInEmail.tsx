'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Back, Star, closeeye, openeye } from '../../../../../public/login';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';

export default function SignInEmail() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const [type, setType] =React.useState ('password');
  const [icon,setIcon]= React.useState (closeeye);
  const [isLoading, setIsLoading] = React.useState(false);

  
  const handleToggle = () => {
    if (type === 'text') {
      setType('password');
      setIcon(closeeye);
    } else {
      setType('text');
      setIcon(openeye);
    }
  };

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/onboarding/username');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }finally{
      setIsLoading(false);
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div  className='px-6 pt-4'>
      <div className=''>
        <div className='flex justify-between '>
          <Image src={Back} alt='backicon'></Image>
          <Image src={Star} alt='star'></Image>
        </div>
      </div>

      <div className='text-[30px] font-bold text-black mt-[40px]'>Login in</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col w-full mt-[38px]'>
          <label htmlFor="email" className='text-black text-sm font-normal leading-[17.50px]'>Email address</label>
          <div className='mt-[6px] w-full'>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
              
              className='  px-4 h-14 bg-white w-full rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex '
            />
          </div>
        </div>
        <div className='mt-[22px] flex flex-col'>
          <label htmlFor="password" className='text-black text-sm font-normal leading-[17.50px]'>Enter password</label>
          <div className='mt-[6px] w-full h-14 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
            <div className='flex align-center justify-center w-full pr-4 h-14'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                value={password}
                className=' w-full border-none '
              />
              <div className=' flex items-center' onClick={handleToggle}><Image src={icon} alt='closeeye' className=''></Image></div>
            </div>
          </div>
        </div>
        <div className='mt-[22px] w-full'>
          <button 
            type="submit" 
            className={`h-14 w-full py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold leading-tight ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Sign in'}
          </button>
        </div>
      </form>
      <div className='flex items-center justify-between mt-[38px] '>
        <div className="w-[35%] h-[0px] border border-zinc-300"></div>
        <div className="text-black/opacity-70 text-sm font-normal  leading-[17.50px]">Or Login with</div>
        <div className="w-[35%] h-[0px] border border-zinc-300"></div>

      </div>

    </div>
  );
}