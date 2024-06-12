"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/useMount";
import { createPost } from "@/lib/Actions/post.action";
import { CreatePost } from "@/lib/Validations/PostValidation";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ErrorForm from "@/components/ui/Error";

function CreatePage() {
  const router = useRouter();
  const mount = useMount();
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      fileUrl: undefined,
    },
  });
  const fileUrl = form.watch("fileUrl");

  if (!mount) return null;

  return (
    <div className="px-6 py-4">
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const res = await createPost(values);
            if (res) {
              return toast.error(<ErrorForm res={res} />);
            } else {
              toast.success("Post created successfully!");
              router.push("/"); // Redirect to another page after successful post creation
            }
          })}
          className="space-y-4"
        >

          <div className="flex items-center">
            <div className=" text-red-500 text-sm font-semibold  leading-[18.42px] flex justify-start">Cancel</div>
            <div className="mx-auto text-black text-base font-semibold  leading-[18.42px] flex justify-center">Add Thread</div>
            <Button type="submit" disabled={form.formState.isSubmitting} className=" text-blue-600 text-sm font-semibold bg-transparent shadow-none leading-[18.42px] flex justify-end p-0">
              Post
            </Button>
          </div>
          {!!fileUrl && (
            <div className="h-[155px] overflow-hidden rounded-md">
              <AspectRatio ratio={16/9} className="w-full h-[155px]   rounded-xl text-black">
                <Image
                  src={fileUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover h-full w-full"
                  style={{ objectFit: 'contain' }}
                />
              </AspectRatio>
            </div>
          )}

          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="picture">Picture (Optional)</FormLabel>
                <FormControl>
                  {!fileUrl && ( // Conditionally render the UploadButton based on fileUrl
                    <UploadButton
                      className="w-full h-[155px] bg-zinc-300 opacity-30 rounded-xl text-black"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("fileUrl", res[0].url);
                        toast.success("Upload complete");
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error);
                        toast.error("Upload failed");
                      }}
                    />
                  )}
                </FormControl>
                <FormDescription>
                  Upload a picture to post (Optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="caption">About thread</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="caption"
                    placeholder="Title"
                    className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight placeholder:opacity-50"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            {/* convert it for text area */}
            {/* <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl> */}
                  <Input
                    type="text"
                    id="caption"
                    placeholder="Thread Content"
                    className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal  leading-tight placeholder:opacity-50"
                    // {...field}
                    
                    required
                  />
                {/* </FormControl>
                <FormMessage />
              </FormItem> */}
            {/* )} */}
          {/* /> */}

          
        </form>
      </Form>
    </div>
  );
}

export default CreatePage;
