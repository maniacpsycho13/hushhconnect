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

export const getUserIdbyUsername =async (username : string )=>{
    noStore();
    try {
        const user =await db.user.findUnique({where : {username}})
        return user?.id;
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

import  { generate }   from "referral-codes";
import { UpdateUser } from "../Validations/PostValidation";
import { SocialMedia, User } from "@prisma/client";

function generateReferralCode({username }: { username: string }) {
    
        try {
            const code = generate({
                prefix: username+'-',
                length:6,
            });
            return code;
        } catch (error) {
            return "Error Generating Referral Code";
        }
   
}

export async function usernameupdate(values: z.infer<typeof UsernameValidation>, id: string | null, pathname: string) {
    noStore();
    if(!id){
        return {error:"Not Logged In"}
    }
    const validated = UsernameValidation.safeParse(values);
    if(!validated.success){
        return {error:"Invalid Fields"}
    }
    const { username ,code } =validated.data
    
    

    const existingUser=await getUserbyId(id);
    const user1=await currentUser();
    if(user1===null){
        return {error:"Not Logged In"}
    }
    console.log("outside loop");
    
    if(!existingUser){
        console.log("inside loop");
        
        await db.user.create({
            data:{
                id,
                username,
                email:user1.emailAddresses[0].emailAddress,
                image:user1.imageUrl,
            }
        })
        if (code) {
            try {
                const updatedReferral = await db.referral.update({
                    where: {
                        code: code
                    },
                    data: {
                        users: {
                            connect: {
                                id: id,
                            },
                        },
                    },
                });
                
                console.log(code);
                
                await db.user.update({
                    where: {
                        id:updatedReferral.autherId
                    },
                    data: {
                        coins: {
                            increment: 200
                        }
                    }
                        
                })
                console.log('Updated Referral:', updatedReferral);
            } catch (error) {
                console.log(error);
                
                return { error: "Invalid Referral Code" };
            }
        }
        revalidatePath(pathname);
        return {success:"Usename Added 1"}
    }
    console.log("after loop");
    

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

export async function socialMediaUpdate(values: SocialMedia[] , id: string | null, pathname: string) {
    if(!id)return {error:"Not Logged In"};
    console.log(values);

    try {
        values.map(async (value)=>{
            await db.socialMedia.update({
                where:{
                    id:value.id
                },
                data:{
                    url:value.url
                }
            })
        })
        return {success:"Social Media Added"};
    } catch (error) {
        console.log(error);
        
        return {error:"Something went wrong"};
    }
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
        return existingUser;
    }
    return null;
}


export async function getUserId(){
    const session = await auth();
    if(!session || !session.userId) return null;
    const userid=session.userId
    if(!userid) return null;
    return userid
  }

export async function getReferralbyId(id:string){
    try {
        const referral=await db.referral.findFirst({
            where:{
                id
            }
        })
        if(referral)return referral;
    } catch (error) {
        console.log(error);
    }

}

export async function getReferralbyAuther(autherId:string){
    try {
        const referral=await db.referral.findFirst({
            where:{
                autherId
            },
            include:{
                auther:true,
                users:true

            }
        })
        if(referral)return referral;
    } catch (error) {
        console.log(error);
    }
}







export async function createReferralbyUserId(id: string) {
    try {
        // Check if the user exists
        const user = await db.user.findUnique({
            where: { id },
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // Generate a referral code (Assuming you have a function generateReferralCode)
        const referralCode = generateReferralCode({ username: user.username }); // Implement your generateReferralCode function

        if (referralCode === 'Error Generating Referral Code') {
            return { error: 'Error Generating Referral Code' };
        }

        // Check if a referral code already exists for this user
        const existingReferral = await db.referral.findFirst({
            where: { autherId: id }, // Assuming autherId is the correct field
        });

        if (existingReferral) {
            return { error: 'Referral code already exists for this user' };
        }

        // Create the referral code
        const newReferral = await db.referral.create({
            data: {
                code: referralCode[0],
                auther: {
                    connect: { id },
                },
            },
        });


        return { success: 'Referral code created', referral: newReferral };
    } catch (error) {
        console.error('Error creating referral:', error);
        return { error: 'Error creating referral' };
    }
}
export async function updateProfile(values: z.infer<typeof UpdateUser>) {
    const userId = await getUserId();
    if(!userId)return null;
  
    const validatedFields = UpdateUser.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update Profile.",
      };
    }
  
    const { bio, image, name, username } = validatedFields.data;
  
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          username,
          name,
          image,
          bio,
        },
      });
      revalidatePath("/profile/"+userId);
      return { message: "Updated Profile." };
    } catch (error) {
      return { message: "Database Error: Failed to Update Profile." };
    }
  }


  export async function fetchProfile(id: string| null) {
    noStore();
    if(!id)return null;
  
    try {
      const data = await db.user.findUnique({
        where: {
          id,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
          },
          saved: {
            orderBy: {
              createdAt: "desc",
            },
          },
          followedBy: {
            include: {
              follower: {
                include: {
                  following: true,
                  followedBy: true,
                },
              },
            },
          },
          following: {
            include: {
              following: {
                include: {
                  following: true,
                  followedBy: true,
                },
              },
            },
          },
        },
      });
  
      return data;
    } catch (error) {
      console.error("Database Error:", error);
      return null;
    //   throw new Error("Failed to fetch profile");
    }
  }


  export async function templateUpdate(value:string|null,id:string) {
    try {
        if(!value)return {error:"Missing Field"};
        console.log(value);
        
        await db.user.update({
            where: {
                id
            },
            data: {
                cardImage:value
            }
        })
        return {success:"Template Updated"}
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
}

export async function updateUserLocation(userId: string, latitude: number, longitude: number) {
   
    try {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { latitude, longitude },
      });
      return { success: "Location updated successfully", user: updatedUser };
    } catch (error) {
      console.error("Error updating user location:", error);
      return { error: "Failed to update location" };
    }
}





