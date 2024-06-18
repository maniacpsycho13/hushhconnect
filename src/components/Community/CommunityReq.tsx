import { getJoinRequestStatus, joinCommunity } from "@/lib/Actions/community.action"
import JoinCommunity from "./JoinCommunity";

export default async function CommunityReq({communityid,userid}:{communityid:string,userid:string}) {
  
    const status=await getJoinRequestStatus(communityid,userid);

    const handleSubmit=async()=>{
        const data=await joinCommunity(communityid,userid);
        console.log(data);
        
    }

  return (
    <div>
        {status.status==='none' && <div><JoinCommunity communityid={communityid} userid={userid}/></div>}
        {status.status==='pending' && <div>Request {status.status}</div>}
    </div>
  )
}
