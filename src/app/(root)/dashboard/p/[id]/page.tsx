import { SinglePostSkeleton } from "@/components/Post/Skeletons";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import SinglePost from "@/components/Post/SinglePost";
import MorePosts from "@/components/Post/MorePosts";

function PostPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>

      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense>
        <MorePosts postId={id} />
      </Suspense>
    </div>
  );
}

export default PostPage;
