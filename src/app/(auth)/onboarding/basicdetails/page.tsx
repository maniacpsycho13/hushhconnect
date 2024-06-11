import { BasicDetails } from "@/components/form/AuthForm/Onboarding/BasicDetails";
import { auth } from "@clerk/nextjs/server";


export default async function page() {
  const session = await auth();
  if(!session || !session.userId) return null;
  return (
    <div>
        <BasicDetails id={session.userId} />
       
    </div>
  )
}
