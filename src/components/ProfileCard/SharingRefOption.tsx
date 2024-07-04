import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import SharingCard from "./sharingcard"
import Image from "next/image";
import { shareicon } from "../../../public/profile";
import SharingReferral from "./SharingReferral";
  
  export function SharingRefOption({referral}:{referral:string}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          
        <Image src={shareicon} alt="card" className="" />
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share your Referral</AlertDialogTitle>
            <AlertDialogDescription>
                <br/>
              Share your Referral 
              <br/><br/> 
              <SharingReferral Referral={referral}/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  


  