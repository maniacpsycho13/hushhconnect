import AllRequests from "@/components/Community/AllRequests";
import CommunityReq from "@/components/Community/CommunityReq";
import { checkUserRole, getCommunityById } from "@/lib/Actions/community.action"
import { getUserId } from "@/lib/Actions/user.action";
import Image from "next/image";
import Link from "next/link";

export default async function Page({params}:{params:{id:string}})  {
    const userid= await getUserId();
     const community=await getCommunityById(params.id);
     if(!community || !userid) return null;
     const role=await checkUserRole(community.id,userid);
  return (
    <div>
        <AllRequests communityId={params.id} userid={userid}/>
    </div>
  )
}

