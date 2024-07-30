import { BasicDetails } from "@/components/form/AuthForm/Onboarding/BasicDetails";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default async function page() {
  const session = await auth();
  if(!session || !session.userId) return null;
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BasicDetails id={session.userId} />
      </Suspense>
    </div>
  )
}
