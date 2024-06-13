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
  
  export function SharingOption() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          
        <Image src={shareicon} alt="card" className="" />
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share your business card</AlertDialogTitle>
            <AlertDialogDescription>
                <br/>
              Share your business card with anyone. 
              <br/><br/> 
              <SharingCard/>
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
  


  