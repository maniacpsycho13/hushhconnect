import AllCommunity from "@/components/Community/AllCommunity";
import { UserSkeleton } from "@/components/Community/UserSkeleton";
import Image from "next/image";
import Link from "next/link";

import { Suspense } from "react";
import { backicon } from "../../../../public/profilePage";
import { addcommunity } from "../../../../public/community";

export default function Page() {
    
  return (
    <div className="px-6 pt-4 ">
        <div>
            <Link href={'/home/thread'}><Image src={backicon} alt="back"></Image></Link>
          </div>
        <div className="flex justify-between mb-[24px] mt-[6px]">
            <div>
                <div className="text-rose-500  text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Community</div>
            </div>
            <div>
                <Link href={'/createcom'} ><Image src={addcommunity} alt="comm"></Image></Link>
            </div>
        </div>
        <Suspense fallback={<UserSkeleton/>}>

        <AllCommunity/>
        </Suspense>
    </div>
  )
}
