import AllCommunity from "@/components/Community/AllCommunity";
import { UserSkeleton } from "@/components/Community/UserSkeleton";
import { Suspense } from "react";

export default function Page() {
    
  return (
    <div>
        <Suspense fallback={<UserSkeleton/>}>

        <AllCommunity/>
        </Suspense>
    </div>
  )
}
