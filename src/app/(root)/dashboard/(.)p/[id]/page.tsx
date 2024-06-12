import PostView from "@/components/Post/PostView";
import { fetchPostById } from "@/lib/Actions/post.action";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function PostModal({ params: { id } }: Props) {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <PostView id={id} post={post} />;
}

export default PostModal;
