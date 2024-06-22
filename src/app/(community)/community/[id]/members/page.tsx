import { checkUserRole, fetchAllMembersByCommunityId } from "@/lib/Actions/community.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { hushhprofile } from "../../../../../../public/profile";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    const role = await checkUserRole(params.id, session.userId);

    if (role.role !== 'admin' && role.role !== 'member') {
        return <div></div>;
    }

    const members = await fetchAllMembersByCommunityId(params.id);

    return (
        <div className="px-6 bg-zinc-100 h-screen">
            <div className="text-black text-sm font-medium pt-3">Members</div>
            {members.map((member) => {
                return (
                    <div key={member.id} className='w-full bg-white my-2 px-[12.92px] justify-between rounded-xl py-[12px] flex items-center'>
                        <div className='flex items-center gap-[8px]'>
                            <div>
                                <Image
                                    src={member.user.image || hushhprofile}
                                    alt={`${member.user.name}'s profile picture`}
                                    width={40}
                                    height={40}
                                    className='h-[40px] w-[40px] rounded-full'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <div className="text-black text-xs font-medium">{member.user.name}</div>
                                <div className="text-xs font-normal bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">
                                    Status: {role.role}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
