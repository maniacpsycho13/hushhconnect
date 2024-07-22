import Loader from '@/components/Loader/Loader';
import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProductsByUserId } from '@/lib/Actions/product.action';
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const products=await fetchProductsByUserId(params.id);


  return (
    <div className='grid grid-cols-2 pb-32 pt-[25px] px-4 '>
        <Suspense fallback={<Loader/>}>
        {products?.map((post:any) => (
            <ProductCard key={post.id} fileUrl={post.fileUrl} title={post.title} price={post.price} currency={post.currency} link={post.link} />
            ))}
        </Suspense>
    </div>
  )
}
