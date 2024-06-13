import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import { fetchPostsByUserId } from '@/lib/Actions/post.action';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const posts=await fetchPostsByUserId(params.id);


  return (
    <div>
        <Suspense fallback={<PostsSkeleton/>}>
        {posts?.map((post:any) => (
            <Post key={post.id} post={post} />
            ))}
        </Suspense>
    </div>
  )
}
