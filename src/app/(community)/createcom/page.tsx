import { CreateComm } from "@/components/Community/CreateCommunity";
import { getUserId } from "@/lib/Actions/user.action";

export default async function Page() {
  const id=await getUserId();
  if(!id) return null
  return (
    <div>
        <CreateComm id={id}/>
    </div>
  )
}
