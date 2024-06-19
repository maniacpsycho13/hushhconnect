import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProductsByCommunityId } from '@/lib/Actions/product.action';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const products=await fetchProductsByCommunityId(params.id);


  return (
    <div className='bg-[#F4F4F5] h-screen'>
      <div className='flex gap-4 px-6 pt-4'>
        <div className=" mb-[24px]  text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60] to-[#A342FF]">Community Products</div>
      </div>
    <div className='grid grid-cols-2  pb-32 px-6'>
        <Suspense fallback={<PostsSkeleton/>}>
        {products?.map((post:any) => (
            <ProductCard key={post.id} fileUrl={post.fileUrl} title={post.title} price={post.price} currency={post.currency} link={post.link} />
            ))}
        </Suspense>
    </div>
    </div>
  )
}
