import Image from "next/image";
import { product1 } from "../../../public/profilePage";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ProductCard({fileUrl,title,price,currency,link}:{fileUrl:string,title:string,price:string,currency:string,link:string}) {
  return (

    <Link href={link}>
    <div className=" px-2 py-2 ">
        <div className="overflow-hidden rounded-md h-[166px]">
        <div  className="w-full h-[166px] rounded-xl text-black">
          <Image src={fileUrl} alt="hushh" width={80} height={166} className="rounded-md object-cover h-full w-full " style={{ objectFit: 'contain' }}/>
        </div>
        </div>
        <div className="flex flex-col gap-[6px] mt-3">
          {/* <div className="text-sm  px-1 rounded-[39px] border border-neutral-400 justify-center items-center gap-2.5 inline-flex">Shop Now</div> */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-xs font-normal leading-[17.74px]">{title}</p>
              <p className="text-black text-sm font-normal  leading-normal">{currency}&nbsp;{price}</p>
            </div>
            <Link href={link} >
              <div className="text-xs px-2 py-1 rounded-[39px] border border-neutral-400 text-neutral-500 justify-center items-center gap-2.5 inline-flex">
                Shop 
              </div>
            </Link>

          </div>
        </div>
    </div>
    </Link>
  )
}
