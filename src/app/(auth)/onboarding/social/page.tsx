import { SocialForm } from "@/components/form/AuthForm/SocialForm";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
    const session=await auth();
    if(!session || !session.userId) return null;
  return (
    <div>
        <h1>Social
        </h1>

        <SocialForm id={session.userId}/>
    </div>
  )
}
