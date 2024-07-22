import SimpleSlider from "@/components/Corousel/CenterMode";
import { ProfilePicForm } from "@/components/form/AuthForm/Onboarding/ProfilePicForm";
import { fetchProfile } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";


export default async function page() {
  const session = await auth();
  if (!session || !session.userId) {
    return null;
  }
  const profile=await fetchProfile(session.userId);
  
  if(!profile)return null;
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ProfilePicForm id={session.userId} user={profile}/>
      </Suspense>

    </div>
  );
}
