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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import linkify from 'linkify-it';

const linkifyInstance = new linkify();

function linkifyText(text:string) {
  const matches = linkifyInstance.match(text);
  if (!matches) {
    return text;
  }

  const result = [];
  let lastIndex = 0;

  matches.forEach(match => {
    if (lastIndex < match.index) {
      result.push(text.substring(lastIndex, match.index));
    }
    result.push(
      <Link key={match.url} href={match.url} className="text-blue-500 underline break-words">
        {match.text}
      </Link>
    );
    lastIndex = match.lastIndex;
  });

  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
}

async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();
  const userId = session.userId;
  const username = post.user.username;
  let filetype = "";
  if (post.fileUrl) {
    filetype = getFileTypeFromUrl(post.fileUrl);
  }
  console.log(filetype);

  if (!session || !session.userId) return null;
  if (!userId || !username) return null;
  const user = await getUserbyId(userId);

  return (
    <div>
      <div className="flex flex-col space-y-2.5 w-full mt-4">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">•</span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs text-black dark:text-white font-medium">Pune, India</p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>

      <div className="h-[290px] overflow-hidden rounded-md">
        <AspectRatio ratio={16 / 9} className="w-full h-[290px] rounded-xl text-black">
          {post.fileUrl && filetype === "image" && (
            <Image
              src={post.fileUrl}
              alt={post.caption}
              layout="fill"
              className="rounded-md object-cover h-full w-full"
              style={{ objectFit: 'contain' }}
            />
          )}
          {post.fileUrl && filetype === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                src={post.fileUrl}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}
        </AspectRatio>
      </div>

      <PostActions post={post} userId={userId} className="px-3 sm:px-0 breakwords" />

      {post.caption && (
        <div className="text-sm leading-none font-medium px-3 break-words">
          <Link href={`/profile/${userId}/threads`} className="font-bold">
            {username}
          </Link>
          <div className="break-words overflow-wrap break-word word-break break-all">
            <p className="text-[0.7rem] font-normal leading-4 break-words">
              {linkifyText(post.caption)}
            </p>
          </div>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={user} />
      </div>

    </div>

    
  );
}

export default Post;
