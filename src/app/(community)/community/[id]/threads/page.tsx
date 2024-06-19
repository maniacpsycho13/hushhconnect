import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import { fetchPostsByCommunityId} from '@/lib/Actions/post.action';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const posts=await fetchPostsByCommunityId(params.id);


  return (
    <div className='bg-[#F4F4F5] px-4'>
        <Suspense fallback={<PostsSkeleton/>}>
        {posts?.map((post:any) => (
            <Post key={post.id} post={post} />
            ))}
        </Suspense>
    </div>
  )
}
