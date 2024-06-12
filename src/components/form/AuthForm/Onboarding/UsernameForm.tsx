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
import { UsernameValidation } from "@/lib/Validations/UserValidation"
import { Lock, backicon } from "../../../../../public/profilePage"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"
import { usernameupdate } from "@/lib/Actions/user.action"
import Link from "next/link"

export function UsernameForm({id}:{id:string}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname=usePathname();
  //const token=searchParams.get('token');
  const [error , setError] = useState<string | undefined>('')
  const [success , setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  // ...
  const form=useForm<z.infer<typeof UsernameValidation>>({
    resolver: zodResolver(UsernameValidation), 
    defaultValues: {
      username: "",
    }
  })

  const onSubmit = (values: z.infer<typeof UsernameValidation>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      usernameupdate(values,id,pathname).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
        if(data?.success){
            router.push('/onboarding/basicdetails');
        }
      })
    })
    
    console.log(values)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <div className='bg-white px-4 pt-4'>
          <div >
            <Link href={''}><Image src={backicon} alt="backicon" ></Image></Link>
          </div>

          <div className='mt-[28px]'>
            <Image src={Lock} alt="lock" ></Image>

            <div className="text-gray-900 text-xl font-bold mt-[10px]">Get your personalized username</div>
          </div>

         
        </div>
        
        <div className="px-4 pt-[24px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input placeholder="Username" type="text" {...field} disabled={isPending} className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          <div className='w-[40%] mt-4 ml-4'>
                <p className='text-[14px] font-[400] mx-auto bg-clip-text text-transparent bg-gradient-to-l from-[#E0055F] to-[#2020ED]'>usename available</p>
              </div>
          </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="px-4 pt-[88px]">
          <Button type="submit" disabled={isPending} className=" h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight">Continue</Button>
        </div>
      </form>
    </Form>
  )
}
