import Post from "@/components/Post/Post";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProfileCard from "@/components/ProfileCard/ProflieCard";
import { fetchPostsByUserId } from "@/lib/Actions/post.action";
import { fetchProductsByUserId } from "@/lib/Actions/product.action";
import { getUserbyId, getUserbyIdSocial } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";
import ProfileLoginCard from "@/components/ProfileCard/ProfileLoginCard";
import axios from "axios";

export type UserDetails={
  id:string
  username:string | null
  profilePic:string | null
  bio:string | null
  email:string | null
  name:string | null
  lastname:string | null
  socialmedia?:any
  coins:number
  posts?:any
}
export default async function layout({ children, params }: { children: React.ReactNode , params : {id : string}}) {
    
    const session = await auth();
    const user=await getUserbyIdSocial(params.id);
    const posts=await fetchPostsByUserId(params.id);
    const products=await fetchProductsByUserId(params.id);

    
    if(!user) return null
    
    const userdetails:UserDetails={
      id:user.id,
      username:user.username,
      profilePic:user.image,
      bio:user.bio,
      email:user.email,
      name:user.name,
      lastname:user.gender,
      socialmedia:user.socialMedia,
      posts:posts,
      coins:user.coins
      }
    if(!session || !session.userId) return <ProfileLoginCard {...userdetails}/>
    
    return (
    <div >


      <ProfileCard {...userdetails}/>
      {children}
    </div>
  )
}
