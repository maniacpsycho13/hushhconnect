
import { fetchUserPostComments } from "@/lib/Actions/post.action";
import { getUserIdbyUsername } from "@/lib/Actions/user.action";

export default async function Page({params}:{params:{id:string}}) {
  
  const userId=await getUserIdbyUsername(params.id)
  if(!userId) return null;
  params.id=userId
    const comments=await fetchUserPostComments(params.id);
  return (
    <div>{JSON.stringify(comments)}</div>
    

  )
}
