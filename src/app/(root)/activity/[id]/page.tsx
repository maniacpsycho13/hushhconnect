import Activity from '@/components/Activity/Activity'
import { fetchUserPostComments } from '@/lib/Actions/post.action';
import React from 'react'

export default async function Page({params}:{params:{id:string}}) {
  const comments=await fetchUserPostComments(params.id);
  return (
    <div>
        <Activity comments={comments}/>
    </div>
  )
}
