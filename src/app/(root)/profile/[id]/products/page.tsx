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
          {/* <div className="flex items-center justify-between px-4">
            <div className="text-center text-neutral-500 text-sm font-medium">Product</div>

              <Link href={"/createproduct"}>
              <div className='bg-gradient-to-l from-rose-500 to-purple-500 rounded-[10px] p-[2px] text-sm'>
                <div className='bg-[#F4F4F5] rounded-[10px] px-2 py-1'>
                  <div className='text-center text-neutral-500 text-sm font-semibold'>Add Product</div>
                </div>
               </div>
              </Link>
            </div> */}
          <div className='grid grid-cols-2 '>
            <Suspense fallback={<PostsSkeleton/>}>
              <div className='p-4 h-full w-full'>
                <div className='bg-gradient-to-l from-rose-500 to-purple-500 p-1 w-full h-full rounded-2xl'>
                  <Link href={'/createproduct'}>
                    <div className='bg-[#F4F4F5] w-full h-full rounded-2xl flex items-center flex-col text-[20px] py-12'>
                      <p>Tap To</p>
                      <p>Add Product</p>
                    </div>
                  </Link>
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
