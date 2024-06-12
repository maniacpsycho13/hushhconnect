
import EditPost from "@/components/Post/EditPost";
import { fetchPostById } from "@/lib/Actions/post.action";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function EditPostPage({ params: { id } }: Props) {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
}

export default EditPostPage;
