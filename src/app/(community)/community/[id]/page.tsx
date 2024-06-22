// import AllRequests from "@/components/Community/AllRequests";
// import CommunityReq from "@/components/Community/CommunityReq";
// import { checkUserRole, getCommunityById } from "@/lib/Actions/community.action"
// import { getUserId } from "@/lib/Actions/user.action";
// import Image from "next/image";
// import Link from "next/link";
// import { hushhprofile } from "../../../../../public/profile";

// export default async function Page({params}:{params:{id:string}}) {
//     const userid= await getUserId();
//     const community=await getCommunityById(params.id);
//     if(!community || !userid) return null;
//     const role=await checkUserRole(community.id,userid);
    
//   return (
//     <>
    
//         <div className="px-6 pt-4 bg-zinc-100 h-screen">
//           <div>
//             <div className="w-[45%]  text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Community</div>
//           </div>

//           <div className="pt-4">
//             <div className="flex justify-center">
//               <Image src={hushhprofile} alt="profile" className="w-[108px] h-[108px]  rounded-full"></Image>
//             </div>
//           </div>
       
//         <div className="text-black text-lg font-semibold  leading-[33.29px] text-center">{community.name}</div>
//         <div className=" text-xs font-[600] text-center bg-clip-text  text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">@{community.name}</div>

//         <div className="w-full text-center text-neutral-900 text-xs font-medium mt-4 leading-[18.40px]">{community.description}</div>
//         {/* <div>{community.description}</div> */}

//         {/* {<div>{role.role}</div>}  */}

//         {/* <div className="pt-[28.14px] flex gap-[6px] justify-center">
//           <div className=" py-1.5 px-[16px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium "><CommunityReq communityid={params.id} userid={userid}/></div>

//           <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
//             Share
//           </div>
//         </div> */}

//         {role.role==='admin' && <div>

//           <div className="pt-[28.14px] flex gap-[6px] justify-center">
//           <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium ">Admin</div>

//           <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
//             Share
//           </div>
//         </div>
          
//           <AllRequests communityId={params.id} userid={userid}/></div>}

//         {role.role==='none' && <div>

//           <div className="pt-[28.14px] flex gap-[6px] justify-center">
//           <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium "><CommunityReq communityid={params.id} userid={userid}/></div>

//           <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
//             Share
//           </div>
//           </div>
//           {/* <CommunityReq communityid={params.id} userid={userid}/> */}
//           </div>
//           } 

//         {role.role==='member' && <div className="pt-[28.14px] flex gap-[6px] justify-center">
//           <div className=" py-1.5 px-[24px] bg-gradient-to-l from-rose-600 to-blue-700 rounded border justify-center items-center gap-2.5 inline-flex text-center  text-white text-xs font-medium ">Member</div>

//           <div className=" px-[32px] py-1.5 text-center text-black text-xs font-medium bg-neutral-200 rounded border justify-start items-center gap-2.5 inline-flex">
//             Share
//           </div>
//           </div>}
          
        
//         </div>
//     </>
//   )
// }


import React from 'react'

const page = () => {
  return (
    <div></div>
  )
}

export default page