import SimpleSlider from "@/components/Corousel/CenterMode";
import { ProfilePicForm } from "@/components/form/AuthForm/Onboarding/ProfilePicForm";
import { fetchProfile } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const session = await auth();
  if (!session || !session.userId) {
    return null;
  }
  const profile=await fetchProfile(session.userId);
  if(!profile)return null;
  return (
    <div>
      <ProfilePicForm id={session.userId} user={profile} />
    </div>
  );
}
