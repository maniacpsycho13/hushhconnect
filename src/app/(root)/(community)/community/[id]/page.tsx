import AllRequests from "@/components/Community/AllRequests";
import CommunityReq from "@/components/Community/CommunityReq";
import { checkUserRole, getCommunityById } from "@/lib/Actions/community.action"
import { getUserId } from "@/lib/Actions/user.action";

export default async function Page({params}:{params:{id:string}}) {
    const userid= await getUserId();
    const community=await getCommunityById(params.id);
    if(!community || !userid) return null;
    const role=await checkUserRole(community.id,userid);
    
  return (
    <>
        <div>{community.name}</div>
        <div>{community.description}</div>

        {/* {<div>{role.role}</div>}  */}
        {role.role==='none' && <div><CommunityReq communityid={params.id} userid={userid}/></div>} 
        {role.role==='admin' && <div><AllRequests communityId={params.id} userid={userid}/></div>}
        {role.role==='member' && <div>u r fucking member</div>}
    </>
  )
}
