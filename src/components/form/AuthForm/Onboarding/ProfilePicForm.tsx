"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition , ChangeEvent} from "react"
import { set, z } from "zod"


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
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

import { isBase64Image } from "@/lib/utils"
import Image from "next/image"
import { useUploadThing } from "@/lib/uploadthing"
import { ProfilePicValidation } from "@/lib/Validations/UserValidation"
import { profilepicupdate } from "@/lib/Actions/user.action"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


export function ProfilePicForm({id}:{id:string}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname=usePathname();
  //const token=searchParams.get('token')

  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);
  const [error , setError] = useState<string | undefined>('')
  const [success , setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  // ...
  const form=useForm<z.infer<typeof ProfilePicValidation>>({
    resolver: zodResolver(ProfilePicValidation), 
    defaultValues: {
      profile_photo: "",
      bio: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ProfilePicValidation>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }
      profilepicupdate(values,id,pathname).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
        if(data?.success){
            router.push('/Profile');
        }
      })
    })
    
    console.log(values)
    
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
      <div className="w-full">
      <FormField
            control={form.control}
            name='profile_photo'
            render={({ field }) => (
              <FormItem className=' relative mx-auto items-center '>
                {/* <FormLabel className='account-form_image-label'>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt='profile_icon'
                      width={96}
                      height={96}
                      priority
                      className='rounded-full object-contain'
                    />
                  ) : (
                    <Image
                      src='/assets/profile.svg'
                      alt='profile_icon'
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                  )}
                </FormLabel> */}
                <FormLabel className=''>
                  {field.value ? (
                    // <Image
                    //   src="/editbox.svg"
                    //   alt='profile_icon'
                    //   width={32}
                    //   height={32}
                    //   priority
                    //   className='rounded-full object-contain absolute right-[8px] bottom-[3px]'
                    // />
                    <div className="mx-auto text-blue-600 text-[15px] font-normal  leading-tight ">Upload your picture</div>
                  ) : (
                    // <Image
                    //   src='/editbox.svg'
                    //   alt='profile_icon'
                    //   width={32}
                    //   height={32}
                    //   className='object-contain absolute right-[8px] bottom-[3px]'
                    // />
                    <div className="text-center text-blue-600 text-[15px] font-normal  leading-tight">Upload your picture</div>
                  )}
                </FormLabel>
                {/* <CenterMode/> */}
                <FormControl className='flex-1 text-base-semibold text-gray-200 hidden '>
                  <Input
                    type='file'
                    accept='image/*'
                    placeholder='Add profile photo'
                    className='account-form_image-input2'
                    onChange={(e) => handleImage(e, field.onChange)}
                    disabled={isPending}
                   
                  />
                </FormControl>
              </FormItem>
            )}
          />


        <div className="w-full pt-[41px] px-4">
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem className=' w-full  '>
                <FormControl>
                  <Textarea
                    rows={10}
                    
                    className=' p-4 bg-zinc-100 rounded-[14px] justify-start items-start gap-2.5 inline-flex text-neutral-500 text-base font-normal border-none '
                    {...field}
                    placeholder="BIO"
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="px-4">
        <Button type="submit" disabled={isPending} className="h-14  py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight">Continue</Button>
        </div>
      </form>
    </Form>
  )
}
