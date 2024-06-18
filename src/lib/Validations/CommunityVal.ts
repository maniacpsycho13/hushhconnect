import { z } from "zod";

// Community Schema
export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create Community Schema
export const CreateCommunity = CommunitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update Community Schema
export const UpdateCommunity = CommunitySchema.pick({
  id: true,
  name: true,
  description: true,
});

// Delete Community Schema
export const DeleteCommunity = CommunitySchema.pick({
  id: true,
});

// Community Membership Schema
export const CommunityMembershipSchema = z.object({
  id: z.string(),
  userId: z.string(),
  communityId: z.string(),
  createdAt: z.date().optional(),
});

// Create Community Membership Schema
export const CreateCommunityMembership = CommunityMembershipSchema.omit({
  id: true,
  createdAt: true,
});

// Delete Community Membership Schema
export const DeleteCommunityMembership = CommunityMembershipSchema.pick({
  id: true,
});

// Community Admin Schema
export const CommunityAdminSchema = z.object({
  id: z.string(),
  userId: z.string(),
  communityId: z.string(),
  createdAt: z.date().optional(),
});

// Create Community Admin Schema
export const CreateCommunityAdmin = CommunityAdminSchema.omit({
  id: true,
  createdAt: true,
});

// Delete Community Admin Schema
export const DeleteCommunityAdmin = CommunityAdminSchema.pick({
  id: true,
});

// Community Post Schema
export const CommunityPostSchema = z.object({
  id: z.string(),
  content: z.string(),
  fileUrl: z.string().url().optional(),
  communityId: z.string(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create Community Post Schema
export const CreateCommunityPost = CommunityPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update Community Post Schema
export const UpdateCommunityPost = CommunityPostSchema.pick({
  id: true,
  content: true,
  fileUrl: true,
});

// Delete Community Post Schema
export const DeleteCommunityPost = CommunityPostSchema.pick({
  id: true,
});

// Community Post Like Schema
export const CommunityPostLikeSchema = z.object({
  id: z.string(),
  communityPostId: z.string(),
  userId: z.string(),
  createdAt: z.date().optional(),
});

// Create Community Post Like Schema
export const CreateCommunityPostLike = CommunityPostLikeSchema.omit({
  id: true,
  createdAt: true,
});

// Delete Community Post Like Schema
export const DeleteCommunityPostLike = CommunityPostLikeSchema.pick({
  id: true,
});

// Community Post Comment Schema
export const CommunityPostCommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  communityPostId: z.string(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create Community Post Comment Schema
export const CreateCommunityPostComment = CommunityPostCommentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update Community Post Comment Schema
export const UpdateCommunityPostComment = CommunityPostCommentSchema.pick({
  id: true,
  body: true,
});

// Delete Community Post Comment Schema
export const DeleteCommunityPostComment = CommunityPostCommentSchema.pick({
  id: true,
});

// Community Join Request Schema
export const CommunityJoinRequestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  communityId: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  createdAt: z.date().optional(),
});

// Create Community Join Request Schema
export const CreateCommunityJoinRequest = CommunityJoinRequestSchema.omit({
  id: true,
  createdAt: true,
});

// Update Community Join Request Schema
export const UpdateCommunityJoinRequest = CommunityJoinRequestSchema.pick({
  id: true,
  status: true,
});

// Delete Community Join Request Schema
export const DeleteCommunityJoinRequest = CommunityJoinRequestSchema.pick({
  id: true,
});
