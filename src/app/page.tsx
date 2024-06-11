import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const session = await currentUser();
  console.log(session);
  
  return (
    <div className="w-full h-full">
      hey there
      {JSON.stringify(session)}
    </div>
  );
}
