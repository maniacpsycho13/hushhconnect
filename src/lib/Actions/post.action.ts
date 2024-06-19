'use server'
import { revalidatePath } from "next/cache";
import { BookmarkSchema, CreateComment, CreatePost, DeleteComment, DeletePost, LikeSchema, UpdatePost } from "../Validations/PostValidation";
import { db } from "../db";
import { redirect } from "next/navigation";
import * as z from "zod";
import { getUserId } from "./user.action";
import {unstable_noStore as noStore} from "next/cache"

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();

  if (!userId) {
    return {
      message: "User not found. Failed to Create Post.",
    };
  }

  const validatedFields = CreatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl, caption, communityId } = validatedFields.data;

  const postData = {
    caption,
    fileUrl: fileUrl || undefined,
    user: {
      connect: {
        id: userId,
      },
    },
    community: communityId ? { connect: { id: communityId } } : undefined,
  };

  try {
    await db.post.create({
      data: postData,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  revalidatePath("/profile"+userId);
  redirect("/profile/"+userId);
}


  export async function deletePost(formData: FormData) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Delete Post.",
      };
    }
  
    const { id } = DeletePost.parse({
      id: formData.get("id"),
    });
  
    const post = await db.post.findUnique({
      where: {
        id,
        userId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    try {
      await db.post.delete({
        where: {
          id,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Deleted Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Delete Post." };
    }
  }

  
  export async function fetchPosts() {
    // equivalent to doing fetch, cache: no-store
    noStore();
  
    try {
      const data = await db.post.findMany({
        where: {
          communityId: null,
        },
        include: {
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
          savedBy: true,
          user: true,
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
  

  export async function fetchPostById(id: string) {
    noStore();
  
    try {
      const data = await db.post.findUnique({
        where: {
          id,
        },
        include: {
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
          savedBy: true,
          user: true,
        },
      });
  
      return data;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch post");
    }
  }
  
  export async function fetchPostsByUsername(username: string, postId?: string) {
    noStore();
  
    try {
      const data = await db.post.findMany({
        where: {
          user: {
            username,
          },
          NOT: {
            id: postId,
          },
        },
        include: {
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
          savedBy: true,
          user: true,
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



  export async function fetchPostsByUserId(userId: string) {
    noStore();
  
    try {
      const data = await db.post.findMany({
        where: {
          user: {
            id: userId,
          }
        },
        include: {
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
          savedBy: true,
          user: true,
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


  export async function fetchPostsByCommunityId(communityId: string) {
    noStore();
  
    try {
      const data = await db.post.findMany({
        where: {
          communityId: communityId,
        },
        include: {
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
          savedBy: true,
          user: true,
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


  export async function updatePost(values: z.infer<typeof UpdatePost>) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Update Post.",
      };
    }
  
    const validatedFields = UpdatePost.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update Post.",
      };
    }
  
    const { id, fileUrl, caption } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id,
        userId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    try {
      await db.post.update({
        where: {
          id,
        },
        data: {
          fileUrl,
          caption,
        },
      });
    } catch (error) {
      return { message: "Database Error: Failed to Update Post." };
    }
  
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  export async function createComment(values: z.infer<typeof CreateComment>) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Create Comment.",
      };
    }
  
    const validatedFields = CreateComment.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Comment.",
      };
    }
  
    const { postId, body } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    try {
      await db.comment.create({
        data: {
          body,
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Created Comment." };
    } catch (error) {
      return { message: "Database Error: Failed to Create Comment." };
    }
  }
  
  export async function deleteComment(formData: FormData) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Delete Comment.",
      };
    }
  
    const { id } = DeleteComment.parse({
      id: formData.get("id"),
    });
  
    const comment = await db.comment.findUnique({
      where: {
        id,
        userId,
      },
    });
  
    if (!comment) {
      throw new Error("Comment not found");
    }
  
    try {
      await db.comment.delete({
        where: {
          id,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Deleted Comment." };
    } catch (error) {
      return { message: "Database Error: Failed to Delete Comment." };
    }
  }
  

  export async function likePost(value: FormDataEntryValue | null) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Like Post.",
      };
    }
  
    const validatedFields = LikeSchema.safeParse({ postId: value });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Like Post.",
      };
    }
  
    const { postId } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    const like = await db.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  
    if (like) {
      try {
        await db.like.delete({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
        });
        revalidatePath("/dashboard");
        return { message: "Unliked Post." };
      } catch (error) {
        return { message: "Database Error: Failed to Unlike Post." };
      }
    }
  
    try {
      await db.like.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Liked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Like Post." };
    }
  }
  
  export async function bookmarkPost(value: FormDataEntryValue | null) {
    const userId = await getUserId();
  
    if (!userId) {
      return {
        message: "User not found. Failed to Bookmark Post.",
      };
    }
  
    const validatedFields = BookmarkSchema.safeParse({ postId: value });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Bookmark Post.",
      };
    }
  
    const { postId } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found.");
    }
  
    const bookmark = await db.savedPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  
    if (bookmark) {
      try {
        await db.savedPost.delete({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
        });
        revalidatePath("/dashboard");
        return { message: "Unbookmarked Post." };
      } catch (error) {
        return {
          message: "Database Error: Failed to Unbookmark Post.",
        };
      }
    }
  
    try {
      await db.savedPost.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Bookmarked Post." };
    } catch (error) {
      return {
        message: "Database Error: Failed to Bookmark Post.",
      };
    }
  }
  

  export async function fetchUserPostComments(userId: string) {
    noStore();
  
    try {
      const data = await db.comment.findMany({
        where: {
          post: {
            userId: userId,
          },
        },
        include: {
          post: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch comments');
    }
  }