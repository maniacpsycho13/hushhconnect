import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProductsByCommunityId } from '@/lib/Actions/product.action';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const products=await fetchProductsByCommunityId(params.id);


  return (
    <div className='grid grid-cols-2 bg-[#F4F4F5] pb-32 px-4'>
        <Suspense fallback={<PostsSkeleton/>}>
        {products?.map((post:any) => (
            <ProductCard key={post.id} fileUrl={post.fileUrl} title={post.title} price={post.price} currency={post.currency} link={post.link} />
            ))}
        </Suspense>
    </div>
  )
}
