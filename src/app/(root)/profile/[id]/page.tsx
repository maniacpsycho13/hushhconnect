
// import ProfileLoginCard from "@/components/ProfileCard/ProfileLoginCard";
// import ProfileCard from "@/components/ProfileCard/ProflieCard";
// import { getUserbyId, getUserbyIdSocial } from "@/lib/Actions/user.action";
// import { auth } from "@clerk/nextjs/server";

// import Post from "@/components/Post/Post";
// import ProductCard from "@/components/ProductCard/ProductCard";
// import ProfileCard from "@/components/ProfileCard/ProflieCard";
// import { fetchPostsByUserId } from "@/lib/Actions/post.action";
// import { fetchProductsByUserId } from "@/lib/Actions/product.action";
// import { getUserbyId, getUserbyIdSocial } from "@/lib/Actions/user.action";
// import { auth } from "@clerk/nextjs/server";


// export type UserDetails={
//   id:string
//   username:string | null
//   profilePic:string | null
//   bio:string | null
//   email:string | null
//   name:string | null
//   lastname:string | null
//   socialmedia?:any
//   posts?:any
// }

// export default async function page( {params}:{params : {id : string}} ) {
//   // const session = await auth();
//   // if(!session || !session.userId) return null;
//   // logic specify user id


//   const user=await getUserbyIdSocial(params.id);
//   const posts=await fetchPostsByUserId(params.id);
//   const products=await fetchProductsByUserId(params.id);
//   // console.log(user);
//   // console.log(user.socialmedia);
//   console.log(products);
  
//   if(!user) return null

//   const userdetails:UserDetails={
//     id:user.id,
//     username:user.username,
//     profilePic:user.image,
//     bio:user.bio,
//     email:user.email,
//     name:user.name,
//     lastname:user.gender,
//     socialmedia:user.socialMedia,
//     posts:posts
//   }
//   return (
//     <div>
//       <ProfileCard {...userdetails}/>

//       {posts?.map((post:any) => (
//         <Post key={post.id} post={post} />
//       ))}
//       {
//         products?.map((product:any) => (
//           <ProductCard key={product.id} fileUrl={product.fileUrl} title={product.title} price={product.price} currency={product.currency} />
//         ))
//       }
//     </div>
//   )
// }
import React from 'react'

export default function page() {
  return (
    <div></div>
  )
}
