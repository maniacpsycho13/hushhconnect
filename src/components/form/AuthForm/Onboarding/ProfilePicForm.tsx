"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, ChangeEvent } from "react";
import { z } from "zod";

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

import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { ProfilePicValidation } from "@/lib/Validations/UserValidation";
import { profilepicupdate } from "@/lib/Actions/user.action";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import SimpleSlider from "@/components/Corousel/CenterMode";

export function ProfilePicForm({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

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

    console.log("Selected Image URL:", selectedImage);
    console.log("Files Array:", files);

    if (selectedImage) {
      values.profile_photo = selectedImage;
      console.log("Using selected image from slider:", selectedImage);
    } else if (files.length > 0) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
        console.log("Image uploaded:", imgRes[0].url);
      }
    } else {
      setError("Please select an image.");
      return;
    }

    console.log("Form values to be submitted:", values);

    startTransition(async () => {
      profilepicupdate(values, id, pathname).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          router.push(`/profile/${id}/threads`);
        }
      });
    });
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex flex-col items-center">
          <FormField
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
          />

          <div className="w-full pt-6 px-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      rows={10}
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
        <div className="px-4">
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
  );
}
