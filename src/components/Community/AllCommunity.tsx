import { getAllCommunities } from "@/lib/Actions/community.action";
import Link from "next/link";

export default async function AllCommunity() {
    const communities = await getAllCommunities();
    if('error' in communities){
        return(
            <div>Unable to Fetch Communities</div>
        )
    }
  return (
    <div>
        {communities?.map((community)=>{
            return (
                <>
                    <Link href={`/community/${community.id}`}>
                        <div key={community.id}>{community.name}</div>
                    </Link>
                    
                </>
                
            )
        })}

    </div>
  )
}
