
import { UsernameForm } from "@/components/form/AuthForm/Onboarding/UsernameForm";
import { getUserbyId, whetherboarded } from "@/lib/Actions/user.action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const session =await auth();
  console.log(session);
  
  if(!session || !session.userId) return null;
  
  const profile=await getUserbyId(session.userId);

  if(profile) redirect(`/profile/${profile.username}/threads`);
  return (
    <div>
      <UsernameForm id={session.userId}/>
    </div>
  )
}
