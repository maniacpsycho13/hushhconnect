import { SocialForm } from "@/components/form/AuthForm/SocialForm";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
    const session=await auth();
    if(!session || !session.userId) return null;
  return (
    <div className="px-6 py-4"> 

        <SocialForm id={session.userId}/>
    </div>
  )
}
