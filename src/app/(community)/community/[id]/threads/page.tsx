import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import { checkUserRole } from '@/lib/Actions/community.action';
import { fetchPostsByCommunityId} from '@/lib/Actions/post.action';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  const posts=await fetchPostsByCommunityId(params.id);
  const role=await checkUserRole(params.id,session.userId);
  if(role.role !== 'admin' && role.role !== 'member') {
    return (
      <div></div>
    )
  }
  return (
    <div className='bg-[#F4F4F5] px-6 py-4 h-screen'>
      
        <Suspense fallback={<PostsSkeleton/>}>
        {posts?.map((post:any) => (
            <Post key={post.id} post={post} />
            ))}
        </Suspense>
    </div>
  )
}