export async function findNearbyUsers(userId: string, radiusInKm: number, limit = 50) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { latitude: true, longitude: true },
    });

    if (!user || user.latitude === null || user.longitude === null) {
      return { error: "User location not set" };
    }

    // Earth's radius in kilometers
    const earthRadiusKm = 6371;

    const nearbyUsers = await db.$queryRaw`
      SELECT * FROM (
        SELECT 
          id, 
          name, 
          username, 
          image,
          latitude,
          longitude,
          ${earthRadiusKm} * acos(
            cos(radians(${user.latitude})) * 
            cos(radians(latitude)) * 
            cos(radians(longitude) - radians(${user.longitude})) + 
            sin(radians(${user.latitude})) * 
            sin(radians(latitude))
          ) AS distance
        FROM "User"
        WHERE 
          id != ${userId}
          AND latitude IS NOT NULL 
          AND longitude IS NOT NULL
      ) AS distances
      WHERE distance <= ${radiusInKm}
      ORDER BY distance
      LIMIT ${limit}
    `;

    return { success: "Nearby users found", users: nearbyUsers };
  } catch (error) {
    console.error("Error finding nearby users:", error);
    return { error: "Failed to find nearby users" };
  } finally {
    await db.$disconnect();
  }
}

export async function getRandomUsers(userId:string,limit = 10) {
    try {
        const randomUsers = await db.$queryRaw`
            SELECT * FROM "User"
            WHERE 
                id!=${userId}
            ORDER BY RANDOM()
            LIMIT ${limit}
        `;

        return { success: "Random users fetched successfully", users: randomUsers };
    } catch (error) {
        console.error("Error fetching random users:", error);
        return { error: "Failed to fetch random users" };
    } finally {
        await db.$disconnect();
    }
}