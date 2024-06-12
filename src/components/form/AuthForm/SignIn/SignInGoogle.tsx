'use client';

import * as React from 'react';
import { OAuthStrategy } from '@clerk/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { apple, google, phone } from '../../../../../public/login';
import Link from 'next/link';

export default function OauthSignIn() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/onboarding/username',
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code ===
        'external_account_exists';

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith(strategy);
    }
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <div className='px-6'>
      <div  className="grid grid-cols-2 gap-x-4 ">
        
          <button onClick={() => handleSignIn('oauth_google')} className='h-14 px-[45px] py-[18px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'>
            <Image src={google} alt='google'></Image>
          </button>
       
          <button onClick={() => handleSignIn('oauth_apple')} className='h-14 px-[45px] py-[18px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'>
            <Image src={apple} alt='apple'></Image>
          </button>
        
      </div>
      <button className='h-14 mt-[22px] w-full py-[17px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'>
      <div className='flex gap-[15px]  '>
          <Image src={phone} alt='apple'></Image>
          <div className="text-black text-base font-semibold  leading-tight">Continue with Phone</div>
      </div>
      </button>


      <div className='mt-[43px] flex justify-center'>
                    
        <div className='text-[14px] font-[400]'>Don&apos;t have an account ? <Link href={'/sign-up'}><span className='text-[14px] font-semibold mx-[2px]'>Sign up</span></Link></div>
                    
      </div>
    </div>
  );
}