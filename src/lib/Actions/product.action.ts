import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getUserId } from "./user.action";
import * as z from "zod";
import { redirect } from "next/navigation";
import { CreateProduct } from "../Validations/ProductValidation";

export async function createProduct(values: z.infer<typeof CreateProduct>) {
    const userId = await getUserId();

    if (!userId) {
      return {
        message: "User not found. Failed to Create Post.",
      };
    }
  
    const validatedFields = CreateProduct.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Post.",
      };
    }
    
    const { fileUrl , title , price , currency , link } = validatedFields.data;
  
   
        try {
            await db.product.create({
              data: {
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
              },
            });
          } catch (error) {
            return {
              message: "Database Error: Failed to Create Post.",
            };
          }

  
    revalidatePath("/Profle");
    redirect("/Profle");
  }

  