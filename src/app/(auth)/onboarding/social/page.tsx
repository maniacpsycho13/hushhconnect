import { SocialForm } from "@/components/form/AuthForm/SocialForm";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default async function page() {
    const session=await auth();
    if(!session || !session.userId) return null;
  return (
    <div className="px-6 py-4"> 

      <Suspense fallback={<Loader />}>
        <SocialForm id={session.userId} isEditing={false}/>
      </Suspense>
       
    </div>
  )
}
