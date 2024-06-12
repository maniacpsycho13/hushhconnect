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
    <div>
      <h1>Create new post</h1>

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
          {!!fileUrl && (
            <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
              <AspectRatio ratio={1 / 1} className="relative h-full">
                <Image
                  src={fileUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover"
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
                  <UploadButton
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
                <FormLabel htmlFor="caption">Caption</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="caption"
                    placeholder="Write a caption..."
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePage;
