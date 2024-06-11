'use server'
import { db } from "@/lib/db"

import { revalidatePath } from "next/cache";
import * as z from 'zod';
import { BasicDetailsValidation, ProfilePicValidation, UsernameValidation } from "../Validations/UserValidation";
import { currentUser } from "@clerk/nextjs/server";

export const getUserbyEmail =async (email : string )=>{
    try {
        const user =await db.user.findUnique({where : {email}})

        return user;
    } catch (error) {
        return null; 
    }
}

export const getUserbyId = async (id : string )=>{
    try {
        const user =await db.user.findUnique({where:{id}});
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






export async function basicdetailsupdate(values: z.infer<typeof BasicDetailsValidation>, id: string | null, pathname: string) {
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