"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, ChangeEvent, useRef } from "react";
import { z } from "zod";
import Loader from "@/components/Loader/Loader";
import { FadeLoader } from 'react-spinners'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners"; // Import BeatLoader
import Image from "next/image";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { ProfilePicValidation } from "@/lib/Validations/UserValidation";
import { profilepicupdate } from "@/lib/Actions/user.action";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import SimpleSlider from "@/components/Corousel/CenterMode";
import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import UserAvatar from "@/components/Post/UserAvatar";
import { UserWithExtras } from "@/lib/Validations/definitions";
import { arrowleft, ImageUpload } from "../../../../../public/signup";
import Link from "next/link";

export function ProfilePicForm({ id ,user }: { id: string ,user:UserWithExtras} ) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [isUploading, setIsUploading] = useState(false); // State for managing upload status



  const form = useForm<z.infer<typeof ProfilePicValidation>>({
    resolver: zodResolver(ProfilePicValidation),
    defaultValues: {
      profile_photo: "",
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfilePicValidation>) => {
    setError("");
    setSuccess("");

    console.log("Form values to be submitted:", values);

    startTransition(async () => {
      profilepicupdate(values, id, pathname).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          router.push(`/profile/${user.username}/threads`);
        }
      });
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      file.size > 500000 && setError("Profile Picture too large (>5mb)");
      setFiles([file]);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
        setSelectedImage(imageDataUrl);
        form.setValue("profile_photo", imageDataUrl);
        console.log("Image selected from file input:", imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-6 py-4">
      {isPending && <Loader />}

      <div className="flex justify-between">
        <Link href={'social'}>
          <div className=" px-2.5 py-[3px] bg-white rounded-[51px] border border-neutral-200 justify-start items-center gap-1 inline-flex">
            <Image src={arrowleft} alt="back"></Image>
            <div className="text-black text-[13px] font-normal leading-snug">Social</div>
          </div>
        </Link>

        <Link href={`/profile/${user.username}/threads`}  className="text-center text-gray-900 text-[15px] font-medium ">Skip</Link>
      
      </div>

      <div className="mt-[31px] flex flex-col justify-center items-center ">
        <p className="text-[#1A1C29] text-[20px] font-bold text-center">
          Final Touches
        </p>
        <p className="text-[#797979] text-center text-[15px] py-[8px] mx-[2.5rem] font-[400]">
          Finish off your hushh with a profile picture and bio.
        </p>
      </div>
      <div className="flex justify-center">
        {!selectedImage && <Image src={ImageUpload} alt="image upload placeholder" />}
      </div>
      
      {/* <div className="flex items-center gap-x-2 md:gap-x-5">
        <ProfileAvatar user={user}>
          <div className="md:w-20 flex md:justify-end">
            <UserAvatar user={user} className="w-11 h-11 cursor-pointer" />
          </div>
        </ProfileAvatar>
        <div>
          <p className="font-medium">{user.username}</p>
          <ProfileAvatar user={user}>
            <p className="text-blue-500 text-sm font-bold cursor-pointer hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatar>
        </div>
      </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col items-center  ">
          {selectedImage && (
              <div  className="relative h-[96px] w-[96px] rounded-full overflow-hidden border-2 border-gray-300">
              <Image
              src={selectedImage}
              alt="profile_icon"
              layout="fill"
              objectFit="contain"
              priority
              className="rounded-full"
            />

            </div>
            )}
            {/* <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="relative mx-auto items-center">
                  <FormLabel className="flex flex-col items-center">
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt="profile_icon"
                        width={84}
                        height={84}
                        
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-blue-600 text-[15px] font-normal leading-tight">
                        Upload your picture
                      </div>
                    )}
                  </FormLabel>
                  <div className="w-screen">
                    <SimpleSlider
                      onImageSelect={(url) => {
                        setSelectedImage(url);
                        form.setValue("profile_photo", url);
                        console.log("Image selected from slider:", url);
                      }}
                    />
                  </div>
                  <FormControl className="hidden">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className="account-form_image-input2"
                      onChange={(e) => handleImage(e, field.onChange)}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

                <div  className="mx-auto">
                <FormField
                control={form.control}
                name="profile_photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {isUploading ? (
                        <FadeLoader color="rgba(200, 73, 168, 1)" />
                      ) : (
                        <UploadButton
                          className="p-1 rounded-xl text-[10px] ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50 custom-class"
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setIsUploading(false); 
                            form.setValue("profile_photo", res[0].url);
                            setSelectedImage(res[0].url);
                            console.log("Image uploaded:", res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            setIsUploading(false); 
                            console.error(error);
                          }}
                          onUploadBegin={()=>setIsUploading(true)}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>


            <div className="w-full pt-6 ">
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        rows={8}
                        className="p-4 bg-zinc-100 rounded-[14px] justify-start items-start gap-2.5 inline-flex text-neutral-500 text-base font-normal border-none"
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
          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
