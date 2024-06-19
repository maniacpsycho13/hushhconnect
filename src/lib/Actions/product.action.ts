'use server'

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getUserId } from "./user.action";
import * as z from "zod";
import { redirect } from "next/navigation";
import { CreateProduct } from "../Validations/ProductValidation";
import {unstable_noStore as noStore} from 'next/cache'


export async function createProduct(values: z.infer<typeof CreateProduct>) {
  const userId = await getUserId();

  if (!userId) {
    return {
      message: "User not found. Failed to Create Product.",
    };
  }

  const validatedFields = CreateProduct.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { fileUrl, title, price, currency, link, communityId } = validatedFields.data;

  const productData = {
    title,
    price,
    currency,
    fileUrl,
    link,
    user: {
      connect: {
        id: userId,
      },
    },
    community: communityId ? { connect: { id: communityId } } : undefined,
  };

  try {
    await db.product.create({
      data: productData,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath(`/profile/${userId}`);
  redirect(`/profile/${userId}`);
}

  
  export async function fetchProductsByUserId(userId: string) {
    noStore();
  
    try {
      const data = await db.product.findMany({
        where: {
          user: {
            id: userId,
          }
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return data;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch posts");
    }
  }

 export async function fetchProducts