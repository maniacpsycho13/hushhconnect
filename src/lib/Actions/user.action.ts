'use server'
import { db } from "@/lib/db"
import { unstable_noStore as noStore } from 'next/cache'

import { revalidatePath } from "next/cache";
import * as z from 'zod';
import { BasicDetailsValidation, ProfilePicValidation, SocialMediaValidation, SocialValidation, UsernameValidation } from "../Validations/UserValidation";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getUserbyEmail =async (email : string )=>{
    noStore();
    try {
        const user =await db.user.findUnique({where : {email}})

        return user;
    } catch (error) {
        return null; 
    }
}

export const getUserbyId = async (id : string )=>{
    noStore();
    try {
        const user =await db.user.findUnique({where:{id}});
        return user;
    } catch (error) {
        return null;
    }
}

export const getUserbyIdSocial = async (id : string )=>{
    noStore();
    try {
        const user =await db.user.findUnique({
                where:{id},
                include:{
                    socialMedia:true
                }
    });
        return user;
    } catch (error) {
        return null;
    }   
}
// export const usernameupdate = async (username : string , id : string , pathname : string)=>{
//     try {
//         const user =await db.user.update({where:{id},data:{username}});

//         revalidatePath(pathname);
//         return user;
        
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

export async function usernameupdate(values: z.infer<typeof UsernameValidation>, id: string | null, pathname: string) {
    noStore();
    if(!id){
        return {error:"Not Logged In"}
    }
    const validated = UsernameValidation.safeParse(values);
    if(!validated.success){
        return {error:"Invalid Fields"}
    }
    const { username } =validated.data
    // const existingToken =await getVerificationTokenByToken(token);

    // if(!existingToken){
    //     return {error:"Invalid Token"}  
    // }

    // const hasexpired=new Date(existingToken.expires) < new Date();
    // if(hasexpired){
    //     return {error:"Token Expired"}
    // }
    //console.log(id);
    
    const existingUser=await getUserbyId(id);
    const user1=await currentUser();
    if(user1===null){
        return {error:"Not Logged In"}
    }
    //console.log(existingUser);
    
    if(!existingUser){
        await db.user.create({
            data:{
                id,
                username,
                email:user1.emailAddresses[0].emailAddress,
                image:user1.imageUrl,
            }
        })
    }

    const newuser=await getUserbyId(id);
    if(!newuser){
        return {error:"User Does Not Exist"}
    }

    
    

    
    await db.user.update({
        where:{
            id:newuser.id
        },
        data:{
            username
        }
    })
    revalidatePath(pathname);
    return {success:"Usename Added"}
}


export async function socialupdate(values: z.infer<typeof SocialValidation>, id: string | null, pathname: string) {
    noStore();

    if (!id) {
        return { error: "Not Logged In" };
    }

    const validated = SocialValidation.safeParse(values);
    if (!validated.success) {
        return { error: "Invalid Fields" };
    }

    const { instagram, twitter, facebook, linkedin, youtube } = validated.data;

    // Check if the database client is initialized properly
    if (!db || !db.socialMedia) {
        return { error: "Database client is not initialized properly" };
    }

    const existingUser = await getUserbyId(id);
    if (!existingUser) {
        return { error: "User Does Not Exist" };
    }

    // Delete existing social media entries for the user
    try {
        await db.socialMedia.deleteMany({ where: { userId: id } });
    } catch (error) {
        console.error("Error deleting existing social media entries:", error);
        return { error: "Failed to delete existing social media entries" };
    }

    const socialMediaData = [
        { platform: 'instagram', url: instagram, userId: id },
        { platform: 'twitter', url: twitter, userId: id },
        { platform: 'facebook', url: facebook, userId: id },
        { platform: 'linkedin', url: linkedin, userId: id },
        { platform: 'youtube', url: youtube, userId: id },
    ];

    // Insert new social media entries
    try {
        await db.socialMedia.createMany({ data: socialMediaData });
    } catch (error) {
        console.error("Error creating new social media entries:", error);
        return { error: "Failed to create new social media entries" };
    }

    revalidatePath(pathname);
    return { success: "Social Media Added" };
}






export async function basicdetailsupdate(values: z.infer<typeof BasicDetailsValidation>, id: string | null, pathname: string) {
    noStore();
    if(!id){
        return {error:"Not Logged In"}
    }
    const validated = BasicDetailsValidation.safeParse(values);
    if(!validated.success){
        return {error:"Invalid Fields"}
    }
    const { name , dob , gender } =validated.data
    
    
    const existingUser=await getUserbyId(id);
    //console.log(existingUser);
    
    if(!existingUser){
        return {error:"User Does Not Exist"}
    }

    
    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            name,
            dob,
            gender
        }
    })
    revalidatePath(pathname);
    return {success:"Basic Details Added"}
}





export async function profilepicupdate(values: z.infer<typeof ProfilePicValidation>, id: string | null, pathname: string) {
    noStore();
    if(!id){
        return {error:"Not Logged In"}
    }
    const validated = ProfilePicValidation.safeParse(values);
    if(!validated.success){
        return {error:"Invalid Fields"}
    }
    const { profile_photo, bio } =validated.data
    
    
    const existingUser=await getUserbyId(id);
    //console.log(existingUser);
    
    if(!existingUser){
        return {error:"User Does Not Exist"}
    }

    
    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            image:profile_photo,
            bio,
            isboarded:true
        }
    })
    revalidatePath(pathname);
    return {success:"Profile Added"}
}


export async function whetherboarded(id: string | null) {
    noStore();
    if(!id){
        return false;
    }
    const existingUser=await getUserbyId(id);
    //console.log(existingUser);
    
    if(!existingUser){
        return false;
    }
    if(existingUser.isboarded){
        return true;
    }
    return false;
}


export async function getUserId(){
    const session = await auth();
    if(!session || !session.userId) return null;
    const userid=session.userId
    if(!userid) return null;
    return userid
  }