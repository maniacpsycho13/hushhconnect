import ProfileCard from "@/components/ProfileCard/ProflieCard";
import { getUserbyId, getUserbyIdSocial } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";

export type UserDetails={
  id:string
  username:string | null
  profilePic:string | null
  bio:string | null
  email:string | null
  name:string | null
  lastname:string | null
  socialmedia?:any
}

export default async function page() {
  const session = await auth();
  if(!session || !session.userId) return null;
  const user=await getUserbyIdSocial(session.userId);
  console.log(user);
  // console.log(user.socialmedia);
  
  if(!user) return null

  const userdetails:UserDetails={
    id:user.id,
    username:user.username,
    profilePic:user.image,
    bio:user.bio,
    email:user.email,
    name:user.name,
    lastname:user.gender,
    socialmedia:user.socialMedia
  }
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <ProfileCard {...userdetails}/>
    </div>
  )
}
