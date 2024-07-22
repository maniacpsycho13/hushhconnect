import Activity from '@/components/Activity/Activity'
import { fetchUserPostComments } from '@/lib/Actions/post.action';
import React from 'react'
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default async function Page({params}:{params:{id:string}}) {
  const comments=await fetchUserPostComments(params.id);
  return (
    <div>
        <Suspense fallback={<Loader />}>
          <Activity comments={comments}/>
        </Suspense>
    </div>
  )
}
