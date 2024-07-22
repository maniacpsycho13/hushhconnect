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
import Link from "next/link";
import AudioRecorder from "../AudioRecoder";
import { Textarea } from "../ui/textarea";
 // Adjust the import path as necessary

function CreatePage() {
  const router = useRouter();
  // const mount = useMount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      fileUrl: undefined,
    },
  });
  const fileUrl = form.watch("fileUrl");

  const setCaption = (caption: string) => form.setValue("caption", caption);
  const setFileUrl = (url: string) => form.setValue("fileUrl", url);

  const handleSubmit = async (values: z.infer<typeof CreatePost>) => {
    console.log(values);
    
    setIsSubmitting(true);
    const res = await createPost(values);
    if (res) {
      toast.error(<ErrorForm res={res} />);
    } else {
      toast.success("Post created successfully!");
      router.push("/home/threads"); // Redirect to another page after successful post creation
    }
    setIsSubmitting(false);
  };


  return (
    <div className="px-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="flex items-center">
            <Link href={'/home/thread'}><div className="text-red-500 text-sm font-semibold leading-[18.42px] flex justify-start">Cancel</div></Link>
            <div className="mx-auto text-black text-base font-semibold leading-[18.42px] flex justify-center">Add Thread</div>
            <div
              onClick={!isSubmitting ? form.handleSubmit(handleSubmit) : undefined}
              className={`text-blue-600 text-sm font-semibold bg-transparent shadow-none leading-[18.42px] flex justify-end p-0 ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
            >
              {isSubmitting ? (
                <div className="loader" /> // Add your loader icon or spinner here
              ) : (
                'Post'
              )}
            </div>
          </div>
          {!!fileUrl && (
            <div className="h-[155px] overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="w-full h-[155px] rounded-xl text-black">
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
                <FormMessage />
              </FormItem>
            )}
          />

            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-2 text-center">Generate Post with the help of AI</h2>
                <AudioRecorder setCaption={setCaption} setFileUrl={setFileUrl} />
              </div>

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <p className="text-center text-sm font-semibold">Generate Post Manually</p>
                <FormControl>
                  <Textarea
                    id="caption"
                    placeholder="Caption"
                    rows={6}
                    className="w-full px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal leading-tight placeholder:opacity-50"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default CreatePage;
