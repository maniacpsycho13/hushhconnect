
import UserAvatar from "@/components/Post/UserAvatar";
import { PostWithExtras } from "@/lib/Validations/definitions";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import Timestamp from "./Timestamp";
import { Card } from "@/components/ui/card";
import PostOptions from "./PostOptions";
import PostActions from "./PostActions";
import { auth } from "@clerk/nextjs/server";
import { getUserbyId } from "@/lib/Actions/user.action";
import { getFileTypeFromUrl } from "@/lib/utils";

async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();
  const userId = session.userId;
  const username = post.user.username;
  let filetype="";
  if(post.fileUrl){
    filetype=getFileTypeFromUrl(post.fileUrl);
  }
  console.log(filetype);
  
  
  if (!session || !session.userId) return null;
  if(!userId || !username) return null
  const user= await getUserbyId(userId);

  return (
    <div className="flex flex-col space-y-2.5 ">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span
                className="font-medium text-neutral-500 dark:text-neutral-400
                      text-xs
                    "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs text-black dark:text-white font-medium">
              Pune,India
            </p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>

      <Card className="relative h-[290px] w-full overflow-hidden rounded-none sm:rounded-md">
        {post.fileUrl && filetype==="image" && (
           <Image
           src={post.fileUrl}
           alt={post.caption}
           fill
           className="object-cover"
          />
        )}
        {post.fileUrl && filetype==="video" && (
           <iframe
           src={post.fileUrl}
           className="object-cover"
          />
        )}

      </Card>

      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {post.caption && (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/profile/${userId}/threads`} className="font-bold">
            {username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={user} />
    </div>
  );
}

export default Post;
