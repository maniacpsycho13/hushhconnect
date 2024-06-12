'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Back, Star, closeeye, openeye } from '../../../../../public/login';
import Link from 'next/link';

export default function Page() {
  // Clerk signup hook
  const { isLoaded, signUp, setActive } = useSignUp();
  // Local state variables
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const router = useRouter();

  // Password visibility states and toggling functions
  const [type, setType] = React.useState('password');
  const [icon, setIcon] = React.useState(closeeye);
  const [type2, setType2] = React.useState('password');
  const [icon2, setIcon2] = React.useState(closeeye);

  const handleToggle = () => {
    // Toggle password visibility
    if (type === 'text') {
      setType('password');
      setIcon(closeeye);
    } else {
      setType('text');
      setIcon(openeye);
    }
  };

  const handleToggle2 = () => {
    // Toggle confirm password visibility
    if (type2 === 'text') {
      setType2('password');
      setIcon2(closeeye);
    } else {
      setType2('text');
      setIcon2(openeye);
    }
  };

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className='px-6 py-4'>
        <div className=''>
        <div className='flex justify-between '>
          <Link href={'/sign-up'}><Image src={Back} alt='backicon'></Image></Link>
          <Image src={Star} alt='star'></Image>
        </div>
      </div>
      <div className=" mt-[40px] text-black text-3xl font-bold  leading-[39px]">Please check your email</div>
      <div className='flex gap-2 pt-[15px]'>
        <div className='text-black/opacity-70 text-base font-normal leading-tight'> We’ve sent a code to </div>
        <div className='text-black text-base font-medium leading-tight'>helloworld@gmail.com</div>
      </div>
        <div className='w-full mt-[75px]'>
          <form onSubmit={handleVerify}>
            <label id="code" className=''>Enter your verification code</label>
            <input
              value={code}
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              className='h-14 w-full px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal mt-1 leading-tight placeholder:opacity-50 focus:outline-none'
            />
            <div className='mt-[38px]'>
              <button type="submit" className=' h-14 w-full py-[17px] bg-gradient-to-r from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold  leading-tight mt-[38px]'>Verify</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className='px-6 py-4'>
      <div className=''>
        <div className='flex justify-between '>
        <Link href={'/sign-up'}><Image src={Back} alt='backicon'></Image></Link>
          <Image src={Star} alt='star'></Image>
        </div>
      </div>
      <div className="text-black text-3xl font-bold f leading-[39px] mt-[40px]">Sign up</div>
      <form onSubmit={handleSubmit}>
        <div className='mt-[38px] flex flex-col'>
          <label htmlFor="email" className='text-black text-sm font-normal leading-[17.50px]'>Enter email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder='email@gmail.com'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className='e-full h-14 mt-[6px] px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex focus:none text-black/opacity-50 text-base font-normal  leading-tight focus:outline-none'
          />
        </div>
        <div className='flex flex-col mt-[22px] w-full gap-[6px]'>
          <label htmlFor="password" className='text-black text-sm font-normal leading-[17.50px]'>Create a password</label>
          <div className=' w-full h-14 bg-white rounded-[10px] px-4 py-[18px]  border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
            <div className='flex align-center justify-center w-full h-full'>
              <input
              id="password"
              type={type}
              name="password"
              value={password}
              placeholder='must be 8 characters'
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none'
              />
              <div className=' flex items-center' onClick={handleToggle}><Image src={icon} alt='closeeye' className=''></Image></div>
            </div>
          </div>
          
        </div>
        <div className='flex flex-col mt-[22px] w-full gap-[6px]'>
          <label htmlFor="password" className='text-black text-sm font-normal leading-[17.50px]'>Confirm Password</label>
          <div className=' w-full h-14 bg-white rounded-[10px] px-4 py-[18px]  border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
            <div className='flex align-center justify-center w-full h-full'>
              <input
              id="confirmPassword"
              type={type2}
              name="confirmPassword"
              value={confirmPassword}
              placeholder='repeat password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none'
              />
              <div className=' flex items-center' onClick={handleToggle2}><Image src={icon2} alt='closeeye' className=''></Image></div>
            </div>
          </div>
          {passwordError && <div className="text-red-500 mt-1">{passwordError}</div>}
        </div>
        <div>
          <button type="submit" className=' h-14 w-full py-[17px] bg-gradient-to-r from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold  leading-tight mt-[38px]'>Next</button>
        </div>

        <div className='mt-[38px] text-center'><span className="text-black/opacity-70 text-sm font-normal leading-[17.50px]">Already have an account? </span>
        <Link href={'/sign-in'}><span className="text-black text-sm font-semibold  leading-[17.50px]">Log in</span></Link></div>
      </form>
    </div>
  );
}