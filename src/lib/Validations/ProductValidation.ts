import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  link  : z.string().url(),
  communityId :z.string().optional()
});

export const CreateProduct = ProductSchema.omit({ id: true });
export const UpdateProduct = ProductSchema;
export const DeleteProduct = ProductSchema.pick({ id: true });

