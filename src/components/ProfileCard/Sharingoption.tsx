import React, { useRef } from "react";
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
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { toPng } from "html-to-image";
import {HushhCard1} from "../../../public/hushhCards"; // Update the path as needed
import {hushhprofile} from "../../../public/profile"; // Update the path as needed
import SharingCard from "./sharingcard"; // Adjust path if necessary
import { UserWithExtras } from "@/lib/Validations/definitions";
import { useQRCode } from "next-qrcode";
import { usePathname } from 'next/navigation'
import { UserDetails } from "@/app/(root)/profile/[id]/page";
import { profileData } from "../Template/Template";

export function SharingOption({ profile }:{profile:UserWithExtras | undefined | null}) {
  const cardRef = useRef(null);
  const { Canvas } = useQRCode();
  const pathname = usePathname();
  const ind=Number(profile?.cardImage) || 0
  
  const path='https://hushhvivaconnect.shop/'+`/profile/${profile?.username}/threads`

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current);
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "hushhCard.png", { type: "image/png" });

        const shareData = {
          title: "Check out my business card!",
          text: "Here is my business card! Connect with me via this card. Hushh Business Card:: https://hushhvivaconnect.shop/profile/anmol07/threads",
          files: [file],
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          alert("Sharing is not supported on this browser. Please use a modern browser.");
        }
      } catch (err) {
        console.error("Failed to share the card", err);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="h-11 w-[145px] bg-gradient-to-l from-rose-600 to-blue-700 rounded-xl justify-center items-center gap-[15.61px] inline-flex">
          <div className="text-center text-white text-[17.17px] font-semibold">
            Share Card
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share your business card</AlertDialogTitle>
          <AlertDialogDescription>
            <div ref={cardRef} className="relative">
                <Image src={profileData[ind].cardImage} alt="card" className="w-full relative rounded-xl max-w-[330px]" />
                  <div className="absolute top-[16px] left-[16px] flex items-center gap-2">
                    <div>
                      <Image src={profile?.image || hushhprofile} alt="profile" width={33} height={33} className="rounded-full" />
                    </div>
                    <div className="flex flex-col gap-[3.5rem]">
                      <div>
                        <p className="text-white text-2xl font-normal text-left">{profile?.name}</p>
                        <p className="text-white text-[8.85px] font-medium text-left">{profile?.email}</p>
                      </div>
                    </div>
                  <div>
                </div>
                  </div>
                  <div className='opacity-[80%] absolute top-24 left-4'>
                    <Canvas
                      text={path}
                      options={{
                      errorCorrectionLevel: 'M',
                      margin: 1,
                      scale: 2,
                      width: 64,
                      color: {
                      dark: '#FFFFFF',
                      light:'#000000',
                      },
                                          
                      }}
                    />
                  </div>
            </div>
            <div className="mt-4">
              <SharingCard />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleShare} className="bg-gradient-to-l from-rose-600 to-blue-700 rounded-sm">Share Hushh Card</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
