'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Back, Star, apple, closeeye, eye, google, openeye, phone } from '../../../../../public/login';
import { useState } from 'react';

export default function SignInPage() {


  const [type, setType] = useState ('password');
  const [icon,setIcon]= useState (closeeye);

  
  const handleToggle = () => {
    if (type === 'text') {
      setType('password');
      setIcon(closeeye);
    } else {
      setType('text');
      setIcon(openeye);
    }
  };

  return (
    <div className="w-full h-full px-6 py-4">
      
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Card className="">
                  <CardHeader>
                    <div className=''>
                      <div className='flex justify-between '>
                        <Image src={Back} alt='backicon'></Image>
                        <Image src={Star} alt='star'></Image>
                      </div>
                    </div>
                    {/* <CardTitle>Sign in to Acme Co</CardTitle>
                    <CardDescription>Welcome back! Please sign in to continue</CardDescription> */}
                    <div className='text-[30px] font-bold text-black mt-[40px]'>Login in</div>
                  </CardHeader>
                  <CardContent className=" w-full">
                    
                    {/* <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                      or
                    </p> */}
                    <Clerk.Field name="identifier" className="mt-[38px]">
                      <Clerk.Label asChild>
                        <Label className='text-black text-sm font-normal leading-[17.50px]'>Email address</Label>
                      </Clerk.Label>
                      <div className='mt-[6px] flex '>
                      <Clerk.Input type="email" required asChild className='px-4 py-[24px] bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
                        <Input />
                      </Clerk.Input>
                      </div>
                      <div className='flex flex-col w-full '>
                      <Clerk.Label asChild>
                        <Label className='mt-[22px] text-black text-sm font-normal leading-[17.50px]'>Password</Label>
                      </Clerk.Label>
                     <div className='mt-[22px] w-full h-12 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex'>
                     
                      <div className='flex align-center justify-center w-full pr-4 h-full'>
                      <Clerk.Input type={type} required asChild className=' w-full border-none h-full'>
                        <Input />
                      </Clerk.Input>
                      <div className=' flex items-center' onClick={handleToggle}><Image src={icon} alt='closeeye' className=''></Image></div>
                      
                      </div>
                     </div>
                      </div>
                      <div className="grid w-full mt-[38px]">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading} className='h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold  leading-tight'>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Log in';
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <div className='flex items-center justify-between mt-[38px] '>
                        <div className="w-[35%] h-[0px] border border-zinc-300"></div>
                        <div className="text-black/opacity-70 text-sm font-normal  leading-[17.50px]">Or Login with</div>
                        <div className="w-[35%] h-[0px] border border-zinc-300"></div>

                      </div>

                      
                    </div>
                      <div className="grid grid-cols-2 gap-x-4 mt-[22px]">
                      <Clerk.Connection name="github" asChild>
                        <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className='h-14 px-[45px] py-[18px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'>
                          <Clerk.Loading scope="provider:apple">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Image src={apple} alt='apple'></Image>
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className='h-14 px-[45px] py-[18px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Image src={google} alt='apple'></Image>
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    
                    <div className='w-full mt-[22px]'>
                    <Clerk.Connection name="google" asChild>
                        <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className='h-14 w-full py-[17px] bg-white rounded-[10px] border border-zinc-300 flex-col justify-center items-center gap-2.5 inline-flex'
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <div className='flex gap-[15px] '>
                                  <Image src={phone} alt='apple'></Image>
                                  <div className="text-black text-base font-semibold  leading-tight">Continue with Phone</div>
                                </div>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                    </Clerk.Connection>
                    </div>
                    <div className='mt-[43px] flex justify-center'>
                      <Button variant="link"  asChild >
                        <Link href="/sign-up" className='text-[14px] font-[400]'>Don&apos;t have an account ? <span className='text-[14px] font-semibold mx-[2px]'>Sign up</span></Link>
                      </Button> 
                    </div>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Use another method</CardTitle>
                    <CardDescription>Facing issues? You can use any of these methods to sign in.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button type="button" variant="link" disabled={isGlobalLoading}>
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button type="button" variant="link" disabled={isGlobalLoading}>
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Go back';
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="w-full ">
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>Enter the verification code sent to your email</CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue';
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button type="button" size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="w-full ">
                    <CardHeader>
                    <div className='flex justify-between '>
                        <Image src={Back} alt='backicon'></Image>
                        <Image src={Star} alt='star'></Image>
                      </div>
                      <CardTitle><div className=" text-black text-3xl font-bold mt-[40px] leading-[39px]">Please check your email</div></CardTitle>
                      {/* <CardDescription>Enter the verification code sent to your email</CardDescription> */}
                      <p className=" text-muted-foreground text-center">
                        <span className='text-black/opacity-70 text-base font-normal leading-tight'>We’ve sent a code to</span> 
                        <div className='text-black text-base font-medium  leading-tight'><SignIn.SafeIdentifier /></div>
                      </p>
                    </CardHeader>
                    <div className='mt-[75px]'>
                    <CardContent className="grid ">
                      <Clerk.Field name="email_code">
                        {/* <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label> */}
                        <div className="griditems-center justify-center">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="p-6 rounded-[15px] border border-zinc-300"
                                  >
                                    {value}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-destructive text-center" />
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    </div>
                    <CardFooter>
                      <div className="grid w-full mt-[38px]">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading} className='h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-semibold leading-tight'>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Verify';
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        {/* <SignIn.Action navigate="choose-strategy" asChild>
                          <Button size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action> */}
                      </div>

                      
                    </CardFooter>

                    <div className='text-center mt-[38px]'>
                          <SignIn.Action
                            asChild
                            resend
                            className=""
                            fallback={({ resendableAfter }) => (
                              <Button variant="link"  disabled >
                               <div className="text-black text-base font-semibold  leading-tight ">Send code again</div>
                                <span className="text-black text-base font-normal  leading-tight ml-[3px]">
                                  00:{resendableAfter}
                                </span>
                                
                              </Button>
                            )}
                          >
                            <Button variant="link" >
                            <div className="text-black text-base font-semibold  leading-tight text-center">Didn&apos;t recieve a code? Resend</div>
                              
                            </Button>
                          </SignIn.Action>
                          </div>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}