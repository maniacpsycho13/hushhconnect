'use server'

import { CreateCommunity } from "../Validations/CommunityVal";
import * as z from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";


export const getCommunityById = async (id: string) => {
    noStore();
    try {
        const community = await db.community.findUnique({ where: { id } });
        return community;
    } catch (error) {
        return null;
    }
};

export const getAllCommunities = async () => {
    noStore();
    try {
        const communities = await db.community.findMany();
        return communities;
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to Fetch Communities" };
    }
};

export const createCommunity = async (values: z.infer<typeof CreateCommunity>, userId: string | null) => {
    

    if (!userId) {
        return { error: "Not Logged In" };
    }

    const validated = CreateCommunity.safeParse(values);
    if (!validated.success) {
        return { error: "Invalid Fields" };
    }

    const { name, description , image } = validated.data;

    try {
        await db.community.create({
            data: {
                name,
                description,
                image,
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



export const checkUserRole = async (communityId: string, userId: string | null) => {
    noStore();

    if (!userId) {
        return { role: 'not allowd' };
    }

    try {
        // Check if the user is an admin
        const isAdmin = await db.communityAdmin.findFirst({
            where: {
                communityId,
                userId
            }
        });

        if (isAdmin) {
            return { role: 'admin' };
        }

        // Check if the user is a member
        const isMember = await db.communityMembership.findFirst({
            where: {
                communityId,
                userId
            }
        });

        if (isMember) {
            return { role: 'member' };
        }

        // If neither, return 'none'
        return { role: 'none' };
    } catch (error) {
        console.error("Database Error:", error);
        return { role: 'nota' };
    }
};


export const getJoinRequestStatus = async (communityId: string, userId: string | null) => {
    noStore();

    if (!userId) {
        return { status: 'user not logged in' };
    }

    try {
        const joinRequest = await db.communityJoinRequest.findFirst({
            where: {
                communityId,
                userId
            }
        });

        if (!joinRequest) {
            return { status: 'none' };
        }

        return { status: joinRequest.status };
    } catch (error) {
        console.error("Database Error:", error);
        return { status: 'error' };
    }
};


export const joinCommunity = async (communityId: string, userId: string | null) => {
    noStore();

    if (!userId) {
        return { error: "Not Logged In" };
    }

    // const validated = JoinRequestValidation.safeParse(values);
    // if (!validated.success) {
    //     return { error: "Invalid Fields" };
    // }

    // const { communityId } = validated.data;

    try {
        await db.communityJoinRequest.create({
            data: {
                communityId,
                userId
            }
        });
        revalidatePath(`/community/${communityId}`);
        return { success: "Join Request Sent" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to Send Join Request" };
    }
};


export const getAllJoinRequests = async (communityId: string) => {
    noStore();

    try {
        const joinRequests = await db.communityJoinRequest.findMany({
            where: {
                communityId
            },
            include: {
                user: true
            }
        });

        return joinRequests.map(request => ({
            id: request.id,
            userId: request.userId,
            username: request.user.username,
            status: request.status,
            image: request.user.image,
            createdAt: request.createdAt
        }));
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to Fetch Join Requests" };
    }
};


export const handleJoinRequest = async (requestId: string, status: "approved" | "rejected", userId: string | null) => {
    noStore();

    if (!userId) {
        return { error: "Not Logged In" };
    }

    try {
        const request = await db.communityJoinRequest.findUnique({ where: { id: requestId } });

        if (!request) {
            return { error: "Join Request Not Found" };
        }

        const community = await db.community.findUnique({ where: { id: request.communityId }, include: { admins: true } });

        if (!community || !community.admins.some(admin => admin.userId === userId)) {
            return { error: "Unauthorized Action" };
        }

        await db.communityJoinRequest.update({
            where: { id: requestId },
            data: { status }
        });

        if (status === "approved") {
            await db.communityMembership.create({
                data: {
                    communityId: request.communityId,
                    userId: request.userId
                }
            });
        }

        revalidatePath(`/community/${request.communityId}`);
        return { success: `Join Request ${status}` };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: `Failed to ${status} Join Request` };
    }
};


export async function fetchAllMembersByCommunityId(communityId: string) {
  noStore();

  try {
    const members = await db.communityMembership.findMany({
      where: {
        communityId: communityId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return members;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch community members');
  }
}
