import Post from '@/components/Post/Post';
import { PostsSkeleton } from '@/components/Post/Skeletons';
import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProductsByUserId } from '@/lib/Actions/product.action';
import { getUserIdbyUsername } from '@/lib/Actions/user.action';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { ProductBox } from '../../../../../../public/signup';

export default async function page({ params }: { params: { id: string } }) {

  const userId=await getUserIdbyUsername(params.id)
  if(!userId) return null;
  params.id=userId
  const products=await fetchProductsByUserId(params.id);


  return (
    <div className='bg-[#F4F4F5] px-4 pb-40'>
      {products.length==0 ? (
         <Link href={'/createproduct'}>
         <div className="flex justify-center  flex-col items-center gap-4">
          <div>
            <Image src={ProductBox} alt='box'></Image>
          </div>
           <div className="w-[194px] h-[54px] px-4 bg-blue-600 rounded-[44px] justify-center items-center gap-2.5 inline-flex">
             <div className="text-white text-base font-normal">Add Product</div>
           </div>
         </div>
       </Link>
      ): (
        <div>
         
          <div className='grid grid-cols-2 '>
            <Suspense fallback={<PostsSkeleton/>}>
            <div className="flex justify-center  flex-col items-center gap-4">
          <div>
            <Image src={ProductBox} alt='box'></Image>
          </div>
           <div className="py-2 px-4 bg-blue-600 rounded-[44px] justify-center items-center gap-2.5 inline-flex">
             <div className="text-white text-base font-normal">Add Product</div>
           </div>
         </div>
              {products?.map((post:any) => (
              <ProductCard key={post.id} fileUrl={post.fileUrl} title={post.title} price={post.price} currency={post.currency} link={post.link} />
              ))}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
