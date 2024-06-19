import { getAllCommunities } from "@/lib/Actions/community.action";
import Image from "next/image";
import Link from "next/link";
import { addcommunity } from "../../../public/community";
import { hushhprofile } from "../../../public/profile";

export default async function AllCommunity() {
    const communities = await getAllCommunities();
    if('error' in communities){
        return(
            <div>Unable to Fetch Communities</div>
        )
    }
  return (
    <div className="px-6 pt-2 bg-gray-100 h-screen">
        <div className="flex justify-between mb-[24px]">
            <div>
                <div className="text-rose-500  text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Community</div>
            </div>
            <div>
                <Link href={'/createcom'} ><Image src={addcommunity} alt="comm"></Image></Link>
            </div>
        </div>
        {communities?.map((community)=>{
            return (
                <>
                    <div className="flex items-center gap-4 py-[12px] border-b-2 border-neutral-300">
                        <Image src={hushhprofile} alt="profile" className="w-[57px] h-[57px] rounded-full"></Image>
                        <Link href={`/community/${community.id}`} className="text-black text-xs font-medium ">
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
