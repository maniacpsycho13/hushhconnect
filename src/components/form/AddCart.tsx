"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import editbox2 from "@/../public/editbox2.svg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { CreateProduct } from "@/lib/Validations/ProductValidation";
import { createProduct } from "@/lib/Actions/product.action";
import Link from "next/link";
import { FadeLoader } from "react-spinners";

const AddCart = ({ communityId }: { communityId?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [isUploading, setIsUploading] = useState(false); // State for managing upload status

  const form = useForm<z.infer<typeof CreateProduct>>({
    resolver: zodResolver(CreateProduct),
  });

  const onSubmit = async (values: z.infer<typeof CreateProduct>): Promise<void> => {
    setIsLoading(true); // Set loading to true when the submission starts
    try {
      const blob = values.fileUrl;
      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.fileUrl = imgRes[0].url;
        }
      }
      console.log(values);

      await createProduct({
        fileUrl: values.fileUrl,
        title: values.title,
        currency: values.currency,
        price: values.price,
        link: values.link,
        communityId: communityId || undefined,
      });
      alert("Your product added successfully");

      // After submission, navigate to the appropriate page
      if (pathname === "/createproduct") {
        router.back();
      } else {
        router.push("/");
      }
    } finally {
      setIsLoading(false); // Set loading to false after submission completes
    }
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
    <div className="px-6 pt-4 pb-24">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
      <Form {...form}>
        <form
          className="flex flex-col justify-start"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center">
            <Link href={'/home/thread'}><div className="text-red-500 text-sm font-semibold leading-[18.42px] flex justify-start">
              Cancel
            </div></Link>
            <div className="mx-auto text-black text-base font-semibold leading-[18.42px] flex justify-center">
              Add Product
            </div>
            <button
              className="text-blue-600 text-sm font-semibold bg-transparent shadow-none leading-[18.42px] flex justify-end p-0 outline-none cursor-pointer"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Post"}
            </button>
          </div>

          <div  className="mx-auto mt-2">
                <FormField
                control={form.control}
                name="fileUrl"
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
                            form.setValue("fileUrl", res[0].url);
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

            {selectedImage && (
              <div className="h-[155px] overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9} className="w-full h-[155px] rounded-xl text-black">
                <Image
                  src={selectedImage}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover h-full w-full"
                  style={{ objectFit: 'contain' }}
                />
              </AspectRatio>
            </div>
            )}

          <div className="text-black mt-[29.3px] mb-[5px] text-[10.88px] font-normal uppercase leading-[13.40px]">
            Product information
          </div>

          <div className="flex flex-col gap-[10px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full h-[54px] px-4 bg-zinc-100 rounded-[14px] border-none justify-start items-center gap-2.5 inline-flex focus:border-none focus-visible:border-none shadow-none focus:outline-none text-neutral-500 text-base font-normal"
                      placeholder="Product Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full h-[54px] px-4 bg-zinc-100 rounded-[14px] border-none justify-start items-center gap-2.5 inline-flex focus:border-none focus-visible:border-none shadow-none focus:outline-none text-neutral-500 text-base font-normal"
                      placeholder="Product Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3 ">
                  <FormControl>
                    <select
                      className="w-full h-[54px] px-4 bg-zinc-100 rounded-[14px] border-none justify-start items-center gap-2.5 inline-flex focus:border-none focus-visible:border-none shadow-none focus:outline-none text-neutral-500 text-base font-normal"
                      {...field}
                    >
                      <option value="">Select Currency</option>
                      <option value="$">$</option>
                      <option value="Rs">Rs</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full h-[54px] px-4 bg-zinc-100 rounded-[14px] border-none justify-start items-center gap-2.5 inline-flex focus:border-none focus-visible:border-none shadow-none focus:outline-none text-neutral-500 text-base font-normal"
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCart;
