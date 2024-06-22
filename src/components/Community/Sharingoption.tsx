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


import Image from "next/image";

import { sharebutton } from "../../../public/community";
import SharingCommunity from "./SharingCommunity";
  
  export function Sharingoption() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          
        <Image src={sharebutton} alt="card" className="" />
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Hushh Community</AlertDialogTitle>
            <AlertDialogDescription>
                <br/>
              Share Hushh Community with anyone. 
              <br/><br/> 
              <SharingCommunity/>
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
  


  