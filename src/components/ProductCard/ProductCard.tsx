import Image from "next/image";
import { product1 } from "../../../public/profilePage";
import Link from "next/link";

export default function ProductCard({fileUrl,title,price,currency,link}:{fileUrl:string,title:string,price:string,currency:string,link:string}) {
  return (

    <Link href={link}>
    <div className="my-10 mx-6 w-[163px]">
        <Image src={fileUrl} alt="hushh" width={163} height={166}/>
        <div className="flex flex-row justify-between">
        <p className="text-black text-xs ml-2 font-normal leading-[17.74px] mt-2">{title}</p>
        <p className="text-black text-xs mr-2 font-normal leading-[17.74px] mt-2">{currency}{price}</p>
        </div>
    </div>
    </Link>
  )
}
