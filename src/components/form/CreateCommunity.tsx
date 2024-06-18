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


import Link from "next/link"
import { FormError } from "./AuthForm/form-error"
import { FormSuccess } from "./AuthForm/form-success"
import { Lock, backicon } from "../../../public/profilePage"
import { CreateCommunity } from "@/lib/Validations/CommunityVal"
import { createCommunity } from "@/lib/Actions/community.action"

export function CreateComm({id}:{id:string}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname=usePathname();
  //const token=searchParams.get('token');
  const [error , setError] = useState<string | undefined>('')
  const [success , setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  // ...
  const form=useForm<z.infer<typeof CreateCommunity>>({
    resolver: zodResolver(CreateCommunity), 
    defaultValues: {
      name: "",
      description: "",
    }
  })

  const onSubmit = (values: z.infer<typeof CreateCommunity>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      createCommunity(values,id).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);  
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

            <div className="text-gray-900 text-xl font-bold mt-[10px]">Create Community</div>
          </div>

         
        </div>
        
        <div className="px-4 pt-[24px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input placeholder="Name of Community" type="text" {...field} disabled={isPending} className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} disabled={isPending} className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          
          </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="px-4 pt-[88px]">
          <Button type="submit" disabled={isPending} className=" h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight">Create</Button>
        </div>
      </form>
    </Form>
  )
}
