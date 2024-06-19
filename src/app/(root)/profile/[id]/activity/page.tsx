import { fetchUserPostComments } from "@/lib/Actions/post.action";

export default async function Page({params}:{params:{id:string}}) {
    const comments=await fetchUserPostComments(params.id);
  return (
    <div>{JSON.stringify(comments)}</div>
  )
}
