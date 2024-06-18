'use server'

import { CreateCommunity } from "../Validations/CommunityVal";
import * as z from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export const createCommunity = async (values: z.infer<typeof CreateCommunity>, userId: string | null) => {
    

    if (!userId) {
        return { error: "Not Logged In" };
    }

    const validated = CreateCommunity.safeParse(values);
    if (!validated.success) {
        return { error: "Invalid Fields" };
    }

    const { name, description } = validated.data;

    try {
        await db.community.create({
            data: {
                name,
                description,
                admins: {
                    create: {
                        userId
                    }
                }
            }
        });
        revalidatePath("/community");
        return { success: "Community Created" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to Create Community" };
    }
};