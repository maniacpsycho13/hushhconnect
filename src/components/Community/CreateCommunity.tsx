"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
import { set, z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import Image from "next/image";

import Link from "next/link";
import { FormError } from "../form/AuthForm/form-error";
import { FormSuccess } from "../form/AuthForm/form-success";
import { Lock, backicon } from "../../../public/profilePage";
import { CreateCommunity } from "@/lib/Validations/CommunityVal";
import { createCommunity } from "@/lib/Actions/community.action";
import { editbox } from "../../../public/profile";

export function CreateComm({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof CreateCommunity>>({
    resolver: zodResolver(CreateCommunity),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateCommunity>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const blob = values.image || "";

      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }
      }
      createCommunity(values, id).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          router.push("/allcomm");
        }
      });
    });

    console.log(values);
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="bg-white px-4 pt-4">
          <div>
            <Link href={"/allcomm"}>
              <Image src={backicon} alt="backicon"></Image>
            </Link>
          </div>

          <div className="mt-[28px]">
            <Image src={Lock} alt="lock"></Image>

            <div className="text-gray-900 text-xl font-bold mt-[10px]">
              Create Community
            </div>
          </div>
        </div>

        <div className="px-4 pt-[24px]">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem
                className={`relative mx-auto items-center w-full h-[120px] rounded-xl ${
                  !field.value ? "bg-gray-100" : ""
                }`}
              >
                <FormLabel className="flex flex-col items-center justify-center">
                  {field.value ? (
                    <div  className="relative h-[96px] w-[96px] rounded-full overflow-hidden border-2 border-gray-300">
                      <Image
                      src={field.value}
                      alt="profile_icon"
                      layout="fill"
                      objectFit="contain"
                      priority
                      className="rounded-full"
                    />

                    </div>
                  ) : (
                    <div className="text-center text-black text-[15px] font-normal leading-tight h-full mt-[2.3rem]">
                      upload community profile
                    </div>
                  )}
                </FormLabel>
                <FormLabel className="">
                  <Image
                    src={editbox}
                    alt="profile_icon"
                    width={32}
                    height={32}
                    priority
                    className="rounded-full object-contain absolute right-[8px] bottom-[3px]"
                  />
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200 hidden">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name of Community"
                      type="text"
                      {...field}
                      disabled={isPending}
                      className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight outline-none focus:border-zinc-300 shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-[12px]">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      type="text"
                      {...field}
                      disabled={isPending}
                      className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight"
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
        <div className="px-4 pt-[96px]">
          <Button
            type="submit"
            disabled={isPending}
            className="h-14 py-[17px] bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full text-center text-white text-base font-semibold leading-tight"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
