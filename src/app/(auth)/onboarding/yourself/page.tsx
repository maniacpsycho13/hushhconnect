import YourDetails from '@/components/form/AuthForm/Onboarding/YourDetails'
import React from 'react'
import Loader from "@/components/Loader/Loader";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <YourDetails/>
      </Suspense>
        
    </div>
  )
}

export default page