import { checkUserRole, fetchAllMembersByCommunityId } from "@/lib/Actions/community.action";
import { auth } from "@clerk/nextjs/server";


export default async function Page({params}:{params:{id:string}}) {
    const session = await auth();
    const role=await checkUserRole(params.id,session.userId);
    if(role.role !== 'admin' && role.role !== 'member') {
        return (
            <div></div>
        )
    }
    const members=await fetchAllMembersByCommunityId(params.id)
  return (
    <div>
        <h1>Members</h1>
        {members.map((member)=>{
            return (
                <div key={member.id}>
                    {member.user.image}{member.user.name}
                    <br />
                </div>
            )
        })}

    </div>
  )
}
