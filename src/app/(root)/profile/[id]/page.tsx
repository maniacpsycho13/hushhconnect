import Post from "@/components/Post/Post";

import { fetchPostsByUserId } from "@/lib/Actions/post.action";
import { fetchProductsByUserId } from "@/lib/Actions/product.action";
import { getUserbyId, getUserbyIdSocial, getUserIdbyUsername } from "@/lib/Actions/user.action";
import { auth } from "@clerk/nextjs/server";
import ProfileLoginCard from "@/components/ProfileCard/ProfileLoginCard";
import ProfileCard2 from "@/components/ProfileCard/ProfileCard2";

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

export default async function page( {params}:{params : {id : string}} ) {


  const userId=await getUserIdbyUsername(params.id)
  if(!userId) return null;
  params.id=userId
  const session = await auth();
  const user=await getUserbyIdSocial(params.id);
  const posts=await fetchPostsByUserId(params.id);
  const products=await fetchProductsByUserId(params.id);
  console.log(products);
  
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
    if(!session || !session.userId )return <ProfileLoginCard {...userdetails}/> ;
  return (
    <div>
      {/* <ProfileCard2 {...userdetails}/> */}

      {/* {posts?.map((post:any) => (
        <Post key={post.id} post={post} />
      ))}
      {
        products?.map((product:any) => (
          <ProductCard key={product.id} fileUrl={product.fileUrl} title={product.title} price={product.price} currency={product.currency} />
        ))
      } */}
    </div>
  )
}

