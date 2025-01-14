"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { set, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"


// import { usernameupdate } from "@/actions/user.action"
import Image from "next/image"
import { SocialMediaValidation, SocialValidation } from "@/lib/Validations/UserValidation"
import { Lock, backicon } from "../../../../public/profilePage"
import { url } from "inspector"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { socialupdate } from "@/lib/Actions/user.action"
import { Insta, TemplateButton, linkedin, twitter, urlImage, youtube } from "../../../../public/Social"
import Link from "next/link"
import { arrowleft } from "../../../../public/signup"

export function SocialForm({id ,isEditing}:{id:string ,isEditing:boolean}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname=usePathname();
  //const token=searchParams.get('token');
  const [error , setError] = useState<string | undefined>('')
  const [success , setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  // ...
  




  const form=useForm<z.infer<typeof SocialValidation>>({
    resolver: zodResolver(SocialValidation), 
    defaultValues: {
      instagram: "https://www.instagram.com/",
      twitter: "https://x.com/",
      facebook: "https://facebook.com/",
      linkedin: "https://www.linkedin.com/",
      youtube: "https://www.youtube.com/",
    }
  })
  const onSubmit = (values: z.infer<typeof SocialValidation>) => {
    
    
    setError('');
    setSuccess('');
    startTransition(() => {
      socialupdate(values,id,pathname).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
        if(data?.success){
          if(isEditing)router.push('/profile/'+id+'/threads');
          else router.push('/onboarding/profilepic');
        }
      })
    })
    
    console.log(values)
    
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <div className='bg-white '>
          {/* <div className="flex justify-between">
            <Link href={'thanks'}><Image src={backicon} alt="backicon" ></Image></Link>
            <Link href={'profilepic'}><p className="text-center text-gray-900 text-[15px] font-medium">Skip</p></Link>
          </div> */}

        <div className="flex justify-between">
           <Link href={'template'}>
              <div className=" px-2.5 py-[3px] bg-white rounded-[51px] border border-neutral-200 justify-start items-center gap-1 inline-flex">
            <Image src={arrowleft} alt="back"></Image>
            <div className="text-black text-[13px] font-normal leading-snug">Template</div>
          </div>
        </Link>

        <div className="">
          <button type="submit" disabled={isPending} className="text-center text-gray-900 text-[15px] font-medium">Skip</button>
        </div>
      
      </div>

          <div className="text-center text-gray-900 text-xl font-bold mt-3 ">Let &apos;s make it yours</div>
          <div className=" mt-[8px] text-center text-neutral-500 text-sm font-normal  leading-tight">Add your own content below. You can also further customize your links and appearance later.</div>

          <div className="text-center text-gray-900 text-[15px] font-semibold mt-[31px] leading-tight">Replace with your content</div>
         
        </div>
        
        <div className="w-full pt-4 flex flex-col gap-[9px]">
        <div className="h-[50px] px-4 bg-zinc-100 rounded-[14px] justify-start items-center  inline-flex w-full gap-2">
          <Image src={Insta} alt="instagram"></Image>
            <div className="w-full">
              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <Input 
                      placeholder="instagram.com/" 
                      type="text" 
                      {...field}
                       disabled={isPending}
                        className="w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none text-zinc-400 text-sm font-normal " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            </div>
        </div> 

          <div className="h-[50px] px-4 bg-zinc-100 rounded-[14px] justify-start items-center  inline-flex w-full gap-2">
            <Image src={twitter} alt="instagram"></Image>
            <div className="w-full">
              <FormField
              control={form.control}
              name='twitter'
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input placeholder="x.com/" type="text" {...field} disabled={isPending} className="w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none text-zinc-400 text-sm font-normal " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />  
            </div>
          </div>

          <div className="h-[50px] px-4 bg-zinc-100 rounded-[14px] justify-start items-center  inline-flex w-full gap-2">
          <Image src={youtube} alt="instagram"></Image>
            <div className="w-full">
              <FormField
              control={form.control}
              name='youtube'
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input placeholder="youtube.com/" type="text" {...field} disabled={isPending} className="w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none text-zinc-400 text-sm font-normal" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            </div>
          </div>
          <div className="h-[50px] px-4 bg-zinc-100 rounded-[14px] justify-start items-center  inline-flex w-full gap-2">
          <Image src={linkedin} alt="instagram"></Image>
            <div className="w-full">
              <FormField
              control={form.control}
              name='linkedin'
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input placeholder="linkedin.com/" type="text" {...field} disabled={isPending} className="w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none text-zinc-400 text-sm font-normal" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />  
            </div>
          </div>

          </div>

          <div className="text-center text-gray-900 text-[15px] font-semibold mt-[47px] leading-tight">Add any other links</div>

          <div className="h-[50px] px-4 bg-zinc-100 rounded-[14px] justify-start items-center  inline-flex w-full mt-4 gap-2">
            <Image src={urlImage} alt="instagram"></Image>
              <div className="w-full">
                <FormField
                control={form.control}
                name='facebook'
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <Input placeholder="URL" type="text" {...field} disabled={isPending} className="w-full border-none h-full focus:border-none focus-visible:border-none shadow-none focus:outline-none text-zinc-400 text-sm font-normal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                /> 
              </div>
          </div> 
          {/* <div className='w-[40%] mt-4 ml-4'>
                <p className='text-[14px] font-[400] mx-auto bg-clip-text text-transparent bg-gradient-to-l from-[#E0055F] to-[#2020ED]'>usename available</p>
              </div>
          </div> */}
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="pt-[50px]">
          <Button type="submit" disabled={isPending} className=" h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight">Next</Button>
        </div>
      </form>
    </Form>
  )
}
