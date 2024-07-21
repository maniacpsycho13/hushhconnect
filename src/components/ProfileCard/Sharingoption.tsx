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
          
        <div className=" h-11 w-[145px] bg-gradient-to-l from-rose-600 to-blue-700 rounded-xl justify-center items-center gap-[15.61px] inline-flex">
          <div className="text-center text-white text-[17.17px] font-semibold">
            Share Card
          </div>
        </div>
          
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
  


  