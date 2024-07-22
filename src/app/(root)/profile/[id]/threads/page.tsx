import Loader from '@/components/Loader/Loader';
import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import { fetchPostsByUserId } from '@/lib/Actions/post.action';
import { getUserIdbyUsername } from '@/lib/Actions/user.action';
import Link from 'next/link';
import React, { Suspense } from 'react';

export default async function page({ params }: { params: { id: string } }) {
  const userId = await getUserIdbyUsername(params.id);
  if (!userId) return null;
  params.id = userId;

  const posts = await fetchPostsByUserId(params.id);

  return (
    <div className='bg-[#F4F4F5] px-4 pb-40'>
      {posts.length === 0 ? (
        <Link href={'/create'}>
          <div className="flex justify-center my-[3rem]">
            <div className="w-[194px] h-[54px] px-4 bg-blue-600 rounded-[44px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-base font-normal">Post First thread</div>
            </div>
          </div>
        </Link>
      ):(
      <Suspense fallback={<Loader/>}>
      <div className="flex justify-center mt-4 mb-8">
            <div className="px-6 py-4 bg-blue-600 rounded-[44px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-base font-normal">Add thread</div>
            </div>
          </div>
        {posts?.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </Suspense>
      )}
    </div>
  );
}
