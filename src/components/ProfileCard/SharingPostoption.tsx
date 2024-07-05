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
import SharingPost from "./SharingPost";
import { Send, Share } from "lucide-react";
import { Button } from "../ui/button";
  export function SharingPostOption({id}:{id:string}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
    >
     
    <Send className="h-6 w-6"/>
    </Button>
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share your Post</AlertDialogTitle>
            <AlertDialogDescription>
                <br/>
                Share your Post with anyone
              <br/><br/> 
              <SharingPost id={id}/>
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
  


  