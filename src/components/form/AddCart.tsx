"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { CreateProduct } from "@/lib/Validations/ProductValidation";
import { createProduct } from "@/lib/Actions/product.action";

interface Props {
  // userid: string;
  btnTitle: string;
}

interface ProductProps {
  fileUrl: string;
  price: string;
  tile: string;
  link: string;
  currency: string;
}

const AddCart = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateProduct>>({
    resolver: zodResolver(CreateProduct),

  });

  const onSubmit = async (values: z.infer<typeof CreateProduct>): Promise<void> => {
    setIsLoading(true);  // Set loading to true when the submission starts
    try {
      const blob = values.fileUrl;
      const hasImageChanged = isBase64Image(blob);
      
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.fileUrl = imgRes[0].url;
        }
      }

      await createProduct({
        fileUrl : values.fileUrl,
        title: values.title,
        currency: values.currency,
        price: values.price,
        link: values.link,
      });

      // After submission, navigate to the appropriate page
      if (pathname === "/createproduct") {
        router.back();
      } else {
        router.push("/");
      }
    } finally {
      setIsLoading(false);  // Set loading to false after submission completes
      alert("your product added successfully");
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
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-8'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='fileUrl'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className=' flex h-60 w-full items-center justify-center rounded-lg bg-dark-4 '>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className=' object-contain'
                  />
                ) : (
                  <p className="text-base text-gray-400 font-[300] ">Upload Product Image</p>
                )}

                <FormLabel className=''>
                {field.value ? (
                  <Image
                    src={editbox2}
                    alt='profile_icon'
                    width={32}
                    height={32}
                    priority
                    className='rounded-full object-contain absolute right-[2rem] top-[3px] opacity-1'
                  />
                ) : (
                  <Image
                    src={editbox2}
                    alt='profile_icon'
                    width={32}
                    height={32}
                    className='object-contain absolute right-[2rem] top-[25rem] opacity-1'
                  />
                )}
              </FormLabel>
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add Product photo'
                  className='account-form_image-input hidden '
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <p className="text-[14px] text-[#8E8E8E]">PRODUCT INFORMATION</p>

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus p-6'
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
          name='link'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus p-6'
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
          name='currency'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus p-6'
                  placeholder="Currency"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text' 
                  className='account-form_input no-focus p-6'
                  placeholder="Price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
};

export default AddCart;
