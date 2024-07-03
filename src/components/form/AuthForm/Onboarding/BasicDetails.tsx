"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { date, set, z } from "zod"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"


import Image from "next/image"
import { BasicDetailsValidation } from "@/lib/Validations/UserValidation"
import { basicdetailsupdate } from "@/lib/Actions/user.action"
import { backicon, detail } from "../../../../../public/profilePage"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import Link from "next/link"





export function BasicDetails({id}:{id:string}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname=usePathname();
  //const token=searchParams.get('token');
  const [error , setError] = useState<string | undefined>('')
  const [success , setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  // ...
  const form=useForm<z.infer<typeof BasicDetailsValidation>>({
    resolver: zodResolver(BasicDetailsValidation), 
    defaultValues: {
      name: "",
      dob: new Date(),
      gender: "",

    }
  })

  enum Gender {
    MALE="male",
    FEMALE="female",
    NOTA="nota"
  }

  const onSubmit = (values: z.infer<typeof BasicDetailsValidation>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      basicdetailsupdate(values,id,pathname).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
        if(data?.success){
            router.push('/onboarding/yourself');
        }
      })
    })
    
    console.log(values)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div  className='bg-white px-6 pt-4'>
          <div >
            <Link href={'username'}><Image src={backicon} alt="backicon" ></Image></Link>
          </div>
            <div className='mt-[28px]'>
              <Image src={detail} alt="lock" ></Image>

              <div className="text-gray-900 text-xl font-bold mt-[10px]">Basic Details</div>
              <div className=" text-neutral-500 text-[15px] font-normal leading-tight mt-[8px]">Silence Speaks Louder: Discover Hushh for Your Sound Solutions</div>
            </div> 
              
          </div>
        
        <div className="px-6 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <Input placeholder="First Name" type="text" {...field} disabled={isPending} className=" h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          <div className="py-[10px]">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input placeholder="Last Name" type="text" {...field} disabled={isPending} className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
          </div>
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                {/* <FormLabel>Date of birth</FormLabel> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Birthday (mm/dd/yyyy)</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 " />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    
                    <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={1960}
                    toYear={2030}
                  />
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription> */}
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    <SelectItem value={Gender.NOTA}>Rather not say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="px-6 pt-[88px]">
          <Button type="submit" disabled={isPending} className=" h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight">Continue</Button>
        </div>
      </form>
    </Form>
  )
}
