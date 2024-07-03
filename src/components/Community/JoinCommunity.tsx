'use client'

import { joinCommunity } from "@/lib/Actions/community.action";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { FormError } from "../form/AuthForm/form-error";
import { FormSuccess } from "../form/AuthForm/form-success";

export default function JoinCommunity({communityid,userid}:{communityid:string,userid:string}) {


    const [error , setError] = useState<string | undefined>('')
    const [success , setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const onSubmit = () => {
        setError('');
        setSuccess('');
        startTransition(() => {
          joinCommunity(communityid,userid).then((data)=>{
            setError(data?.error);
            setSuccess(data?.success);
            // if(data?.success){
            //     // router.push('/profle');
            // }
          })
        })
        
        
        
      }
  return (
    <>
    <button onClick={onSubmit}>JoinCommunity</button>
    <FormError message={error} />
    <FormSuccess message={success} />
    </>
  )
}
