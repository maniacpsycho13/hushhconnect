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
import {
  MultiFileDropzone,
  type FileState,
} from '@/components/Post/UploadFile';
import { useEdgeStore } from "@/lib/edgestore";
import { getFileTypeFromUrl } from "@/lib/utils";

function CreateThread({ communityId }: { communityId: string }) {
  const router = useRouter();
  const mount = useMount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [fileType, setFileType] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false); // New state for upload status
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      communityId,
      caption: "",
      fileUrl: undefined,
    },
  });

  const fileUrl = form.watch("fileUrl");

  const handleSubmit = async (values: z.infer<typeof CreatePost>) => {
    setIsSubmitting(true);
    const res = await createPost(values);
    if (res) {
      toast.error(<ErrorForm res={res} />);
    } else {
      toast.success("Post created successfully!");
      router.push("/"); // Redirect to another page after successful post creation
    }
    setIsSubmitting(false);
  };

  if (!mount) return null;

  return (
    <div className="px-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="flex items-center">
            <div className="text-red-500 text-sm font-semibold leading-[18.42px] flex justify-start">Cancel</div>
            <div className="mx-auto text-black text-base font-semibold leading-[18.42px] flex justify-center">Add Thread</div>
            <div
              onClick={!isSubmitting ? form.handleSubmit(handleSubmit) : undefined}
              className={`text-blue-600 text-sm font-semibold bg-transparent shadow-none leading-[18.42px] flex justify-end p-0 ${isSubmitting || isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              style={{ pointerEvents: isSubmitting || isUploading ? 'none' : 'auto' }}
            >
              {isSubmitting || isUploading ? (
                <div className="loader">Loading...</div> // Add your loader icon or spinner here
              ) : (
                'Post'
              )}
            </div>
          </div>
          {!!fileUrl && (
            <div className="h-[155px] overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="w-full h-[155px] rounded-xl text-black">
                {fileType === "image" && (
                  <Image
                    src={fileUrl}
                    alt="Post preview"
                    fill
                    className="rounded-md object-cover h-full w-full"
                    style={{ objectFit: 'contain' }}
                  />
                )}

                {fileType === "video" && (
                  <iframe src={fileUrl} className="rounded-md object-cover h-full w-full" />
                )}
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
                    <MultiFileDropzone
                      value={fileStates}
                      onChange={(files) => {
                        setFileStates(files);
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setIsUploading(true); // Set uploading state to true
                        setFileStates([...fileStates, ...addedFiles]);
                        await Promise.all(
                          addedFiles.map(async (addedFileState) => {
                            try {
                              const res = await edgestore.publicFiles.upload({
                                file: addedFileState.file,
                                onProgressChange: async (progress) => {
                                  updateFileProgress(addedFileState.key, progress);
                                  if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar at 100%
                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                  }
                                },
                              });

                              let fileuurl = res.url;
                              let filetype = "";
                              let filesize = res.size;
                              filesize = filesize / (1024 * 1024);
                              if (filesize > 20) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                                toast.error("File size should be less than 10 MB");
                              } else {
                                if (fileuurl) filetype = getFileTypeFromUrl(fileuurl);
                                setFileType(filetype); // Set the file type
                                if (filetype == "image" || filetype == "video") {
                                  form.setValue("fileUrl", res.url);
                                } else {
                                  updateFileProgress(addedFileState.key, 'ERROR');
                                  toast.error("Please upload an image or video");
                                }
                              }
                            } catch (err) {
                              updateFileProgress(addedFileState.key, 'ERROR');
                            }
                          }),
                        );
                        setIsUploading(false); // Set uploading state to false after upload completes
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
                    className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal leading-tight placeholder:opacity-50"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input
            type="text"
            id="caption"
            placeholder="Thread Content"
            className="h-14 px-4 py-[18px] bg-white rounded-[10px] border border-zinc-300 justify-end items-center gap-2.5 inline-flex text-black text-base font-normal leading-tight placeholder:opacity-50"
            required
          />
        </form>
      </Form>
    </div>
  );
}

export default CreateThread;
