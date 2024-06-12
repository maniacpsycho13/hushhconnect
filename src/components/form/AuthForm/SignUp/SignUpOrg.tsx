'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Mail, hushhS } from '../../../../../public/signup';
import { apple, google, phone } from '../../../../../public/login';

export default function SignUpPage() {
  return (
    <div className="">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full ">
                  <div className='px-[10px] py-4'>
                    <div className=' relative bg-gradient-to-b from-rose-600 to-purple-500 rounded-[32px]'>
                      <div className='flex justify-center pt-[46px]'>
                        <Image src={hushhS} alt='logo'></Image>
                      </div>
                      <div className="text-white text-3xl font-bold text-center leading-[39px] mt-[20.6px]">hushh App</div>
                      <div className="mt-[9px] text-center text-white opacity-70 text-base font-normal leading-tight">Unlock the power of your data</div>
                    <CardHeader>
                      {/* <CardTitle>Create your account</CardTitle> */}
                      {/* <CardDescription>Welcome! Please fill in the details to get started.</CardDescription> */}
                    </CardHeader>
                    <CardContent className="mt-[32px]">
                      <div className="flex flex-col px-[10px] ">
                      <Clerk.Connection name="google" asChild>
                          <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className=' h-[54px] px-[19px]  bg-white rounded-[28px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <div className='flex text-black text-base font-semibold items-center gap-[14px] leading-tight'>
                                    {/* <Icons.apple className="" /> */}
                                    <Image src={google} alt='apple'></Image>
                                    Continue with Google
                                  </div>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                        <Clerk.Connection name="apple" asChild >
                          
                          <Button  variant="outline" type="button" disabled={isGlobalLoading} className=' h-[54px] px-[19px]  bg-white rounded-[28px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex mt-[14px]'>
                            <Clerk.Loading scope="provider:apple">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <div className='flex text-black text-base font-semibold items-center gap-[14px] leading-tight'>
                                    {/* <Icons.apple className="" /> */}
                                    <Image src={apple} alt='apple'></Image>
                                    Continue with Apple
                                  </div>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                         
                        </Clerk.Connection>
                        
                      </div>
                      {/* <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        or
                      </p> */}

                      <div className='flex flex-col px-[10px] pb-[17px]'>
                      <Link href={'sign-up/email'} className='h-[54px] px-[19px]  bg-white rounded-[28px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex mt-[14px]'>
                        <div className='flex text-black text-base font-semibold items-center gap-[14px] leading-tight'>
                          <Image src={Mail} alt='apple'></Image>
                          <div>Continue With Email</div>
                        </div>
                      </Link>

                      <Link href={'sign-up/phone'} className='h-[54px] px-[19px]  bg-white rounded-[28px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex mt-[14px]'>
                        <div className='flex text-black text-base font-semibold items-center gap-[14px] leading-tight'>
                        <Image src={phone} alt='apple'></Image>
                        <div>Continue With Phone</div>
                        </div>
                      </Link>
                      </div>
                      
                    </CardContent>

                    </div>

                    <div className='mt-[33px] text-center'>
                      <span className="text-black opacity-70 text-sm font-normal leading-[17.50px]">Already have an account?</span><span className="text-black text-sm font-normal  leading-[17.50px]"> </span>
                      <Link href={'sign-in'}><span className="text-black text-sm font-semibold  underline leading-[17.50px]">Log in</span></Link>
                    </div>
                  </div>
                </Card>
              </SignUp.Step>

             

              
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}