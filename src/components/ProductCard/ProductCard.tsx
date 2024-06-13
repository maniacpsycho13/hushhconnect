import Image from "next/image";
import { product1 } from "../../../public/profilePage";
import Link from "next/link";

export default function ProductCard({fileUrl,title,price,currency,link}:{fileUrl:string,title:string,price:string,currency:string,link:string}) {
  return (

    <Link href={link}>
    <div className=" mx-6 h-[168px]">
        <Image src={fileUrl} alt="hushh" width={163} height={166} className="w-full h-[166px]"/>
        <div className="flex flex-row justify-between items-center mt-3">
        <p className="text-black text-sm font-normal  leading-[17.74px]">{title}</p>
        <p className="text-black text-sm mr-2 font-normal leading-[17.74px] ">{currency}{price}</p>
        </div>
    </div>
    </Link>
  )
}
