import { getAllCommunities } from "@/lib/Actions/community.action";
import Image from "next/image";
import Link from "next/link";
import { addcommunity } from "../../../public/community";
import { hushhprofile } from "../../../public/profile";
import { backicon } from "../../../public/profilePage";

export default async function AllCommunity() {
    const communities = await getAllCommunities();
    if('error' in communities){
        return(
            <div>Unable to Fetch Communities</div>
        )
    }
  return (
    <div >
        
        {communities?.map((community)=>{
            return (
                <>
                    <div className="flex items-center gap-4 py-[12px] border-b-2 border-neutral-300">
                        <Image src={community.image ||   hushhprofile} alt="profile" width={57} height={57} className="w-[57px] h-[57px] rounded-full"></Image>
                        <Link href={`/community/${community.id}/threads`} className="text-black text-xs font-medium ">
                            <div key={community.id}>{community.name}</div>
                            <div className="text-zinc-600 text-xs font-normal lowercase">@{community.name}</div>
                        </Link>
                    </div>
                    
                </>
                
            )
        })}

    </div>
  )
}
