import Post from "@/components/Post/Post";
import { fetchPostById } from "@/lib/Actions/post.action";

export default async function Page({params}:{params:{id:string}}) {
    const post = await fetchPostById(params.id);
    if(!post)return null;   
  return (
    <div>
        <div className="bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF] text-xl font-semibold mb-5">Hushh Connect</div>
        <Post post={post}/>
    </div>
  )
}
